import React from 'react';
import { connect } from 'react-redux';
import UploadDialog from '../SharedComponents/UploadDialog';
import { toggleImportCollectionDialog, importCollectionAction, createGetCollectionsAction } from './collectionsActions';

const ImportCollectionDialog = ({ toggle, uploadFiles, isOpen, saving, requestCollections }) => (
  <UploadDialog
    headerText='Import Collection'
    upload={async (files, collectionName, allowWinning) => {
      await uploadFiles(collectionName, allowWinning, files);
      await requestCollections();
    }}
    close={toggle}
    isOpen={isOpen}
    uploading={saving}
    showCollectionDetails={true}
  />
);

const mapState = state => ({
  collection: state.collections.selectedCollection,
  saving: state.collections.savingCollection,
  isOpen: state.collections.importCollectionDialogOpen
});

const mapDispatch = dispatch => ({
  toggle: () => dispatch(toggleImportCollectionDialog()),
  uploadFiles: (collectionName, allowWinning, files) => dispatch(importCollectionAction(collectionName, allowWinning, files)),
  requestCollections: () => dispatch(createGetCollectionsAction())
});

export default connect(
  mapState,
  mapDispatch
)(ImportCollectionDialog);
