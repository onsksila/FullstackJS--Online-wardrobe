import React from "react";
import { Redirect, Route } from "react-router";
import userRoutes from './userRoutes'

const AuthRoute = props => {
    const { isAuthUser, type } = props;
  if (type === "guest"  && isAuthUser ) return <Redirect to={userRoutes.home.path} />;
  else if (type === "private" && !isAuthUser) return  <Redirect to={userRoutes.login.path}/>;
   
  return <Route {...props} />;
};



export default AuthRoute;