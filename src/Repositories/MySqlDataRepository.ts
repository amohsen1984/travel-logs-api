import { inject, injectable } from "inversify";
import moment from "moment";
import * as mysql from "mysql2/promise";
import TYPES from "../Container/inversify.types";
import ITravelLog from "../DTO/ITravelLog";
import IDataRepository from "./IDataRepository";
@injectable()
export default class MySqlDataRepository implements IDataRepository {
    private mysqlPool: mysql.Pool;

    constructor(@inject(TYPES.MySqlPool) mysqlPool: mysql.Pool) {
        this.mysqlPool = mysqlPool;
    }

    public async getAllTravelLogs(): Promise<ITravelLog[]> {
        const result = await this.mysqlPool.query(
            "SELECT captainName, vesselName, arrivalDate, port from logs",
        );

        return this.formatRecords((result || [])[0] as ITravelLog[]);
    }

    public async FilterTravelLogsByCaptainName(
        captainName: string,
    ): Promise<ITravelLog[]> {
        const result = await this.mysqlPool.query(
            "SELECT captainName, vesselName, arrivalDate, port from logs WHERE captainName = ?",
            [captainName],
        );

        return this.formatRecords((result || [])[0] as ITravelLog[]);
    }

    public async addTravelLog(travelLog: ITravelLog): Promise<ITravelLog> {
        await this.mysqlPool.query("INSERT INTO logs SET ?", travelLog);

        return travelLog;
    }

    private formatRecords(records: ITravelLog[]): ITravelLog[] {
        return (records || []).map(record => {
            record.arrivalDate = moment(record.arrivalDate).format(
                "YYYY-MM-DD",
            );

            return record;
        });
    }
}
