import { Button, Divider, H2, H3, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { connect } from 'react-redux';
import { decrementStep } from '../actions/actions';
import { submitPlay } from '../actions/plays';

const ReviewPlay = ({ play, submitPlay, goBack }) => {
  const submitButtonText = play.submitting ? 'Submitting...' : 'Submit the play already!';

  return (
    <div className='review-play'>
      <H2>Review Play Information</H2>
      <aside>
        Make a mistake? Press the Fix Something button to change it. If it&apos;s all good to go, hit that submit button!!
      </aside>
      <H3>
        Game: <em>{play.game}</em>
      </H3>
      <div className='review-players'>
        <H3>Players</H3>
        <Divider />
        {play.players.map((player, i) => (
          <div key={i} className='review-player'>
            <span className='player-name'>{player.name}</span>
            <div className='badges'>
              <span className='wants-win badge'>Wants to Keep: {player.wantsToWin ? 'Yes' : 'No'}</span>
              <span className='badge'>Rating: {player.rating ? `${player.rating}\u2605` : 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='button-group'>
        <Button
          intent={Intent.DANGER}
          className='back-button'
          text='Fix Something'
          icon={IconNames.ARROW_LEFT}
          onClick={goBack}
        />
        <Button
          className='enter-play-submit'
          intent={Intent.SUCCESS}
          text={submitButtonText}
          rightIcon={IconNames.CONFIRM}
          onClick={() => submitPlay(play)}
          disabled={play.submitting || !play.players.length}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ play: state.play });
const mapDispatchToProps = dispatch => ({
  submitPlay: play => dispatch(submitPlay(play)),
  goBack: () => dispatch(decrementStep())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPlay);
