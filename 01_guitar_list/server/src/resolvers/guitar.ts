import { Guitar } from "../entities/Guitar";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@InputType()
class GuitarInput {
  @Field()
  year: number

  @Field()
  brand: string

  @Field()
  model: string

  @Field()
  color: string
}

@Resolver()
export class GuitarResolver {
  @Query(() => Guitar, { nullable: true })
  guitar(
    @Arg("id") id: number
  ): Promise<Guitar | undefined> {
    return Guitar.findOne(id)
  }

  @Mutation(() => Guitar)
  @UseMiddleware(isAuth)
  async createGuitar(
    @Arg("input") input: GuitarInput,
    @Ctx() { req }: MyContext
  ): Promise<Guitar> {
    return Guitar.create({
      ...input,
      creatorId: req.session.userId,
    }).save()
  }
}