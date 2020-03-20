import { ILog } from "fikrah-ts-logger";

export default interface IJsonMonitoringStrategy {
    getMonitoringLog(
        methodName: string,
        args: any[],
        result: any,
        error?: any,
    ): ILog;
}
