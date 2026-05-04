import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createReplacementBadgeAction, toggleBadgeReplacementDialog } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const ReplacementBadgeDialog = ({ saving, processReplacement, isOpen, toggleDialog, selectedAttendee }) => {
  const [oldBadgeNumber, setOldBadgeNumber] = useState('');
  const [newBadgeNumber, setNewBadgeNumber] = useState('');

  const setFields = (oldBadgeNum = '') => {
    setOldBadgeNumber(oldBadgeNum);
  };

  return (
    <SaveDialog
      helperText='Create a replacement badge for an attendee. This will invalidate the old badge number and update a blank badge with the same name and pronouns.'
      headerText='Replace Badge'
      saving={saving}
      disabled={saving}
      save={() => processReplacement(oldBadgeNumber, newBadgeNumber)}
      isOpen={isOpen}
      onOpening={() => setFields(selectedAttendee.BadgeNumber)}
      close={toggleDialog}
      onClosed={setFields}
    >
      <LabeledInput label='New Badge #' value={newBadgeNumber} onChange={setNewBadgeNumber} autoFocus={true} />
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedAttendee: state.attendees.selectedAttendee,
  isOpen: state.attendees.badgeReplacementDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  processReplacement: (oldBadgeNum, newBadgeNum) => dispatch(createReplacementBadgeAction(oldBadgeNum, newBadgeNum)),
  toggleDialog: () => dispatch(toggleBadgeReplacementDialog()),
});

export default connect(
  mapState,
  mapDispatch
)(ReplacementBadgeDialog);
