import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';
import { addCollectionAction } from './collectionsActions';
import { Checkbox, Label } from '@blueprintjs/core';
import { toggleAddCollectionDialog, createGetCollectionsAction } from './collectionsActions';

const AddCollectionDialog = ({ isOpen, toggle, saveCollection, savingCollection, requestCollections }) => {
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
      headerText='Create Collection'
      saving={savingCollection}
      disabled={savingCollection}
      save={async () => {
        await saveCollection(localCollectionName, localAllowWinning);
        await requestCollections();
        toggle();
      }}
      isOpen={isOpen}
      onOpening={() => {
        setFields('', false);
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
  savingCollection: state.collections.savingCollection,
  errors: state.collections.errorMessages,
  isOpen: state.collections.addCollectionDialogOpen
});
const mapDispatch = dispatch => ({
  toggle: () => dispatch(toggleAddCollectionDialog()),
  saveCollection: (collectionName, allowWinning) => dispatch(addCollectionAction(collectionName, allowWinning)),
  requestCollections: () => dispatch(createGetCollectionsAction()),
});

export default connect(
  mapState,
  mapDispatch
)(AddCollectionDialog);
