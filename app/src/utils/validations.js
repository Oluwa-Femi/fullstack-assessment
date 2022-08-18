import * as Yup from "yup";

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

export const LoginValidations = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email.")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  });

export const SignupValidations = () =>
    Yup.object().shape({
        first_name: Yup.string()
        .required("firstName is required"),
        last_name: Yup.string()
        .required("lastName is required"),
        email: Yup.string()
        .email("Invalid email, please provide a valid email.")
        .required("Email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(passwordRegExp, "Password must contain an uppercase letter,number and special character")
        .required("Password is required"),
});