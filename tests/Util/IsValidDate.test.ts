import { IsValidDate } from "../../src/Utils/validators/IsValidDate";

import { validateSync } from "class-validator";

describe("IsValidDate", () => {
    it("Valid date", async () => {
        const testInstance = new TestClass("2019-01-01");
        const validationErrors = validateSync(testInstance);

        expect(validationErrors.length).toEqual(0);
    });

    it("Invalid date", async () => {
        const testInstance = new TestClass("Invalid");
        const validationErrors = validateSync(testInstance);

        expect(validationErrors.length).toEqual(1);
    });
});

class TestClass {
    @IsValidDate()
    public date: string;
    constructor(date: string) {
        this.date = date;
    }
}
