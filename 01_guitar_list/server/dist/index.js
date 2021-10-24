"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const HelloResolver_1 = require("./resolvers/HelloResolver");
const User_1 = require("./entities/User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const main = async () => {
    const connection = (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "guitar",
        username: "postgres",
        password: "postgres",
        logging: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [User_1.User]
    });
    (await connection).runMigrations();
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [HelloResolver_1.HelloResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('Server started on localhost:4000');
    });
};
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map