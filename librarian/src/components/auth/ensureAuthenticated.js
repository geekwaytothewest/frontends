import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authInstance as auth } from './auth';

const EnsureAuthenticated = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (new URLSearchParams(location.search).has('code')) {
        await auth.handleAuthentication(() => setIsAuthenticated(true));
      } else {
        const authenticated = await auth.isAuthenticated();
        if (authenticated) {
          setIsAuthenticated(true);
        } else {
          auth.login();
        }
      }
    };
    checkAuth();
  }, [location]);

  return (
    <React.Fragment>
      {isAuthenticated && children}
    </React.Fragment>
  );
};

export default EnsureAuthenticated;
