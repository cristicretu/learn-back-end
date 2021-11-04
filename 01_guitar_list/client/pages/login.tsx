import { ErrorMessage, Field, Form, Formik } from "formik";

import Container from "components/Container";
import { useApolloClient } from "@apollo/client";
import { useLoginMutation } from "generated/graphql";
import { useRouter } from "next/dist/client/router";
import { withApollo } from "utils/withApollo";

const Login: React.FC<Record<string, never>> = () => {
  const router = useRouter()

  const apolloClient = useApolloClient();

  const [login] = useLoginMutation()

  return (<Container>
    <h1 className="text-2xl font-bold">Login</h1>
    <Formik
      initialValues={{ UsernameOrEmail: "", password: "" }}
      onSubmit={async (values) => {
        const response = await login({ variables: { UsernameOrEmail: values.UsernameOrEmail, password: values.password } })
        if (response.data?.login.errors) {
          // setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.login.user) {
          // worked

          //invalidate cache
          apolloClient.resetStore()
          router.push("/");
        }
      }}
    >
      <Form className="flex flex-col space-y-4">
        <h2>Username Or Email</h2>
        <Field name="UsernameOrEmail" className="px-4 py-2 rounded-md" />
        <ErrorMessage name="UsernameOrEmail" component="div" />

        <h2>Password</h2>
        <Field type="password" name="password" className="px-4 py-2 rounded-md" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">
          Sign In
        </button>
      </Form>
      {/* )} */}
    </Formik>
  </Container>);
}

export default withApollo({ ssr: false })(Login)