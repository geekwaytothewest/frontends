import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';
import { updateCollectionAction } from './collectionsActions';
import { Checkbox, Label } from '@blueprintjs/core';
import { toggleUpdateCollectionDialog, createGetCollectionsAction } from './collectionsActions';

const UpdateCollectionDialog = ({ isOpen, toggle, saveCollection, savingCollection, requestCollections, collection }) => {
  const [localCollectionName, setCollectionName] = useState('');
  const [localAllowWinning, setAllowWinning] = useState('');
  const setFields = (upCollectionName, upAllowWinning) => {
    setCollectionName(upCollectionName);
    setAllowWinning(upAllowWinning);
  };

  return (
    <SaveDialog
      helperText={''}
      close={toggle}
      headerText='Update Collection'
      saving={savingCollection}
      disabled={savingCollection}
      save={async () => {
        await saveCollection(collection, localCollectionName, localAllowWinning);
        await requestCollections();
      }}
      isOpen={isOpen}
      onOpening={() => {
        setFields(collection.Name, collection.AllowWinning);
      }}
      onClosed={() => {
        setFields('', false);
      }}
    >
      <LabeledInput
        label='Collection Name'
        placeholder='ABC123'
        large={true}
        value={localCollectionName}
        onChange={setCollectionName}
        autoFocus={true}
      />
      <Label>Allow Winning</Label>
      <Checkbox checked={localAllowWinning} onChange={() => setAllowWinning(!localAllowWinning)} />
    </SaveDialog>
  );
};
const mapState = state => ({
  collection: state.collections.selectedCollection,
  savingCollection: state.collections.savingCollection,
  errors: state.collections.errorMessages,
  isOpen: state.collections.updateCollectionDialogOpen
});
const mapDispatch = dispatch => ({
  toggle: () => dispatch(toggleUpdateCollectionDialog()),
  saveCollection: (collection, collectionName, allowWinning) => dispatch(updateCollectionAction(collection, collectionName, allowWinning)),
  requestCollections: () => dispatch(createGetCollectionsAction()),
});

export default connect(
  mapState,
  mapDispatch
)(UpdateCollectionDialog);
