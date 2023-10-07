import React from 'react';
import { connect } from 'react-redux';
import { checkoutGameStyles } from './copyEntry.styles';
import { updateCopyId, reset } from '../../actions/checkInOutActions';
import { Button, Intent, H5 } from '@blueprintjs/core';
import LabeledInput from '../shared/LabeledInput';
import { IconNames } from '@blueprintjs/icons';

const copyIdInputId = 'copy-id';

const CopyEntry = ({ copyId, checkingIn, gameTitle, updateCopyId, reset, refocusCopyId }) => {
  setTimeout(() => {
    const input = document.getElementById(copyIdInputId);
    if (refocusCopyId && input) {
      input.focus();
    }
  }, 50);
  return (
    <React.Fragment>
      {(!gameTitle || checkingIn) && (
        <LabeledInput
          label='Copy ID'
          allowWhitespace={false}
          inputId={copyIdInputId}
          autoFocus={true}
          value={copyId}
          onChange={newText => updateCopyId(newText)}
          placeholder='Scan Game Copy'
        />
      )}
      {gameTitle && !checkingIn && (
        <div className={checkoutGameStyles}>
          <H5>
            Game: <em>{gameTitle}</em>
          </H5>
          <Button minimal={true} icon={IconNames.UNDO} intent={Intent.DANGER} onClick={reset} />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  copyId: state.checkInOut.copyId,
  gameTitle: state.checkInOut.gameTitle,
  checkingIn: state.checkInOut.checkingIn,
  refocusCopyId: !state.copySearch.searchText && state.copySearch.searchCompleted
});
const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(reset()),
  updateCopyId: copyId => {
    dispatch(updateCopyId(copyId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyEntry);
