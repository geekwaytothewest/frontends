import React from 'react';
import { Button, Intent, Dialog, H4, FormGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import {
  DIALOG_HEADER,
  DIALOG_CLOSE_BUTTON,
  DIALOG_BODY,
  DIALOG_FOOTER,
  DIALOG_FOOTER_ACTIONS
} from '@blueprintjs/core/lib/esm/common/classes';

const noop = () => ({});
const SaveDialog = ({
  isOpen,
  close,
  save,
  saving,
  children,
  helperText = '',
  headerText = '',
  onClosed = noop,
  onOpening = noop,
  lazy = true
}) => {
  const onSave = event => {
    event.preventDefault();
    save();
  };

  return (
    <Dialog className='bp3-dark' isOpen={isOpen} onClosed={onClosed} onOpening={onOpening} lazy={lazy} usePortal={lazy}>
      <form>
        <div className={DIALOG_HEADER}>
          <H4>{headerText}</H4>
          <Button className={`${DIALOG_CLOSE_BUTTON} bp3-minimal`} icon={IconNames.CROSS} onClick={close} />
        </div>
        <div className={DIALOG_BODY}>
          <FormGroup helperText={helperText}>{children}</FormGroup>
        </div>
        <div className={DIALOG_FOOTER}>
          <div className={DIALOG_FOOTER_ACTIONS}>
            <Button
              text={saving ? 'Saving...' : 'Save'}
              type='submit'
              disabled={saving}
              rightIcon={IconNames.SAVED}
              intent={Intent.SUCCESS}
              onClick={onSave}
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default SaveDialog;
