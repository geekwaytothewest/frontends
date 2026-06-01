import React, { useEffect, useState } from 'react';
import { Spinner } from '@blueprintjs/core';
import { authInstance as auth } from '../auth/auth';
import ConventionPicker from './conventionPicker';

// Mirrors the basename regex in index.js: does the current URL already name a
// convention? If so this gate is a no-op passthrough.
const CON_RE = /\/org\/(\d+)\/con\/(\d+)(?:\/|$)/;

const conPath = (organizationId, conventionId) =>
  `/legacy/playandwin/org/${organizationId}/con/${conventionId}/`;

// Runs inside EnsureAuthenticated (so a token is available). When the URL has no
// convention prefix — e.g. the installed PWA launched from its convention-agnostic
// start_url — ask the backend which convention this user should default to. If one
// is active/upcoming, full-page navigate to it (so the router basename and API base
// re-evaluate under the prefix); otherwise show a picker of the user's conventions.
const ResolveConvention = ({ children }) => {
  const hasConvention = CON_RE.test(window.location.pathname || '');
  const [state, setState] = useState(
    hasConvention ? { status: 'ready' } : { status: 'resolving' }
  );

  useEffect(() => {
    if (hasConvention) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const token = await auth.getAccessToken();
        const response = await fetch(`${API_HOST}/api/userConPerm/current`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to resolve convention (${response.status})`);
        }

        const { current, conventions } = await response.json();
        if (cancelled) {
          return;
        }

        if (current) {
          window.location.replace(
            conPath(current.organizationId, current.conventionId)
          );
          return;
        }

        setState({ status: 'picking', conventions: conventions || [] });
      } catch (err) {
        if (!cancelled) {
          setState({ status: 'error', message: err.message });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hasConvention]);

  if (state.status === 'ready') {
    return <>{children}</>;
  }

  if (state.status === 'picking') {
    return (
      <ConventionPicker
        conventions={state.conventions}
        onSelect={c =>
          window.location.replace(conPath(c.organizationId, c.conventionId))
        }
      />
    );
  }

  if (state.status === 'error') {
    return (
      <main className='main-content'>
        <p>Could not load your conventions: {state.message}</p>
      </main>
    );
  }

  return <Spinner />;
};

export default ResolveConvention;
