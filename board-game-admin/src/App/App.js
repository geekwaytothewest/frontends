import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import Nav from './Nav';
import auth from '../auth';
import LoginCallback from './LoginCallback';
import history from './history';
import colorPalette from '../colorPalette';
import Collections from '../Collections/Collections';
import Attendees from '../Attendees/Attendees';
import { PrivateRoute } from './PrivateRoute';
import CheckingAuthentication from './CheckingAuthentication';
import createReduxStore from '../Redux/store';
import { Provider } from 'react-redux';
import GamesList from '../GamesList/GamesList';

const AppContent = styled.div`
  background-color: ${colorPalette.LIGHT_GRAY3};
  color: ${colorPalette.DARK_GRAY2};
  flex: 1;
  height: 100%;
  padding: 0.3em;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const Unauthenticated = () => <h1>Please Log In</h1>;

class App extends Component {
  constructor(args) {
    super(args);
    this.state = { waitingForAuthResult: true, reduxStore: null };
    auth
      .renewSession()
      .catch(() => {})
      .finally(() => {
        const reduxStore = createReduxStore();
        this.setState({ waitingForAuthResult: false, reduxStore });
      });
  }

  render() {
    return (
      <BrowserRouter history={history} basename='/admin/'>
        <Nav waitingForAuthResult={this.state.waitingForAuthResult} auth={auth} history={history} />
        <AppContent>
          {this.state.waitingForAuthResult && <CheckingAuthentication />}
          {!this.state.waitingForAuthResult && (
            <>
              <Route path='/callback' component={LoginCallback} />
              <Route path='/unauthenticated' render={props => <Unauthenticated {...props} />} />
              <Provider store={this.state.reduxStore}>
                <PrivateRoute auth={auth} path='/games' component={GamesList} />
                <PrivateRoute auth={auth} path='/collections' component={Collections} />
                <PrivateRoute auth={auth} path='/attendees' component={Attendees} />
                <PrivateRoute auth={auth} path='/' component={() => <Redirect to='/collections' />} />
              </Provider>
            </>
          )}
        </AppContent>
      </BrowserRouter>
    );
  }
}

export default App;
