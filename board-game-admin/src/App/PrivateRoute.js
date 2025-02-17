import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/unauthenticated' />)}
  />
);
