import { injectable } from "inversify";
import ITravelLog from "../DTO/ITravelLog";
import IDataRepository from "./IDataRepository";

@injectable()
export default class FakeDataRepository implements IDataRepository {
    private travelLogs: ITravelLog[] = [
        {
            captainName: "James Aldi",
            vesselName: "V1",
            arrivalDate: "2019-01-01",
            port: "Alexandria",
        },
        {
            captainName: "Mike Prag",
            vesselName: "V2",
            arrivalDate: "2019-02-01",
            port: "Dubai",
        },
        {
            captainName: "Mike Prag",
            vesselName: "V3",
            arrivalDate: "2019-04-01",
            port: "Jeddah",
        },
        {
            captainName: "Mark Acker",
            vesselName: "V5",
            arrivalDate: "2019-02-01",
            port: "Alexandria",
        },
    ];

    public async getAllTravelLogs(): Promise<ITravelLog[]> {
        return this.travelLogs;
    }

    public async FilterTravelLogsByCaptainName(
        captainName: string,
    ): Promise<ITravelLog[]> {
        return this.travelLogs.filter(log => log.captainName === captainName);
    }

    public async addTravelLog(travelLog: ITravelLog): Promise<ITravelLog> {
        this.travelLogs.push(travelLog);

        return travelLog;
    }
}
