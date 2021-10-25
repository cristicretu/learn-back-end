import "reflect-metadata"

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Guitar } from "./entities/Guitar";
import { GuitarResolver } from "./resolvers/guitar";
import { HelloResolver } from './resolvers/HelloResolver'
import { MyContext } from "./types";
import Redis from "ioredis"
import { User } from './entities/User'
import { UserResolver } from "./resolvers/user";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis"
import cors from "cors"
import { createConnection } from "typeorm"
import express from 'express'
import path from "path";
import session from "express-session"

const main = async () => {
  const connection = createConnection({
    type: "postgres",
    database: "guitar",
    username: "postgres",
    password: "postgres",
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Guitar]
  });

  (await connection).runMigrations()

  // await User.delete({})

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis()

  app.set("trust proxy", 1);

  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     credentials: true,
  //   })
  // )

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "iwdaowidhawoudhuyergiuer",
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, GuitarResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(4000, () => {
    console.log('Server started on localhost:4000')
  })
}

main().catch((error) => {
  console.log(error)
})