import React, { Component } from 'react';
import { Navbar, Button, Alignment, Intent } from '@blueprintjs/core';
import auth from '../auth';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

const NavHeading = styled(Navbar.Heading)`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

class Nav extends Component {
  goTo = route => this.props.history.replace(`/${route}`);
  signIn = () => auth.signIn();
  signOut = () => {
    auth.signOut();
    this.props.history.replace('/');
  };
  render() {
    const isAuthenticated = auth.isAuthenticated();
    const btnText = isAuthenticated ? 'Log Out' : 'Log In';
    const btnAction = isAuthenticated ? this.signOut.bind(this) : this.signIn.bind(this);

    return (
      <Navbar className='bp3-dark' fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <NavHeading>Admin</NavHeading>
          <Navbar.Divider />
          {isAuthenticated && (
            <>
              <Button
                className='bp3-minimal'
                icon='list-columns'
                text='Collections'
                onClick={() => this.goTo('collections')}
              />
              <Button className='bp3-minimal' icon='person' text='Attendees' onClick={() => this.goTo('attendees')} />
            </>
          )}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {isAuthenticated && <NavHeading>{auth.getProfile().name}</NavHeading>}
          {!this.props.waitingForAuthResult && (
            <Button intent={Intent.PRIMARY} className='btn-margin' onClick={btnAction}>
              {btnText}
            </Button>
          )}
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default withRouter(Nav);
