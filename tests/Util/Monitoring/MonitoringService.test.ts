import { ILog } from "fikrah-ts-logger";
import { container } from "../../../src/Container/inversify.config";
import TYPES from "../../../src/Container/inversify.types";
import MonitoringService from "../../../src/Utils/Monitoring/MonitoringService";
import DefaultJsonMonitoringStrategy from "../../../src/Utils/Monitoring/MonitoringStrategies/DefaultJsonMonitoringStrategy";

const monitoringService: MonitoringService = container.get<MonitoringService>(
    TYPES.MonitoringService,
);

describe("MonitoringService", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("monitor", () => {
        it("Should not log if monitoring is disabled", async () => {
            monitoringService.jsonMonitoringStatus = false;

            const defaultJsonMonitoringStrategy: DefaultJsonMonitoringStrategy = container.get<
                DefaultJsonMonitoringStrategy
            >(TYPES.DefaultJsonMonitoringStrategy);

            defaultJsonMonitoringStrategy.getMonitoringLog = jest.fn();

            await monitoringService.jsonMonitor({});

            expect(
                defaultJsonMonitoringStrategy.getMonitoringLog,
            ).not.toBeCalled();
        });

        it("Should log using the default monitoring startegy if monitoring is enabled and no monitoring strategy matching the monitored service", async () => {
            monitoringService.jsonMonitoringStatus = true;

            const defaultJsonMonitoringStrategy: DefaultJsonMonitoringStrategy = container.get<
                DefaultJsonMonitoringStrategy
            >(TYPES.DefaultJsonMonitoringStrategy);

            defaultJsonMonitoringStrategy.getMonitoringLog = jest.fn(
                () =>
                    ({
                        level: "info",
                        message: "Test.getData has been called",
                        context: {},
                    } as ILog),
            );

            await monitoringService.jsonMonitor({
                scope: {
                    constructor: {
                        name: "Test",
                    },
                },
                key: "getData",
                args: [1, 3, 4, 5],
                result: 6,
            });

            expect(
                defaultJsonMonitoringStrategy.getMonitoringLog,
            ).toHaveBeenCalledWith("Test.getData", [1, 3, 4, 5], 6);
        });
    });
});
