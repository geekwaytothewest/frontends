import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import auth from '../auth';

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace('/');
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