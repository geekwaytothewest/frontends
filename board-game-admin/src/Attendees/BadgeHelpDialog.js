import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';
import { toggleBadgeHelpDialog } from './attendeesActions';

const BadgeHelpDialog = ({ saving, isOpen, toggleDialog, selectedAttendee }) => {
  return (
    <SaveDialog
      headerText='Unable to find an atendee badge?'
      buttonText="OK"
      saving={saving}
      disabled={saving}
      save={() => {}}
      isOpen={isOpen}
      onOpening={() => {}}
      close={toggleDialog}
      onClosed={() => {}}
    >
    - Ask to see the attendee's Tabletop.Events receipt<br/>
    - Reference the badge number on the receipt<br/>
    - The badge number on the receipt translates to the last four digits of the Geekway Badge number.<br/>
    - For example: badge number 123 on the receipt would be 2610123 in the Geekway system.<br/>
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
