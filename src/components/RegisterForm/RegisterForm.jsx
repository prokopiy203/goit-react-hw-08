import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import css from "./RegisterForm.module.css";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 не забудь цей імпорт

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Username too short")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, actions) => {
    await toast.promise(dispatch(register(values)).unwrap(), {
      loading: "Registering...",
      success: "Registration successful!",
      error: "Registration failed. Please try again.",
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.fieldWrapper}>
          <label htmlFor={nameId} className={css.label}>
            Username
          </label>
          <Field className={css.input} type="text" name="name" id={nameId} />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />
        </div>

        <div className={css.fieldWrapper}>
          <label htmlFor={emailId} className={css.label}>
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
          <label htmlFor={passwordId} className={css.label}>
            Password
          </label>
          <div className={css.passwordContainer}>
            <Field
              className={css.input}
              type={showPassword ? "text" : "password"}
              name="password"
              id={passwordId}
            />
            <button
              type="button"
              className={css.togglePassword}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className={css.errorMessage}
          />
        </div>

        <button className={css.button} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
