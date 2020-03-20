import { ILogger } from "fikrah-ts-logger";
import { afterMethod, Metadata } from "kaop-ts";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { container } from "../Container/inversify.config";
import TYPES from "../Container/inversify.types";
import ITravelLog from "../DTO/ITravelLog";
import IDataRepository from "../Repositories/IDataRepository";
import TravelLog from "../Schemas/TravelLog";
import IJsonMonitor from "../Utils/Monitoring/IJsonMonitor";
import MonitoringAdvices from "../Utils/Monitoring/MonitoringAdvices";
import MonitoringService from "../Utils/Monitoring/MonitoringService";

@Resolver(of => TravelLog)
export default class TravelLogResolver implements IJsonMonitor {
    private dataRepository: IDataRepository;
    private monitoringService: MonitoringService;
    private logger: ILogger;

    constructor(
        dataRepository: IDataRepository = container.get<IDataRepository>(
            TYPES.SelectedDataRepository,
        ),
        monitoringService: MonitoringService = container.get<MonitoringService>(
            TYPES.MonitoringService,
        ),
        logger: ILogger = container.get<ILogger>(TYPES.Logger),
    ) {
        this.dataRepository = dataRepository;
        this.monitoringService = monitoringService;
        this.logger = logger;
    }

    @afterMethod(MonitoringAdvices.jsonMonitorAdvice)
    @Query(returns => [TravelLog], { nullable: true })
    public async travelLogsByCaptainName(
        @Arg("cptainName") captainName: string,
    ): Promise<ITravelLog[] | undefined> {
        try {
            return this.dataRepository.FilterTravelLogsByCaptainName(
                captainName,
            );
        } catch (error) {
            this.logger.error(error.message);
            throw Error(`Failed to get travel logs.`);
        }
    }

    @afterMethod(MonitoringAdvices.jsonMonitorAdvice)
    @Query(returns => [TravelLog], { nullable: true })
    public async allTravelLogs(): Promise<ITravelLog[] | undefined> {
        try {
            return this.dataRepository.getAllTravelLogs();
        } catch (error) {
            this.logger.error(error.message);
            throw Error(`Failed to get travel logs`);
        }
    }

    @afterMethod(MonitoringAdvices.jsonMonitorAdvice)
    @Mutation(returns => TravelLog)
    public async addTravelLog(
        @Args() { captainName, vesselName, arrivalDate, port }: TravelLog,
    ): Promise<ITravelLog> {
        try {
            return this.dataRepository.addTravelLog({
                captainName,
                vesselName,
                arrivalDate,
                port,
            });
        } catch (error) {
            this.logger.error(error.message);
            throw Error(`Failed to inject the travel log`);
        }
    }

    public async jsonMonitor(meta: Metadata<TravelLogResolver>) {
        if (this.monitoringService) {
            this.monitoringService.jsonMonitor(meta);
        }
    }
}
