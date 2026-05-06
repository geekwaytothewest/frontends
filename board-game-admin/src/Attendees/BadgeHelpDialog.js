import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';
import { toggleBadgeHelpDialog } from './attendeesActions';

const BadgeHelpDialog = ({ saving, isOpen, toggleDialog, selectedAttendee }) => {
  return (
    <SaveDialog
      headerText='Unable to find an attendee badge?'
      buttonText="OK"
      saving={saving}
      disabled={saving}
      save={() => {}}
      isOpen={isOpen}
      onOpening={() => {}}
      close={toggleDialog}
      onClosed={() => {}}
    >
    Step 1: Ask to see the attendee's Tabletop.Events receipt.<br/><br/>
    Step 2: Validate the receipt and reference the badge number listed.<br/>
    - The badge number on the receipt translates to the last four digits of the Geekway Badge number.<br/>
    - For example: badge number 123 on the receipt would be 2610123 in the Geekway system.<br/><br/>
    Step 3: If the badge is under a different name than on the receipt, it has already been transferred with their approval.<br/><br/>
    Step 4: If the badge is not found, we have no record of their purchase.<br/><br/>
    Step 5: Speak with staff to address the issue.
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedAttendee: state.attendees.selectedAttendee,
  isOpen: state.attendees.badgeHelpDialogOpen,
  saving: state.attendees.savingAttendee
});
const mapDispatch = dispatch => ({
  toggleDialog: () => dispatch(toggleBadgeHelpDialog()),
});

export default connect(
  mapState,
  mapDispatch
)(BadgeHelpDialog);
