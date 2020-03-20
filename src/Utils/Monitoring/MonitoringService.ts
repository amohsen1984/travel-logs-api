import { ILog, ILogger } from "fikrah-ts-logger";
import { inject, injectable } from "inversify";
import TYPES from "../../Container/inversify.types";
import IJsonMonitoringStrategy from "./IJsonMonitoringStrategy";

@injectable()
export default class MonitoringService {
    private readonly logger: ILogger;
    private readonly monitoringStrategies: {
        [key: string]: IJsonMonitoringStrategy;
    };
    private jsonMonitoringEnabled: boolean;

    constructor(
        @inject(TYPES.JsonMonitoringStrategies)
        monitoringStrategies: { [key: string]: IJsonMonitoringStrategy },
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.JsonMonitoringEnabled) jsonMonitoringEnabled: boolean,
    ) {
        this.logger = logger;
        this.jsonMonitoringEnabled = jsonMonitoringEnabled;
        this.monitoringStrategies = monitoringStrategies;
    }

    public async jsonMonitor(meta: any) {
        if (!this.jsonMonitoringEnabled) {
            return;
        }

        const strategyKey = `${meta.scope.constructor.name}JsonMonitoringStrategy`;
        const jsonMonitoringStrategy = this.monitoringStrategies[strategyKey]
            ? this.monitoringStrategies[strategyKey]
            : this.monitoringStrategies.DefaultJsonMonitoringStrategy;

        const methodName: string = `${meta.scope.constructor.name}.${meta.key}`;

        try {
            const resolvedValue = await Promise.resolve(meta.result);
            const log: ILog = jsonMonitoringStrategy.getMonitoringLog(
                methodName,
                meta.args,
                resolvedValue,
            );
            this.logger[log.level](log.message, log.context);
        } catch (e) {
            const log = jsonMonitoringStrategy.getMonitoringLog(
                methodName,
                meta.args,
                null,
                e,
            );
            this.logger[log.level](log.message, log.context);
        }
    }

    set jsonMonitoringStatus(status: boolean) {
        this.jsonMonitoringEnabled = status;
    }
}
