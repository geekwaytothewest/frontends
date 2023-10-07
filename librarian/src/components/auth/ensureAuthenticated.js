import React, { Component } from 'react';
import Auth from './auth';

const auth = new Auth();

class EnsureAuthenticated extends Component {
  handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
    else if (!auth.isAuthenticated()) {
      auth.login();
    }
  };

  componentWillMount() {
    this.handleAuthentication(this.props);
  }
  
  render() {
    return (
      <React.Fragment>
        {
          auth.isAuthenticated() && this.props.children
        }
      </React.Fragment>
    );
  }
}

export default EnsureAuthenticated;
