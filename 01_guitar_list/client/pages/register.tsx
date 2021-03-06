import { ErrorMessage, Field, Form, Formik } from "formik";

import Container from "components/Container";
import { useRegisterMutation } from "generated/graphql";
import { useRouter } from "next/dist/client/router";
import { withApollo } from "utils/withApollo";

const Register: React.FC<Record<string, string>> = () => {
  const router = useRouter()

  const [register] = useRegisterMutation()

  return (<Container>
    <h1 className="text-2xl font-bold">Register</h1>
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values) => {
        const response = await register({ variables: { username: values.username, password: values.password, email: values.email } })
        if (response.data?.register.errors) {
          // setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          // worked
          router.push("/");
        }
      }}
    >
      <Form className="flex flex-col space-y-4">
        <h2>Email</h2>
        <Field type="email" name="email" className="px-4 py-2 rounded-md" />
        <ErrorMessage name="email" component="div" />

        <h2>Username</h2>
        <Field type="username" name="username" className="px-4 py-2 rounded-md" />
        <ErrorMessage name="username" component="div" />

        <h2>Password</h2>
        <Field type="password" name="password" className="px-4 py-2 rounded-md" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">
          Sign Up
        </button>
      </Form>
    </Formik>
  </Container>);
}

export default withApollo({ ssr: false })(Register)