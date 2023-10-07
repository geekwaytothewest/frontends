import React from 'react';
import { connect } from 'react-redux';
import { attendeeEntryStyles } from './attendeeEntry.styles';
import { updateAttendeeId } from '../../actions/checkInOutActions';
import LabeledInput from '../shared/LabeledInput';

const AttendeeEntry = ({ attendeeId, gameTitle, checkingIn, updateAttendeeId }) => {
  if (!gameTitle || checkingIn) {
    return '';
  }

  return (
    <div className={`bp3-input-group ${attendeeEntryStyles}`}>
      <LabeledInput
        label='Attendee Badge #'
        inputId='attendee-id'
        autoFocus={true}
        value={attendeeId}
        allowWhitespace={false}
        onChange={newText => updateAttendeeId(newText)}
        placeholder='Scan Badge'
        disabled={checkingIn}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  attendeeId: state.checkInOut.attendeeId,
  gameTitle: state.checkInOut.gameTitle,
  checkingIn: state.checkInOut.checkingIn
});
const mapDispatchToProps = dispatch => ({
  updateAttendeeId: attendeeId => dispatch(updateAttendeeId(attendeeId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeeEntry);
