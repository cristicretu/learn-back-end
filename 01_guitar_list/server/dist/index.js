"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const Guitar_1 = require("./entities/Guitar");
const guitar_1 = require("./resolvers/guitar");
const HelloResolver_1 = require("./resolvers/HelloResolver");
const ioredis_1 = __importDefault(require("ioredis"));
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const constants_1 = require("./constants");
const type_graphql_1 = require("type-graphql");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const main = async () => {
    const connection = (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "guitar",
        username: "postgres",
        password: "postgres",
        logging: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [User_1.User, Guitar_1.Guitar]
    });
    (await connection).runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: "qid",
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "iwdaowidhawoudhuyergiuer",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [HelloResolver_1.HelloResolver, guitar_1.GuitarResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log('Server started on localhost:4000');
    });
};
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map