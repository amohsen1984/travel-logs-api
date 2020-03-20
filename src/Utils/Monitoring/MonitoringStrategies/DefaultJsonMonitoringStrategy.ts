import { ILog } from "fikrah-ts-logger";
import { injectable } from "inversify";
import IJsonMonitoringStrategy from "../IJsonMonitoringStrategy";

@injectable()
export default class DefaultJsonMonitoringStrategy
    implements IJsonMonitoringStrategy {
    public getMonitoringLog(
        methodName: string,
        args: any[],
        result: any,
    ): ILog {
        return {
            level: "debug",
            message: `${methodName} has been called`,
            context: {
                args,
                result,
            },
        } as ILog;
    }
}
