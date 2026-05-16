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
      headerText='Badge Transfer'
      saving={saving}
      disabled={saving}
      save={() => processTransfer(newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber)}
      isOpen={isOpen}
      onOpening={() => setFields(selectedAttendee.BadgeNumber)}
      close={toggleDialog}
      onClosed={setFields}
    >
      Step 1: Charge the attendee in the Square payment device for a transfered badge.<br/>
      Step 2: Get the original attendee's badge from the badge station.<br/>
      Step 3: Enter the new attendee's name and pronouns in the boxes below.<br/><br/>
      <LabeledInput label='New First Name' value={newBadgeFirstName} onChange={setNewBadgeFirstName} autoFocus={true} />
      <LabeledInput label='New Last Name' value={newBadgeLastName} onChange={setNewBadgeLastName} />
      <LabeledInput label='New Pronouns (optional)' value={newBadgePronouns} onChange={setNewBadgePronouns} />
      Step 4: Use the label printing software to print three stickers with the new attendee's name.<br/>
      Step 5: Put one sticker on each side of the badge, and the third on the badge's geeklet.
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedAttendee: state.attendees.selectedAttendee,
  isOpen: state.attendees.badgeTransferDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  processTransfer: (newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber) => dispatch(createBadgeTransferAction(newBadgeFirstName, newBadgeLastName, newBadgePronouns, oldBadgeNumber)).then(() => dispatch(createGetAttendeesAction())),
  toggleDialog: () => dispatch(toggleBadgeTransferDialog()),
});

export default connect(
  mapState,
  mapDispatch
)(BadgeTransferDialog);
