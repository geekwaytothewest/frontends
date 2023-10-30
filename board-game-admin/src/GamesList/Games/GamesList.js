import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import GameTile from './GameTile';
import { gameListStyles } from '../GamesListStyles';

const GamesList = ({ games, openGameDialog }) => {
  return (
    <>
      <div css={gameListStyles}>
        {games.map(title => (
          <GameTile key={title.id} title={title} openUpdateGameDialog={openGameDialog} />
        ))}
      </div>
    </>
  );
};

export default GamesList;
