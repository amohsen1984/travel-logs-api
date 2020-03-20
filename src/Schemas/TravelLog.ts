import { IsNotEmpty } from "class-validator";
import { ArgsType, Field, ObjectType } from "type-graphql";
import { IsValidDate } from "../Utils/validators/IsValidDate";

@ObjectType()
@ArgsType()
export default class TravelLog {
    @Field()
    @IsNotEmpty({ message: "The cptainName field can not be empty" })
    public captainName: string;

    @Field()
    @IsNotEmpty({ message: "The vesselName field can not be empty" })
    public vesselName: string;

    @Field()
    @IsNotEmpty({ message: "The arrival field can not be empty" })
    @IsValidDate({ message: "Invalid arrivalDate" })
    public arrivalDate: string;

    @Field()
    @IsNotEmpty({ message: "The port field can not be empty" })
    public port: string;

    constructor() {
        this.captainName = "";
        this.vesselName = "";
        this.arrivalDate = "";
        this.port = "";
    }
}
