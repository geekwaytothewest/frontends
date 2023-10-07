import React from 'react';
import { connect } from 'react-redux';
import { H1 } from '@blueprintjs/core';
import Authenticate from '../enterBadgeNumber/enterBadgeNumber';
import ChooseCheckout from '../chooseCheckout/chooseCheckout';
import WrongUserWarning from './wrongUserWarning';
import EnterPlay from '../enterPlayInfo/enterPlay';
import ReviewPlay from '../reviewPlay/reviewPlay';
import FinalStep from '../playSubmitted/finalStep';

let App = ({ step, user }) => {
  let currentStepComponent;
  switch (step) {
  case 1:
    currentStepComponent = <Authenticate />;
    break;
  case 2:
    currentStepComponent = <ChooseCheckout />;
    break;
  case 3:
    currentStepComponent = <EnterPlay />;
    break;
  case 4:
    currentStepComponent = <ReviewPlay />;
    break;
  case 5:
    currentStepComponent = <FinalStep />;
    break;
  default:
    currentStepComponent = <Authenticate />;
  }

  return (
    <main className='main-content'>
      <div className='main-content-header'>
        <H1 className='main-content-header-title'>Play and Win</H1>
        {user.name && user.badgeId ? <WrongUserWarning /> : ''}
      </div>
      {currentStepComponent}
    </main>
  );
};

App = connect(state => state)(App);

export default App;
