import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSyncTabletopEventsAction, createUpdateAttendeeAction, toggleSyncTabletopEventsDialog, toggleUpdateAttendeeDialog } from './attendeesActions';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';

const ReplacementBadgeDialog = ({ saving, processTransfer, isOpen, toggleDialog, selectedAttendee }) => {
  const [oldBadgeNumber, setOldBadgeNumber] = useState('');
  const [newBadgeNumber, setNewBadgeNumber] = useState('');

  const setFields = (oldBadgeNum = '', newBadgeNum = '') => {
    setOldBadgeNumber(oldBadgeNum);
    setNewBadgeNumber(newBadgeNum);
  };

  return (
    <SaveDialog
      helperText='Create a replacement badge for an attendee. This will invalidate the old badge number and update a blank badge with the same name and pronouns.'
      headerText='Replace Badge'
      saving={saving}
      disabled={saving}
      save={() => replaceBadge(oldBadgeNumber, newBadgeNumber)}
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
  isOpen: state.attendees.updateAttendeeDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  processTransfer: (oldBadgeNum, newBadgeNum) => dispatch(createTransferBadgeAction(oldBadgeNum, newBadgeNum)),
  toggleDialog: () => dispatch(toggleTransferBadgeDialog()),
});

export default connect(
  mapState,
  mapDispatch
)(TransferBadgeDialog);
