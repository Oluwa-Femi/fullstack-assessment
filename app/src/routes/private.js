import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoutes = ({ component: PrivateComponent, ...rest}) => {
    const loading = useSelector(state => state.loading)
    return ( 
        <Route
          {...rest}
          render={props =>
            localStorage.token ? (
                <PrivateComponent {...props} isLoading={loading.isLoading} />
            ) : (
              <Redirect to="/" />
            )
          }
        />

     );
}
 
export default AuthRoutes;