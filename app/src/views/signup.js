/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Logo from "../assets/logo.png";
import { Input } from "../components/input";
import { signUp } from "../redux/actions";
import { SignupValidations } from "../utils/validations";
import { Button } from "../components/button";

function Signup() {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleClick = useCallback(
      async (values) => {
        const payload = {
          firstname: values.firstname, 
          lastname: values.lastname,
          email: values.email.toLowerCase(),
          password: values.password
        };
        await signUp(payload, history)(dispatch);
      },
      [dispatch]
    );
  
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
      useFormik({
        validationSchema: SignupValidations,
        initialValues: {
          firstname: "",
          lastname: "",
          email: "",
          password: ""
        },
        onSubmit: () => handleClick(values),
        onReset: () => null
      });
  return (
    <div className="auth">
      <div className="panel">
        <div className="p-banner">
          <img src={Logo} alt="mono logo" /><br/>
          <p>Track all your bank expenses in one place</p>
        </div>
        <div className="p-container">
          <div className="multi-inpt">
              <Input
              className=" mb-8"
              type="text"
              placeholder="First Name"
              name="firstname"
              maskChar=""
              autoComplete="off"
              value={values.firstname}
              onChange={handleChange("firstname")}
              onBlur={handleBlur("firstname")}
              error={errors.firstname}
              touched={touched.firstname}
              />
              <Input
              className=" mb-8"
              type="text"
              placeholder="Last Name"
              name="lastname"
              maskChar=""
              autoComplete="off"
              value={values.lastname}
              onChange={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
              error={errors.lastname}
              touched={touched.lastname}
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
          <Button
            title="get started"
            type="primary"
            onClick={handleSubmit}
          />
          <p className="tny-txt secondary">Already have an account? <a className="link" onClick={()=>history.push("/")}>Sign in</a></p>
        </div>
      </div>
      
    </div>
  );
  }
  
  export default Signup;