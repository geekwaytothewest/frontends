import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Label } from '@blueprintjs/core';
import PageBlock from '../pageBlock';
import { toggleOverrideLimit } from '../../actions/checkInOutActions';

const OverrideLimit = ({ checkingIn, gameTitle, alwaysOverrideLimit, overrideLimit, toggleOverrideLimit }) => {
  if (!gameTitle || checkingIn) {
    return '';
  }
  console.log(`always: ${alwaysOverrideLimit}`);

  return (
    <div className='bp3-input-group'>
      {!alwaysOverrideLimit && (
        <Checkbox checked={overrideLimit} onChange={event => toggleOverrideLimit()} label='Override Limit' />
      )}
      {alwaysOverrideLimit && <input type='hidden' value='true' />}
    </div>
  );
};

const mapStateToProps = state => ({
  checkingIn: state.checkInOut.checkingIn,
  gameTitle: state.checkInOut.gameTitle,
  overrideLimit: state.checkInOut.overrideLimit,
  alwaysOverrideLimit: state.checkInOut.alwaysOverrideLimit
});
const mapDispatchToProps = dispatch => ({
  toggleOverrideLimit: () => dispatch(toggleOverrideLimit())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverrideLimit);
