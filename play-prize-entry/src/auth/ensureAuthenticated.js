import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Auth from './auth';

const auth = new Auth();

const EnsureAuthenticated = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = React.useState(auth.isAuthenticated());
  
  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication(() => setIsAuthenticated(new Date()));
    }
    else if (!isAuthenticated) {
      auth.login();
    }
  }, [location]);

  return (
    <React.Fragment>
      {isAuthenticated && children}
    </React.Fragment>
  );
};

export default EnsureAuthenticated;
