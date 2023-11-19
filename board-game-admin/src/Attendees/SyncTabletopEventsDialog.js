import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleSyncTabletopEventsDialog, createSyncTabletopEventsAction, createGetAttendeesAction } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const SyncTabletopEventsDialog = ({ saving, isOpen, tteBadgeNumber, tteBadgeId, toggleDialog, syncTabletopEvents, createGetAttendeesAction }) => {
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
      headerText='Sync With Tabletop.Events'
      saving={saving}
      disabled={saving}
      save={async () => {
        await syncTabletopEvents(userName, password, apiKey, tteBadgeNumber, tteBadgeId);
        await createGetAttendeesAction();
      }}
      isOpen={isOpen}
      close={toggleDialog}
      onClosed={setFields}
      onOpening={() => setFields('', '', '')}
    >
      <LabeledInput label='User Name' value={userName} onChange={setUserName} autoFocus={true} />
      <LabeledInput label='Password' value={password} onChange={setPassword} password={true} />
      <LabeledInput label='Api Key' value={apiKey} onChange={setApiKey} />
    </SaveDialog>
  );
};

const mapState = state => ({
  tteBadgeNumber: state.attendees.tteBadgeNumber,
  tteBadgeId: state.attendees.tteBadgeId,
  isOpen: state.attendees.updateSyncTabletopEventsDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  syncTabletopEvents: (userName, password, apiKey, tteBadgeNumber, tteBadgeId) => dispatch(createSyncTabletopEventsAction(userName, password, apiKey, tteBadgeNumber, tteBadgeId)),
  toggleDialog: () => dispatch(toggleSyncTabletopEventsDialog()),
  createGetAttendeesAction: () => dispatch(createGetAttendeesAction())
});

export default connect(
  mapState,
  mapDispatch
)(SyncTabletopEventsDialog);
