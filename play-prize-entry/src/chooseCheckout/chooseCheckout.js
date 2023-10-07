import { Button, H3, Intent, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { connect } from 'react-redux';
import { restart } from '../actions/actions';
import WrongBadgeNumberWarning from '../sharedComponents/wrongBadgeNumberWarning';
import CheckoutsList from './checkoutsList';

const ChooseCheckout = ({ checkountsCount, loadingCheckouts, restart }) => {
  if (loadingCheckouts) {
    return <Spinner />;
  }

  if (!checkountsCount && !loadingCheckouts) {
    return <WrongBadgeNumberWarning />;
  }

  return (
    <>
      <div className='choose-checkout'>
        <H3>Choose from the games you have checked out:</H3>
        <CheckoutsList />
        <div className='button-group w100'>
          <Button
            intent={Intent.DANGER}
            className='back-button'
            text='Back'
            icon={IconNames.ARROW_LEFT}
            onClick={restart}
          />
          <div>&nbsp;</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  checkountsCount: state.checkoutsList.checkouts.length,
  loadingCheckouts: state.checkoutsList.loading
});
const mapDispatchToProps = dispatch => ({ restart: () => dispatch(restart()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseCheckout);
