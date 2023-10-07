import React, { useState } from 'react';
import SaveDialog from './SaveDialog';
import { FileInput, FormGroup, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const UploadDialog = ({
  uploadInputLabelText = 'Upload: ',
  upload,
  headerText = '',
  helperText = 'Warning: This operation can take a long time when you are uploading a large number of rows. Please be patient.',
  uploading = false,
  isOpen = false,
  close
}) => {
  const [files, setFiles] = useState(null);
  const fileChosen = !!files && !!files[0];
  const fileInputText = fileChosen ? files[0].name : 'Choose file...';

  return (
    <SaveDialog
      save={() => upload(files)}
      saving={uploading}
      onClosed={() => setFiles('')}
      isOpen={isOpen}
      close={close}
      helperText={helperText}
      headerText={headerText}
    >
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
