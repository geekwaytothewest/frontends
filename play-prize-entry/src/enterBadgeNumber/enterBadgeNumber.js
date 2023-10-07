import React from 'react';
import { connect } from 'react-redux';
import { Button, Spinner, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import WrongBadgeNumberWarning from '../sharedComponents/wrongBadgeNumberWarning';
import LabeledInput from '../sharedComponents/labeledInput';
import { updatebadgeId, incrementStep } from '../actions/actions';
import { fetchCheckouts } from '../actions/checkouts';

const AuthenticatePresentation = ({
  badgeId,
  fetchCheckouts,
  updatebadgeId,
  nextButtonDisabled,
  loadingCheckouts,
  noCheckoutsFound
}) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      fetchCheckouts();
    }}
  >
    <p>Fill in your badge number to begin entering a new Play!</p>
    {noCheckoutsFound ? <WrongBadgeNumberWarning /> : ''}

    <div className='form-section authenticate-form-section'>
      <LabeledInput
        label='Badge #'
        inputId='badge-number'
        autoFocus={true}
        placeholder='Your Badge Number'
        value={badgeId}
        onChange={newText => updatebadgeId(newText)}
      />
      {loadingCheckouts ? (
        <Spinner />
      ) : (
        <Button
          rightIcon={IconNames.ARROW_RIGHT}
          large={true}
          intent={Intent.SUCCESS}
          text='Next'
          disabled={nextButtonDisabled}
          onClick={fetchCheckouts}
        />
      )}
    </div>
  </form>
);

const mapStateToProps = state => ({
  nextButtonDisabled: !state.user.badgeId || state.checkoutsList.loading,
  loadingCheckouts: state.checkoutsList.loading,
  badgeId: state.user.badgeId,
  noCheckoutsFound: state.checkoutsList.error
});

const mapDispatchToProps = dispatch => ({
  fetchCheckouts: () => dispatch(fetchCheckouts()),
  incrementStep: () => dispatch(incrementStep()),
  updatebadgeId: badgeId => dispatch(updatebadgeId(badgeId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatePresentation);
