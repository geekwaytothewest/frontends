import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../../SharedComponents/LabeledInput';
import SaveDialog from '../../SharedComponents/SaveDialog';
import { createUpdateCopyAction } from '../collectionsActions';
import { Select, Option } from '../../SharedComponents/Select';
import { Checkbox, Label } from '@blueprintjs/core';

const noop = () => {};

const UpdateCopyDialog = ({
  close,
  saveCopy,
  savingCopy,
  isOpen,
  collections,
  copy,
  originalId,
  selectedCollection,
  onClosed = noop
}) => {
  const [localTitle, setTitle] = useState('');
  const [localCopyId, setCopyId] = useState('');
  const [localCollectionId, setCollectionId] = useState('');
  const [localWinnable, setWinnable] = useState(false);
  const [localCopyComments, setComments] = useState('');
  const setFields = (upTitle, upCopyId, upCollId, winnable, comments) => {
    setTitle(upTitle);
    setCopyId(upCopyId);
    setCollectionId(upCollId);
    setWinnable(winnable);
    setComments(comments);
  };

  return (
    <SaveDialog
      helperText='Update a copy of a game'
      close={close}
      headerText='Update Copy'
      saving={savingCopy}
      disabled={savingCopy}
      save={() => saveCopy(originalId, localCopyId, localCollectionId, localWinnable, localCopyComments)}
      isOpen={isOpen}
      onOpening={() => setFields(copy.Title, copy.ID, selectedCollection.ID, copy.Winnable, copy.Comments ?? '')}
      onClosed={() => {
        setFields('', '', '', false, '' );
        onClosed();
      }}
    >
      <LabeledInput label='Copy ID' placeholder='ABC123' large={true} value={localCopyId} onChange={setCopyId} />
      <Select
        large={true}
        labelText={'Collection'}
        defaultValue={selectedCollection.ID}
        onChange={event => setCollectionId(event.target.selectedOptions[0].value)}
      >
        {collections.map(collection => (
          <Option key={collection.ID} value={collection.ID}>
            {collection.Name}
          </Option>
        ))}
      </Select>
      <LabeledInput label='Comments' placeholder='ABC123' large={true} value={localCopyComments} onChange={setComments} />
      <Label>Winnable</Label>
      <Checkbox checked={localWinnable} onChange={() => setWinnable(!localWinnable)} />
    </SaveDialog>
  );
};
const mapState = state => ({
  selectedCollection: state.collections.selectedCollection,
  originalId: state.collections.selectedCopy && state.collections.selectedCopy.ID,
  copy: state.collections.selectedCopy,
  isOpen: state.collections.updateCopyDialogOpen,
  collections: state.collections.items,
  savingCopy: state.collections.savingCopy,
  errors: state.collections.errorMessages
});
const mapDispatch = dispatch => ({
  saveCopy: (oldBarcodeLabel, newBarcodeLabel, newCollectionId, winnable, comments) =>
    dispatch(createUpdateCopyAction(oldBarcodeLabel, newBarcodeLabel, newCollectionId, winnable, comments))
});

export default connect(
  mapState,
  mapDispatch
)(UpdateCopyDialog);
