import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBadgeTransferAction, toggleBadgeTransferDialog } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const BadgeTransferDialog = ({ saving, processTransfer, isOpen, toggleDialog, selectedAttendee }) => {
  const [oldBadgeNumber, setOldBadgeNumber] = useState('');
  const [newBadgeFirstName, setNewBadgeFirstName] = useState('');
  const [newBadgeLastName, setNewBadgeLastName] = useState('');
  const [newBadgePronouns, setNewBadgePronouns] = useState('');

  const setFields = (oldBadgeNum = '') => {
    setOldBadgeNumber(oldBadgeNum);
  };

  return (
    <SaveDialog
      helperText='Transfer a badge to a new attendee.'
      headerText='Badge Transfer'
      saving={saving}
      disabled={saving}
      save={() => processTransfer(newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber)}
      isOpen={isOpen}
      onOpening={() => setFields(selectedAttendee.BadgeNumber)}
      close={toggleDialog}
      onClosed={setFields}
    >
      <LabeledInput label='New First Name' value={newBadgeFirstName} onChange={setNewBadgeFirstName} autoFocus={true} />
      <LabeledInput label='New Last Name' value={newBadgeLastName} onChange={setNewBadgeLastName} />
      <LabeledInput label='New Pronouns' value={newBadgePronouns} onChange={setNewBadgePronouns} />
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedAttendee: state.attendees.selectedAttendee,
  isOpen: state.attendees.badgeTransferDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  processTransfer: (newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber) => dispatch(createBadgeTransferAction(newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber)),
  toggleDialog: () => dispatch(toggleBadgeTransferDialog()),
});

export default connect(
  mapState,
  mapDispatch
)(BadgeTransferDialog);
