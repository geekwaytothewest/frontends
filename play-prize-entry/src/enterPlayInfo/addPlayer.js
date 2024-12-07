import { Button, Intent, Position, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Popover2 } from '@blueprintjs/popover2';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPlayer, updatePlayerSearchQuery } from '../actions/players';
import PlayerSearchInput from './playerSearchInput';

const focusPlayerSearchInput = () => {
  document.getElementById('player-search').focus();
};

const AddPlayer = ({ query, loading, foundAttendees, addPlayer, updateQuery }) => {
  return (
    <div>
      <Popover2
        minimal
        usePortal={false}
        inline={true}
        className='player-search-popover'
        autoFocus={false}
        position={Position.LEFT_BOTTOM}
        popoverDidOpen={focusPlayerSearchInput}
        onClose={() => updateQuery('')}
        renderTarget={({ isOpen, ref, ...targetProps }) => (
          <Button
            {...targetProps}
            elementRef={ref}
            text='Add'
            intent={Intent.PRIMARY}
            rightIcon={IconNames.ADD}
            large={true}
            className='add-player-button'
          />

        )}
        content={
          <div className='player-search-popover-content'>
            <PlayerSearchInput />
            {!foundAttendees.length && query && !loading ? <b>No people found. Search by name or badge number.</b> : ''}
            <div className='player-search-results'>
              <div className='player-search-results-rows'>
                {foundAttendees.map(attendee => (
                  <Button
                    key={attendee.id}
                    rightIcon={IconNames.PLUS}
                    intent={Intent.SUCCESS}
                    className='player-search-results-row player-search-results-add'
                    onClick={() => {
                      addPlayer(attendee, state.play.players, state.play.maxPlayers);
                      document.getElementById('player-search').focus();
                    }}
                    text={`${attendee.name} (${attendee.badgeNumber})`}
                  />
                ))}
              </div>
              {loading ? <Spinner /> : ''}
            </div>
          </div>
        }
      />
    </div>
  );
};

const mapStateToProps = state => {
  const currentPlayers = state.play.players;
  const searchResults = state.playerSearch.results;
  const filteredAttendees = _.differenceBy(searchResults, currentPlayers, a => a.id);
  return {
    query: state.playerSearch.query,
    loading: state.playerSearch.loading,
    foundAttendees: filteredAttendees
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateQuery: updatePlayerSearchQuery,
    addPlayer,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
