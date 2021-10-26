import { ErrorMessage, Field, Form, Formik } from "formik";

import Container from "components/Container";
import { InputField } from "components/InputField";
import { useRegisterMutation } from "generated/graphql";
import { useRouter } from "next/dist/client/router";

const Login: React.FC<Record<string, never>> = () => {
  const router = useRouter()

  const [register] = useRegisterMutation()

  return (<Container>
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, actions) => {
        const response = await register({ values })

        // router.push("/")
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

export default Login