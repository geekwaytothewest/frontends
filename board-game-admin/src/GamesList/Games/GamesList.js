import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import GameTile from './GameTile';
import { gameListStyles } from '../GamesListStyles';

const GamesList = ({ games }) => {
  return (
    <>
      <div css={gameListStyles}>
        {games.map(title => (
          <GameTile key={title.id} title={title.name} />
        ))}
      </div>
    </>
  );
};

export default GamesList;
