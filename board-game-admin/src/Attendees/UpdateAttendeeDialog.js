import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUpdateAttendeeAction, toggleUpdateAttendeeDialog } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const UpdateAttendeeDialog = ({ saving, saveAttendee, isOpen, toggleDialog, selectedAttendee }) => {
  const [name, setName] = useState('');
  const [oldBadgeNumber, setOldBadgeNumber] = useState('');
  const [newBadgeNumber, setNewBadgeNumber] = useState('');
  const setFields = (name = '', oldBadgeNum = '', newBadgeNum = '') => {
    setName(name);
    setOldBadgeNumber(oldBadgeNum);
    setNewBadgeNumber(newBadgeNum);
  };

  return (
    <SaveDialog
      helperText='Update an attendee'
      headerText='Update Attendee'
      saving={saving}
      disabled={saving}
      save={() => saveAttendee(name, oldBadgeNumber, newBadgeNumber)}
      isOpen={isOpen}
      onOpening={() => setFields(selectedAttendee.Name, selectedAttendee.BadgeNumber, selectedAttendee.BadgeNumber)}
      close={toggleDialog}
      onClosed={setFields}
    >
      <LabeledInput label='Name' value={name} onChange={setName} />
      <LabeledInput label='Badge #' value={newBadgeNumber} onChange={setNewBadgeNumber} autoFocus={true} />
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedAttendee: state.attendees.selectedAttendee,
  isOpen: state.attendees.updateAttendeeDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  saveAttendee: (name, oldBadgeNum, badgeNum) => dispatch(createUpdateAttendeeAction(name, oldBadgeNum, badgeNum)),
  toggleDialog: () => dispatch(toggleUpdateAttendeeDialog())
});

export default connect(
  mapState,
  mapDispatch
)(UpdateAttendeeDialog);
