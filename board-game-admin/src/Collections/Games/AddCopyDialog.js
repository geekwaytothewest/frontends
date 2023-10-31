import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../../SharedComponents/LabeledInput';
import SaveDialog from '../../SharedComponents/SaveDialog';
import { createAddCopyAction } from '../collectionsActions';
import { Checkbox, Label } from '@blueprintjs/core';

const AddCopyDialog = ({ collection, isOpen, close, saveCopy, savingCopy, onClosed, title = '', copyId = '', winnable = false }) => {
  const [localTitle, setTitle] = useState('');
  const [localCopyId, setCopyId] = useState('');
  const [localWinnable, setWinnable] = useState('');
  const setFields = (upTitle, upCopyId, upWinnable) => {
    setTitle(upTitle);
    setCopyId(upCopyId);
    setWinnable(upWinnable);
  };

  return (
    <SaveDialog
      helperText={`Add a copy of a game to the ${collection ? `${collection.Name}` : 'chosen'} collection`}
      close={close}
      headerText='Add Game'
      saving={savingCopy}
      disabled={savingCopy}
      save={() => saveCopy(collection, localTitle, localCopyId, localWinnable)}
      isOpen={isOpen}
      onOpening={() => setFields(title, copyId, winnable)}
      onClosed={() => {
        setFields('', '', false);
        onClosed();
      }}
    >
      <LabeledInput
        label='Game Title'
        placeholder='Azul'
        large={true}
        value={localTitle}
        onChange={setTitle}
        autoFocus={true}
      />
      <LabeledInput label='Copy ID' placeholder='ABC123' large={true} value={localCopyId} onChange={setCopyId} />

      <Label>Winnable</Label>
      <Checkbox checked={localWinnable} onChange={() => setWinnable(!localWinnable)} />
    </SaveDialog>
  );
};
const mapState = state => ({
  collection: state.collections.selectedCollection,
  savingCopy: state.collections.savingCopy,
  errors: state.collections.errorMessages,
  isOpen: state.collections.addCopyDialogOpen
});
const mapDispatch = dispatch => ({
  saveCopy: (coll, title, copyId, winnable) => dispatch(createAddCopyAction(coll, title, copyId, winnable))
});

export default connect(
  mapState,
  mapDispatch
)(AddCopyDialog);
