import "reflect-metadata"

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { HelloResolver } from './resolvers/HelloResolver'
import { User } from './entities/User'
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm"
import express from 'express'
import path from "path";

const main = async () => {
  const connection = createConnection({
    type: "postgres",
    database: "guitar",
    username: "postgres",
    password: "postgres",
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User]
  });

  (await connection).runMigrations()

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('Server started on localhost:4000')
  })
}

main().catch((error) => {
  console.log(error)
})