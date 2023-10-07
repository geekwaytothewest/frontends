import React from 'react';
import { connect } from 'react-redux';
import { Button, Intent } from '@blueprintjs/core';
import { buttonStyles } from './inOutButton.styles';
import toastTypes from '../../toastTypes';
import { checkStatus, checkOut, updateAttendeeId } from '../../actions/checkInOutActions';
import actionTypes from '../../actions/actionTypes';

const GetButton = (text, action, disabled = false, loading = false) => {
  return (
    <Button
      type='submit'
      className={buttonStyles}
      disabled={disabled}
      loading={loading}
      onClick={action}
      text={text}
      intent={Intent.SUCCESS}
    />
  );
};

const InOutButton = props => {
  const { gameTitle, copyId, attendeeId, overrideLimit } = props;
  const { loading, disabled, checkStatus, checkOut } = props;
  if (!gameTitle) {
    return GetButton('Submit', () => checkStatus(copyId), disabled, loading);
  }

  return GetButton('Check Out', () => checkOut(copyId, attendeeId, overrideLimit), disabled, loading);
};

const mapStateToProps = state => {
  const { copyId, gameTitle, attendeeId, checkingStatus, checkingIn, checkingOut, overrideLimit } = state.checkInOut;
  return {
    gameTitle,
    copyId,
    attendeeId,
    overrideLimit,
    loading: checkingStatus || checkingIn || checkingOut,
    disabled: !copyId || (gameTitle && !attendeeId)
  };
};

const mapDispatchToProps = dispatch => ({
  // checkStatus will result in a check in if copy is checked out already
  checkStatus: () => {
    dispatch(checkStatus());
  },
  checkOut: (copyId, attendeeId, overrideLimit) => {
    if (!attendeeId.trim()) {
      dispatch(updateAttendeeId(''));
      document.getElementById('attendee-id').focus();
      return dispatch(getInvalidIdAction('Bad Attendee Badge #', 'The attendee Badge # was out of range'));
    }
    dispatch(checkOut(copyId, attendeeId, overrideLimit));
  }
});

const getInvalidIdAction = (title, text) => ({
  type: actionTypes.makeToast,
  title,
  text,
  toastType: toastTypes.warning
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InOutButton);
