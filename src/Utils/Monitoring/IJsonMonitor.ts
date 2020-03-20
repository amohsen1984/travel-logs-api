import { Metadata } from "kaop-ts";

export default interface IJsonMonitor {
    jsonMonitor(meta: Metadata<any>): Promise<void>;
}
