import { Form, Formik } from "formik";

import Container from "components/Container";
import { useLoginMutation } from "generated/graphql";
import { useRouter } from "next/dist/client/router";

const Login: React.FC<Record<string, never>> = () => {
  const router = useRouter()

  const [login] = useLoginMutation()

  return (<Container>
    <Formik
      initialValues={{ UsernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({
          variables: values,
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.login.user,
              },
            });
            cache.evict({ fieldName: "posts:{}" });
          },
        });
        if (response.data?.login.errors) {
          console.log(response.data.login.errors)
          // setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
          if (typeof router.query.next === "string") {
            router.push(router.query.next);
          } else {
            // worked
            router.push("/");
          }
        }
      }}
    >
      {/* {({ isSubmitting }) => ( */}
      <Form className="flex flex-col space-y-2">
        <h2>Username or Email</h2>
        <input className="px-4 py-2 rounded-md outline-none bg-gray-200 dark:bg-gray-800" name="UsernameOrEmail" placeholder="john@appleseed.com" aria-label="UsernameOrEmail">
        </input>

        <h2>Password</h2>
        <input className="px-4 py-2 mb-4 rounded-md outline-none bg-gray-200 dark:bg-gray-800" name="password" placeholder="********" aria-label="password">
        </input>
        <button
          type="submit"
          className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md"
        >
          Sign In
        </button>
      </Form>
      {/* )} */}
    </Formik>
  </Container>);
}

export default Login