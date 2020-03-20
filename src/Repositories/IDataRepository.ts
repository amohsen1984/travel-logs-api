import ITravelLog from "../DTO/ITravelLog";

export default interface IDataRepository {
    FilterTravelLogsByCaptainName(captainName: string): Promise<ITravelLog[]>;
    getAllTravelLogs(): Promise<ITravelLog[]>;
    addTravelLog(travelLog: ITravelLog): Promise<ITravelLog>;
}
