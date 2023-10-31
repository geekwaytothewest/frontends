import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleSyncTabletopEventsDialog, createSyncTabletopEventsAction } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const SyncTabletopEventsDialog = ({ saving, isOpen, toggleDialog }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');

  const setFields = (userName = '', password = '', apiKey = '') => {
    setUserName(userName);
    setPassword(password);
    setApiKey(apiKey);
  };

  return (
    <SaveDialog
      helperText='Warning: This operation can take a long time when you are uploading a large number of rows. Please be patient.'
      headerText='Reset from Tabletop.Events'
      saving={saving}
      disabled={saving}
      save={() => createSyncTabletopEventsAction()}
      isOpen={isOpen}
      close={toggleDialog}
      onClosed={setFields}
    >
      <LabeledInput label='User Name' value={userName} onChange={setUserName} autoFocus={true} />
      <LabeledInput label='Password' value={password} onChange={setPassword} password={true} />
      <LabeledInput label='Api Key' value={apiKey} onChange={setApiKey} />
    </SaveDialog>
  );
};

const mapState = state => ({
  isOpen: state.attendees.addAttendeeDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  createSyncTabletopEventsAction: () => dispatch(createSyncTabletopEventsAction()),
  toggleDialog: () => dispatch(toggleResetTabletopEventsDialog())
});

export default connect(
  mapState,
  mapDispatch
)(SyncTabletopEventsDialog);
