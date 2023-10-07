import { Button, H4, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Tooltip2 } from '@blueprintjs/popover2';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { removePlayer, selectRating, toggleWantsToWin } from '../actions/players';
import Rating from './rating';
import { ThumbsDown } from './thumbsDown';
import { ThumbsUp } from './thumbsUp';

const AddedPlayersList = ({ players, removePlayer, selectRating, toggleWantsToWin }) => {
  if (!players.length) {
    return <H4>I&apos;m sure someone played the game! Press the Add Player button!</H4>;
  }

  return (
    <div className='added-players-list'>
      <div className='added-players-list-header'>
        <span className='added-players-list-header-number'>#</span>
        <span className='added-players-list-header-wants-win'>
          Want?
          <Tooltip2 
            className='ml025' 
            content="Give a &#128077; for players who would like to enter for a chance to win this game."
            placement='top'
          >
            <Icon icon="info-sign" />
          </Tooltip2>
        </span>
        <span className='added-players-list-header-name'>Name</span>
        <span className='added-players-list-header-actions'>
          Rating <em>(optional)</em>
        </span>
      </div>
      <div className='added-players-list-rows'>
        {players.map((player, idx) => (
          <Fragment key={player.id}>
            <div className='added-players-list-row'>
              <span className='added-players-list-row-number'>{idx + 1}</span>
              <div className='added-players-list-row-wants-win-toggle'>
                <Toggle
                  checked={player.wantsToWin}
                  onChange={() => toggleWantsToWin(player.id)}
                  icons={{
                    checked: <ThumbsUp />,
                    unchecked: <ThumbsDown />
                  }}
                />
              </div>
              <span className='added-players-list-row-name'>{player.name}</span>
              <div className='added-players-list-row-actions'>
                <Rating
                  className='added-players-list-row-rating'
                  selectedValue={player.rating}
                  onChange={newRating => selectRating(player.id, newRating)}
                />
                <Button
                  intent={Intent.DANGER}
                  minimal={true}
                  icon={IconNames.TRASH}
                  className='added-players-list-row-button'
                  onClick={() => removePlayer(player.id)}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  players: state.play.players,
  query: state.playerSearch.query,
  loading: state.playerSearch.loading,
  foundAttendees: state.playerSearch.results
});

const mapDispatchToProps = dispatch => ({
  removePlayer: id => dispatch(removePlayer(id)),
  selectRating: (id, rating) => dispatch(selectRating(id, rating)),
  toggleWantsToWin: id => dispatch(toggleWantsToWin(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddedPlayersList);
