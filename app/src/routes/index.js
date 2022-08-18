/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import {BrowserRouter, Redirect, Switch } from 'react-router-dom';
import AuthRoutes from "./auth";
import PrivateRoutes from "./private";
import history from "../helpers/history";

const Routes = props => {
    const Login = lazy(() => import('../views/login'));
    const Signup = lazy(() => import('../views/signup'));
    const Dashboard = lazy(() => import('../views/dashboard'));
    
  return (
    <>
      <BrowserRouter history={history}>
        <Suspense fallback={<div> loading...</div>} >
          <Switch>
            <AuthRoutes exact path="/" component={Login} />
            <AuthRoutes exact path="/register-user" component={Signup} />
            
            <AuthRoutes exact path="/user-dashboard" component={Dashboard} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
};


export default Routes;