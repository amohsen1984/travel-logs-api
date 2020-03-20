import { Pool } from "mysql2/promise";
import { container } from "../../src/Container/inversify.config";
import TYPES from "../../src/Container/inversify.types";
import MySqlDataRepository from "../../src/Repositories/MySqlDataRepository";

const pool = container.get<Pool>(TYPES.MySqlPool);
const repository = container.get<MySqlDataRepository>(
    TYPES.MySqlDataRepository,
);

describe("MySqlDataRepository", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("getAlltravelLogs", () => {
        it("Should call query with select statement without any arguments", async () => {
            pool.query = jest.fn();

            await repository.getAllTravelLogs();

            expect(pool.query).toHaveBeenCalledWith(
                "SELECT captainName, vesselName, arrivalDate, port from logs",
            );
        });
    });

    describe("filterByCaptainName", () => {
        it("Should call query with select statement without any arguments", async () => {
            pool.query = jest.fn();

            await repository.FilterTravelLogsByCaptainName("James");

            expect(
                pool.query,
            ).toHaveBeenCalledWith(
                "SELECT captainName, vesselName, arrivalDate, port from logs WHERE captainName = ?",
                ["James"],
            );
        });
    });

    describe("addTravelLog", () => {
        it("Should call query with insert statement", async () => {
            pool.query = jest.fn();

            await repository.addTravelLog({
                captainName: "James",
                vesselName: "P1",
                arrivalDate: "2019-01-01",
                port: "Alexandria",
            });

            expect(pool.query).toHaveBeenCalledWith("INSERT INTO logs SET ?", {
                captainName: "James",
                vesselName: "P1",
                arrivalDate: "2019-01-01",
                port: "Alexandria",
            });
        });
    });
});
