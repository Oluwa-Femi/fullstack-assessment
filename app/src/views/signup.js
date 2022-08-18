/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Logo from "../assets/logo.png";
import { Input } from "../components/input";
import { signUp } from "../redux/actions";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = useCallback(
    async (values) => {
      const payload = {
        name: values.first_name + " " + values.last_name,
        email: values.email.toLowerCase(),
        password: values.password,
      };
      await signUp(payload, history)(dispatch);
    },
    [dispatch]
  );

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
    //   validationSchema: SignupValidations,
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      onSubmit: () => handleClick(values),
      onReset: () => null,
    });
  return (
    <div className="auth">
      <div className="panel">
        <div className="p-banner">
          <img src={Logo} alt="mono logo" />
          <br />
          <p>Track all your bank expenses in one place</p>
        </div>
        <div className="p-container">
          <div className="multi-inpt">
            <Input
              className=" mb-8"
              type="text"
              placeholder="First Name"
              name="first_name"
              maskChar=""
              autoComplete="off"
              value={values.first_name}
              onChange={handleChange("first_name")}
              onBlur={handleBlur("first_name")}
              error={errors.first_name}
              touched={touched.first_name}
            />
            <Input
              className=" mb-8"
              type="text"
              placeholder="Last Name"
              name="last_name"
              maskChar=""
              autoComplete="off"
              value={values.last_name}
              onChange={handleChange("last_name")}
              onBlur={handleBlur("last_name")}
              error={errors.last_name}
              touched={touched.last_name}
            />
          </div>
          <Input
            className=" mb-8"
            type="text"
            placeholder="Email"
            name="email"
            maskChar=""
            autoComplete="off"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
          />
          <Input
            className="mb-8"
            type="password"
            placeholder="Enter your password"
            name="password"
            maskChar=""
            autoComplete="off"
            value={values.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
          />
          <div className="actions">
            <p></p>
            <p> I forgot my password</p>
          </div>
          <button title="get started" type="primary" onClick={handleSubmit} />
          <p className="tny-txt secondary">
            Already have an account?{" "}
            <a className="link" onClick={() => history.push("/")}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
