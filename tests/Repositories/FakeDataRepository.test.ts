import { container } from "../../src/Container/inversify.config";
import TYPES from "../../src/Container/inversify.types";
import FakeDataRepository from "../../src/Repositories/FakeDataRepository";

const repository = container.get<FakeDataRepository>(TYPES.FakeDataRepository);

describe("MySqlDataRepository", () => {
    describe("getAlltravelLogs", () => {
        it("Should call query with select statement without any arguments", async () => {
            const data = await repository.getAllTravelLogs();

            expect(data).toStrictEqual([
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
            ]);
        });
    });

    describe("filterByCaptainName", () => {
        it("Should call query with select statement without any arguments", async () => {
            const data = await repository.FilterTravelLogsByCaptainName(
                "Mark Acker",
            );

            expect(data).toStrictEqual([
                {
                    captainName: "Mark Acker",
                    vesselName: "V5",
                    arrivalDate: "2019-02-01",
                    port: "Alexandria",
                },
            ]);
        });
    });

    describe("getAllLogs", () => {
        it("Should call query with insert statement", async () => {
            const data = await repository.addTravelLog({
                captainName: "James",
                vesselName: "P1",
                arrivalDate: "2019-01-01",
                port: "Alexandria",
            });

            expect(data).toStrictEqual({
                captainName: "James",
                vesselName: "P1",
                arrivalDate: "2019-01-01",
                port: "Alexandria",
            });
        });
    });
});
