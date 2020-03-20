import dotenv from "dotenv";
import { Logger, LogLevel } from "fikrah-ts-logger";
import { Container, interfaces } from "inversify";
import * as mysql from "mysql2/promise";
import "reflect-metadata";
import FakeDataRepository from "../Repositories/FakeDataRepository";
import IDataRepository from "../Repositories/IDataRepository";
import MySqlDataRepository from "../Repositories/MySqlDataRepository";
import MonitoringService from "../Utils/Monitoring/MonitoringService";
import InversifyContext = interfaces.Context;
import DefaultJsonMonitoringStrategy from "../Utils/Monitoring/MonitoringStrategies/DefaultJsonMonitoringStrategy";
import TYPES from "./inversify.types";
const container = new Container();

dotenv.config();

//
// Bool Binds
//
interface IBooleanBind {
    id: symbol;
    value: boolean;
}

const booleanBinds: IBooleanBind[] = [
    {
        id: TYPES.JsonMonitoringEnabled,
        value: process.env.MONITORING_ENABLED === "Y",
    },
];

booleanBinds.forEach((booleanBind: IBooleanBind) => {
    container.bind<boolean>(booleanBind.id).toConstantValue(booleanBind.value);
});

//
// String Binds
//
interface IStringBind {
    id: symbol;
    value: string;
}

const stringBinds: IStringBind[] = [
    { id: TYPES.MySqlHost, value: process.env.MYSQL_HOST || "" },
    { id: TYPES.MySqlDBName, value: process.env.MYSQL_DB_NAME || "" },
    { id: TYPES.MySqlUser, value: process.env.MYSQL_USER || "" },
    { id: TYPES.MySqlPwd, value: process.env.MYSQL_PWD || "" },
    { id: TYPES.LogLevel, value: process.env.LOG_LEVEL || "info" },
];

stringBinds.forEach((stringBind: IStringBind) => {
    container.bind<string>(stringBind.id).toConstantValue(stringBind.value);
});

//
// Number Binds
//
interface INumberBind {
    id: symbol;
    value: number;
}

const numberBinds: INumberBind[] = [
    { id: TYPES.MySqlPort, value: Number(process.env.MYSQL_PORT || "3306") },
];

numberBinds.forEach((numberBind: INumberBind) => {
    container.bind<number>(numberBind.id).toConstantValue(numberBind.value);
});

//
// Constructors Binds
//
interface IConstructorBind {
    id: symbol;
    constructor: new (...args: any[]) => any;
}

const constructorBinds: IConstructorBind[] = [
    {
        id: TYPES.FakeDataRepository,
        constructor: FakeDataRepository,
    },
    {
        id: TYPES.MySqlDataRepository,
        constructor: MySqlDataRepository,
    },
    {
        id: TYPES.DefaultJsonMonitoringStrategy,
        constructor: DefaultJsonMonitoringStrategy,
    },
    {
        id: TYPES.MonitoringService,
        constructor: MonitoringService,
    },
];

constructorBinds.forEach((constructorBind: IConstructorBind) => {
    container
        .bind(constructorBind.id)
        .to(constructorBind.constructor)
        .inSingletonScope();
});

//
// Dynamic Binds
//
interface IDynamicBind {
    id: symbol;
    builder: (context: InversifyContext) => any;
}

const dynamicBinds: IDynamicBind[] = [
    {
        id: TYPES.Logger,
        builder: (ctx: InversifyContext) =>
            new Logger(
                console,
                ctx.container.get<string>(TYPES.LogLevel) as LogLevel,
            ),
    },
    {
        id: TYPES.JsonMonitoringStrategies,
        builder: (ctx: InversifyContext) => ({
            DefaultJsonMonitoringStrategy: ctx.container.get(
                TYPES.DefaultJsonMonitoringStrategy,
            ),
        }),
    },
    {
        id: TYPES.SelectedDataRepository,
        builder: (ctx: InversifyContext) => {
            let dataSource = process.env.DATA_SOURCE;

            if (
                !dataSource ||
                undefined === TYPES[`${dataSource}DataRepository`]
            ) {
                dataSource = `Fake`;
            }

            return ctx.container.get<IDataRepository>(
                TYPES[`${dataSource}DataRepository`],
            );
        },
    },
    {
        id: TYPES.MySqlPool,
        builder: (ctx: InversifyContext) =>
            mysql.createPool({
                host: ctx.container.get<string>(TYPES.MySqlHost),
                user: ctx.container.get<string>(TYPES.MySqlUser),
                password: ctx.container.get<string>(TYPES.MySqlPwd),
                database: ctx.container.get<string>(TYPES.MySqlDBName),
                port: ctx.container.get<number>(TYPES.MySqlPort),
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            }),
    },
];

dynamicBinds.forEach((dynamicBind: IDynamicBind) => {
    container
        .bind(dynamicBind.id)
        .toDynamicValue(dynamicBind.builder)
        .inSingletonScope();
});

export { container };
