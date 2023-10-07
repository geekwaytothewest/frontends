import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../../SharedComponents/LabeledInput';
import SaveDialog from '../../SharedComponents/SaveDialog';
import { createAddCopyAction } from '../collectionsActions';

const AddCopyDialog = ({ collection, isOpen, close, saveCopy, savingCopy, onClosed, title = '', copyId = '' }) => {
  const [localTitle, setTitle] = useState('');
  const [localCopyId, setCopyId] = useState('');
  const setFields = (upTitle, upCopyId) => {
    setTitle(upTitle);
    setCopyId(upCopyId);
  };

  return (
    <SaveDialog
      helperText={`Add a copy of a game to the ${collection ? `${collection.Name}` : 'chosen'} collection`}
      close={close}
      headerText='Add Game'
      saving={savingCopy}
      disabled={savingCopy}
      save={() => saveCopy(collection, localTitle, localCopyId)}
      isOpen={isOpen}
      onOpening={() => setFields(title, copyId)}
      onClosed={() => {
        setFields('', '');
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
  saveCopy: (coll, title, copyId) => dispatch(createAddCopyAction(coll, title, copyId))
});

export default connect(
  mapState,
  mapDispatch
)(AddCopyDialog);
