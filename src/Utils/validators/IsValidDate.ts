import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from "class-validator";
import moment from "moment";

export const IsValidDate = (validationOptions?: ValidationOptions) => {
    return function(object: any, propertyName: string) {
        registerDecorator({
            name: "isValidDate",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any, args: ValidationArguments) => {
                    try {
                        return moment(value, "YYYY-MM-DD", true).isValid();
                    } catch (e) {
                        return false;
                    }
                },
            },
        });
    };
};
