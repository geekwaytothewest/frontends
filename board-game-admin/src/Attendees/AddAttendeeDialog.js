import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createAddAttendeeAction, toggleAddAttendeeDialog } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const AddAttendeeDialog = ({ saving, saveAttendee, isOpen, toggleDialog }) => {
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [pronouns, setPronouns] = useState('');
  const clearFields = () => {
    setName('');
    setBadgeNumber('');
    setPronouns('');
  };

  return (
    <SaveDialog
      helperText='Add a new attendee'
      headerText='Add Attendee'
      saving={saving}
      disabled={saving}
      save={() => saveAttendee(name, badgeNumber, pronouns)}
      isOpen={isOpen}
      close={toggleDialog}
      onClosed={clearFields}
    >
      <LabeledInput label='Name' value={name} onChange={setName} autoFocus={true} />
      <LabeledInput label='Pronouns' value={pronouns} onChange={setPronouns} />
      <LabeledInput label='Badge #' value={badgeNumber} onChange={setBadgeNumber} />
    </SaveDialog>
  );
};

const mapState = state => ({
  isOpen: state.attendees.addAttendeeDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  saveAttendee: (name, badgeNumber, pronouns) => dispatch(createAddAttendeeAction(name, badgeNumber, pronouns)),
  toggleDialog: () => dispatch(toggleAddAttendeeDialog())
});

export default connect(
  mapState,
  mapDispatch
)(AddAttendeeDialog);
