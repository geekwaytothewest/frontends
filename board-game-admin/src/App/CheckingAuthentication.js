import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';

class CheckingAuthentication extends Component {
  render() {
    return (
      <div>
        <h1>Looking for authentication...</h1>
        <Spinner />
      </div>
    );
  }
}

export default CheckingAuthentication;