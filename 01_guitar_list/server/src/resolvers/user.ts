import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";

import { User } from "../entities/User";
import { MyContext } from "../types";
import { UnsernamePasswordInput } from "../utils/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import argon2d from "argon2";

@ObjectType()
class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UnsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options)

    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2d.hash(options.password)

    const doesUsernameExist = await User.findOne({ username: options.username })

    if (doesUsernameExist) {
      return {
        errors: [
          {
            field: "username",
            message: "username already exists"
          }
        ]
      }
    }

    const doesEmailExist = await User.findOne({ email: options.email })

    if (doesEmailExist) {
      return {
        errors: [
          {
            field: "email",
            message: "email already exists"
          }
        ]
      }
    }

    let user
    try {
      user = await User.create({
        email: options.email,
        username: options.username,
        password: hashedPassword,
      }).save()
    } catch (err) {
      return {
        errors: [
          {
            field: "user-creation",
            message: "user could not be created"
          }
        ]
      }
    }

    // req.session.userId = user.id

    return { user }
  }
}