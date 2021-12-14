import React from 'react';
import userRoutes from './userRoutes';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';

const RoutePrivate = () => {
  console.log("ici c'est RoutePrivate")
  window.user.isAuthUser=true;
     window.user.isAuthUser ?
         <Route to="/home" />
       : <Redirect to={userRoutes.login.path}/>     
 }



export default RoutePrivate;