/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Logo from "../assets/logo.png";
import { Input } from "../components/input";
import { login } from "../redux/actions";
import { Button } from "../components/button";
import { LoginValidations } from "../utils/validations"

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
  
    const [rememberMe, setrememberMe] = useState(localStorage.getItem("r_me") || false);
  
    const handleSwitch = () => {
      setrememberMe(!rememberMe);
      localStorage.setItem("r_me", !rememberMe);
    }
  
    const handleClick = useCallback(
      async (values) => {
        const payload = {
          email: values.email.toLowerCase(),
          password: values.password
        };
        await login(payload, history)(dispatch);
      },
      [dispatch]
    );
  
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
      useFormik({
        validationSchema: LoginValidations,
        initialValues: {
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
          <img src={Logo} alt="mono logo" style={{opacity:"1"}} /><br/>
          <p>Securely login to your account</p>
        </div>
        <div className="p-container">
          <Input
            className=" mb-8"
            type="text"
            // label="Email"
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
            // label="Password"
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
            <div style={{display:"flex"}}>
              <input checked={rememberMe} type="checkbox" className="checkbox" onChange={handleSwitch} />
              <p className="ml-5">Remember me</p>
            </div>
            <p> I forgot my password</p>
          </div>
          <Button
            title="log in"
            type="primary"
            onClick={handleSubmit}
          />
          <p className="tny-txt secondary">Don’t have an account? <a className="link" onClick={()=> history.push("/create-user")}>Sign up</a></p>
        </div>
      </div>
      
    </div>
  );
  }
  
  export default Login;
  