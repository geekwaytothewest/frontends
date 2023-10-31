import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSyncTabletopEventsAction, createUpdateAttendeeAction, toggleSyncTabletopEventsDialog, toggleUpdateAttendeeDialog } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const UpdateAttendeeDialog = ({ saving, saveAttendee, syncAttendee, toggleSyncTabletopEventsDialog, isOpen, toggleDialog, selectedAttendee }) => {
  const [name, setName] = useState('');
  const [oldBadgeNumber, setOldBadgeNumber] = useState('');
  const [newBadgeNumber, setNewBadgeNumber] = useState('');
  const [newPronouns, setNewPronouns] = useState('');

  const setFields = (name = '', oldBadgeNum = '', newBadgeNum = '', newPronouns = '') => {
    setName(name);
    setOldBadgeNumber(oldBadgeNum);
    setNewBadgeNumber(newBadgeNum);
    setNewPronouns(newPronouns);
  };

  return (
    <SaveDialog
      helperText='Update an attendee'
      headerText='Update Attendee'
      saving={saving}
      disabled={saving}
      save={() => saveAttendee(name, oldBadgeNumber, newBadgeNumber, newPronouns)}
      isOpen={isOpen}
      onOpening={() => setFields(selectedAttendee.Name, selectedAttendee.BadgeNumber, selectedAttendee.BadgeNumber, selectedAttendee.Pronouns)}
      close={toggleDialog}
      onClosed={setFields}
      sync={() => toggleSyncTabletopEventsDialog(selectedAttendee.TTEBadgeNumber, selectedAttendee.TTEBadgeID)}
    >
      <LabeledInput label='Name' value={name} onChange={setName} />
      <LabeledInput label='Pronouns' value={newPronouns} onChange={setNewPronouns} />
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
  saveAttendee: (name, oldBadgeNum, badgeNum, pronouns) => dispatch(createUpdateAttendeeAction(name, oldBadgeNum, badgeNum, pronouns)),
  syncAttendee: (userName, password, apiKey) => dispatch(createSyncTabletopEventsAction(userName, password, apiKey)),
  toggleDialog: () => dispatch(toggleUpdateAttendeeDialog()),
  toggleSyncTabletopEventsDialog: (tteBadgeNumber, tteBadgeId) => dispatch(toggleSyncTabletopEventsDialog(tteBadgeNumber, tteBadgeId))
});

export default connect(
  mapState,
  mapDispatch
)(UpdateAttendeeDialog);
