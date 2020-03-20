import { Metadata } from "kaop-ts";

export default class MonitoringAdvices {
    public static jsonMonitorAdvice(meta: Metadata<any>) {
        const context = meta.scope;
        if (typeof context.jsonMonitor === "function") {
            context.jsonMonitor(meta);
        }
    }
}
