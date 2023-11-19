import React from 'react';
import { NonIdealState } from '@blueprintjs/core';

const GamesNonIdeal = () => {
  const message = 'No games found';

  return (
    <NonIdealState>
      <h3>{message}</h3>
    </NonIdealState>
  );
};

export default GamesNonIdeal;
