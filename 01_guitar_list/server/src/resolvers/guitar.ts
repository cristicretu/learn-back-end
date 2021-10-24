import { Query, Resolver } from "type-graphql";

@Resolver()
export class GuitarResolver {
  @Query(() => String)
  guitar() {
    return "Hello, World!"
  }
}