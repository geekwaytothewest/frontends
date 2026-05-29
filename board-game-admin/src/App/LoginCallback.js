import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import auth from '../auth';

class Callback extends Component {
  async componentDidMount() {
    const returnTo = await auth.handleAuthentication();
    // Full-page navigation (not history.replace) so the router basename and the
    // API base recompute under the convention prefix that was active pre-login.
    window.location.replace(returnTo || '/admin/');
  }
  render() {
    return (
      <div>
        <h1>Loading your profile...</h1>
        <Spinner />
      </div>
    );
  }
}

export default Callback;