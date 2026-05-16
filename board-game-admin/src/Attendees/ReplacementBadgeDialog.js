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
      headerText='Replace Badge'
      saving={saving}
      disabled={saving}
      save={() => processReplacement(oldBadgeNumber, newBadgeNumber)}
      isOpen={isOpen}
      onOpening={() => setFields(selectedAttendee.BadgeNumber)}
      close={toggleDialog}
      onClosed={setFields}
    >
      Step 1: Charge the attendee in the Square payment device for a replacement badge.<br/>
      Step 2: Get a blank badge from the badge station and enter the badge number in the box below.<br/><br/>
      <LabeledInput label='New Badge #' value={newBadgeNumber} onChange={setNewBadgeNumber} autoFocus={true} />
      Step 3: Use the label printing software to print two stickers with the attendee's name.<br/>
      Step 4: Put one sticker on each side of the badge.<br/>
      Step 5: Remove the geeklet and throw it away.<br/>
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedAttendee: state.attendees.selectedAttendee,
  isOpen: state.attendees.badgeReplacementDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  processReplacement: (oldBadgeNum, newBadgeNum) => dispatch(createReplacementBadgeAction(oldBadgeNum, newBadgeNum)).then(() => dispatch(createGetAttendeesAction())),
  toggleDialog: () => dispatch(toggleBadgeReplacementDialog()),
});

export default connect(
  mapState,
  mapDispatch
)(ReplacementBadgeDialog);
