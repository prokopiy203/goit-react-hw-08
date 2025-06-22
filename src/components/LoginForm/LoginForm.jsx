import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { useId } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (values, actions) => {
    await toast.promise(dispatch(logIn(values)).unwrap(), {
      loading: "Logging in...",
      success: "Login successful!",
      error: "Login failed. Please check your credentials.",
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.fieldWrapper}>
          <label className={css.label} htmlFor={emailId}>
            Email
          </label>
          <Field className={css.input} type="email" name="email" id={emailId} />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />
        </div>

        <div className={css.fieldWrapper}>
          <label className={css.label} htmlFor={passwordId}>
            Password
          </label>
          <Field
            className={css.input}
            type="password"
            name="password"
            id={passwordId}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={css.errorMessage}
          />
        </div>

        <button className={css.button} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
