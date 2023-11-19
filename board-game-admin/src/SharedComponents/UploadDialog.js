import React, { useState } from 'react';
import SaveDialog from './SaveDialog';
import { FileInput, FormGroup, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import LabeledInput from './LabeledInput';
import { Checkbox, Label } from '@blueprintjs/core';

const UploadDialog = ({
  uploadInputLabelText = 'Upload: ',
  upload,
  headerText = '',
  helperText = 'Warning: This operation can take a long time when you are uploading a large number of rows. Please be patient.',
  uploading = false,
  isOpen = false,
  close,
  showCollectionDetails = false,
}) => {
  const [files, setFiles] = useState(null);
  const [localCollectionName, setCollectionName] = useState('');
  const [localAllowWinning, setAllowWinning] = useState('');
  const setFields = (upCollectionName, upAllowWinning) => {
    setCollectionName(upCollectionName);
    setAllowWinning(upAllowWinning);
  };
  const fileChosen = !!files && !!files[0];
  const fileInputText = fileChosen ? files[0].name : 'Choose file...';

  return (
    <SaveDialog
      save={() => upload(files, localCollectionName, localAllowWinning)}
      saving={uploading}
      onClosed={() => setFiles('')}
      isOpen={isOpen}
      close={close}
      helperText={helperText}
      headerText={headerText}
      onOpening={() => setFields('', false)}
    >
      {showCollectionDetails && (
        <>
          <LabeledInput label='Collection Name' placeholder='ABC123' large={true} value={localCollectionName} onChange={setCollectionName} />
          <Label>Allow Winning</Label>
          <Checkbox checked={localAllowWinning} onChange={() => setAllowWinning(!localAllowWinning)} />
        </>)}
      <FormGroup label={uploadInputLabelText}>
        <FileInput onInputChange={event => setFiles(event.target.files)} text={fileInputText} />
      </FormGroup>
      {fileChosen && (
        <>
          <span>Ready to upload</span>
          <Icon icon={IconNames.TICK} intent={Intent.SUCCESS} />
        </>
      )}
    </SaveDialog>
  );
};

export default UploadDialog;
