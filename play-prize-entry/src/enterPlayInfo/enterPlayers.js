import { Divider, H3 } from '@blueprintjs/core';
import React from 'react';
import { connect } from 'react-redux';
import AddPlayer from './addPlayer';
import AddedPlayersList from './addedPlayersList';

const EnterPlayers = ({ game }) => {
  return (
    <div className='enter-players'>
      <div className='form-section'>
        <div className='header-group'>
          <H3>
            <em>{game}</em> players
          </H3>
          <AddPlayer />
        </div>
        <Divider />
        <AddedPlayersList />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ game: state.play.game });

export default connect(mapStateToProps)(EnterPlayers);
