import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authInstance as auth } from './auth';

// The kiosk runs unattended for long stretches (e.g. sitting idle overnight
// between convention days), and its screen flow is driven by redux `step`, not
// routing, so the mount-time check would otherwise be the only validation for
// the life of the tab. Revalidate on a timer so an expired/revoked session is
// caught and re-login triggered before the next attendee tries to enter a
// badge number. getAccessToken refreshes silently while the session is alive.
const SESSION_CHECK_INTERVAL_MS = 5 * 60 * 1000;

const EnsureAuthenticated = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    if (new URLSearchParams(location.search).has('code')) {
      await auth.handleAuthentication(() => setIsAuthenticated(true));
      return;
    }
    // Proactively fetch a token rather than trusting the cached
    // isAuthenticated() flag. getAccessToken refreshes silently when it can
    // and calls login() on an expired/revoked session, so a dead session is
    // discovered here instead of mid-flow on the first API call when the
    // user submits a badge number (losing the data they just entered).
    try {
      await auth.getAccessToken();
      setIsAuthenticated(true);
    } catch {
      // getAccessToken already initiated login() for unrecoverable auth
      // errors; swallow transient (e.g. network) errors so a blip doesn't
      // tear down a still-live session.
    }
  }, [location]);

  useEffect(() => {
    checkAuth();

    const intervalId = setInterval(checkAuth, SESSION_CHECK_INTERVAL_MS);
    // Also revalidate the moment an attendee returns to a tab that was hidden,
    // so they don't have to wait out the interval (and hit a stale session).
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [checkAuth]);

  return (
    <React.Fragment>
      {isAuthenticated && children}
    </React.Fragment>
  );
};

export default EnsureAuthenticated;
