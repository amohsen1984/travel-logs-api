import { ILogger } from "fikrah-ts-logger";
import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { container } from "./Container/inversify.config";
import TYPES from "./Container/inversify.types";
import TravelLogsResolver from "./Resolvers/TravelLogsResolver";

async function bootstrap() {
    const logger = container.get<ILogger>(TYPES.Logger);
    const schema = await buildSchema({
        resolvers: [TravelLogsResolver],
    });

    const server = new GraphQLServer({
        schema,
    });

    const port = process.env.PORT || "8080";

    server.start({ port }, () =>
        logger.info(
            `Server is running, You can use the playground at http://localhost:${port}`,
        ),
    );
}

bootstrap();
