import React from 'react';
import { connect } from 'react-redux';
import UploadDialog from '../../SharedComponents/UploadDialog';
import { toggleUploadCopiesDialog, createUploadCopiesAction } from '../collectionsActions';

const CopiesUploadDialog = ({ collection, toggle, uploadFiles, isOpen, saving }) => (
  <UploadDialog
    headerText='Copies Upload'
    upload={files => uploadFiles(collection, files)}
    close={toggle}
    isOpen={isOpen}
    uploading={saving}
  />
);

const mapState = state => ({
  collection: state.collections.selectedCollection,
  saving: state.collections.savingCopy,
  isOpen: state.collections.uploadCopiesDialogOpen
});

const mapDispatch = dispatch => ({
  toggle: () => dispatch(toggleUploadCopiesDialog()),
  uploadFiles: (collection, files) => dispatch(createUploadCopiesAction(collection, files))
});

export default connect(
  mapState,
  mapDispatch
)(CopiesUploadDialog);
