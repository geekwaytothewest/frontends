import React from 'react';
import { connect } from 'react-redux';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import EnterPlayers from './enterPlayers';
import { decrementStep, incrementStep } from '../actions/actions';

const EnterPlay = ({ players, goBack, goForward }) => {
  return (
    <div className='enter-play'>
      <EnterPlayers />
      <div className='button-group'>
        <Button
          className='back-button'
          intent={Intent.DANGER}
          text='Back'
          icon={IconNames.ARROW_LEFT}
          onClick={goBack}
        />
        <Button
          intent={Intent.PRIMARY}
          text='Review'
          rightIcon={IconNames.ARROW_RIGHT}
          onClick={goForward}
          disabled={!players.length}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ play: state.play, players: state.play.players });
const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(decrementStep()),
  goForward: () => dispatch(incrementStep())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterPlay);
