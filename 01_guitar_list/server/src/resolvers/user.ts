import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";

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
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("UsernameOrEmail") UsernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      UsernameOrEmail.includes('@')
        ? { where: { email: UsernameOrEmail } }
        : { where: { username: UsernameOrEmail } }
    )

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "username or email doesn't exist"
          }
        ]
      }
    }

    const validPassword = await argon2d.verify(user.password, password)

    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "incorect password"
          }
        ]
      }
    }

    req.session.userId = user.id

    return { user }
  }

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

    req.session.userId = user.id

    // console.log('THIS IS SESSION ---------------------------')
    // console.log(req.session)

    // console.log("THIS IS USER.ID FROM TYPEORM ----------------------")
    // console.log(user.id)

    // console.log("THIS IS REQ.SESSION.USERID -----------------------")
    // console.log(req.session.userId)

    req.session.save(() => { })

    return { user }
  }
}