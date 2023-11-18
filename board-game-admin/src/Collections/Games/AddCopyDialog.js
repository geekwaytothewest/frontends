import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../../SharedComponents/LabeledInput';
import SaveDialog from '../../SharedComponents/SaveDialog';
import { createAddCopyAction } from '../collectionsActions';
import { Checkbox, Label } from '@blueprintjs/core';

const AddCopyDialog = ({ collection, isOpen, close, saveCopy, savingCopy, onClosed, title = '', copyId = '', winnable = false, comments = '' }) => {
  const [localTitle, setTitle] = useState('');
  const [localCopyId, setCopyId] = useState('');
  const [localWinnable, setWinnable] = useState('');
  const [localCopyComments, setComments] = useState('');
  const setFields = (upTitle, upCopyId, upWinnable, upComments) => {
    setTitle(upTitle);
    setCopyId(upCopyId);
    setWinnable(upWinnable);
    setComments(upComments);
  };

  return (
    <SaveDialog
      helperText={`Add a copy of a game to the ${collection ? `${collection.Name}` : 'chosen'} collection`}
      close={close}
      headerText='Add Game'
      saving={savingCopy}
      disabled={savingCopy}
      save={() => saveCopy(collection, localTitle, localCopyId, localWinnable, localCopyComments)}
      isOpen={isOpen}
      onOpening={() => setFields(title, copyId, winnable, comments)}
      onClosed={() => {
        setFields('', '', false, '');
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
      <LabeledInput label='Comments' placeholder='ABC123' large={true} value={localCopyComments} onChange={setComments} />
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
  saveCopy: (coll, title, copyId, winnable, comments) => dispatch(createAddCopyAction(coll, title, copyId, winnable, comments))
});

export default connect(
  mapState,
  mapDispatch
)(AddCopyDialog);
