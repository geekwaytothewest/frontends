import React from 'react';
import { connect } from 'react-redux';
import UploadDialog from '../SharedComponents/UploadDialog';
import { toggleUploadAttendeesDialog, createUploadAttendeesAction } from './attendeesActions';

const AttendeesUploadDialog = ({ toggle, uploadFiles, uploading, isOpen }) => (
  <UploadDialog
    headerText='Attendees Upload'
    upload={files => uploadFiles(files)}
    close={toggle}
    isOpen={isOpen}
    uploading={uploading}
  />
);

const mapState = state => ({
  uploading: state.attendees.savingAttendee,
  isOpen: state.attendees.uploadAttendeesDialogOpen
});

const mapDispatch = dispatch => ({
  toggle: () => dispatch(toggleUploadAttendeesDialog()),
  uploadFiles: files => dispatch(createUploadAttendeesAction(files))
});

export default connect(
  mapState,
  mapDispatch
)(AttendeesUploadDialog);
