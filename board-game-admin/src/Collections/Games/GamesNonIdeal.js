import React from 'react';
import { NonIdealState } from '@blueprintjs/core';

const GamesNonIdeal = ({ selectedCollection }) => {
  const message = selectedCollection
    ? 'No copies found in the selected collection'
    : 'Select a collection to see the games in it';

  return (
    <NonIdealState>
      <h3>{message}</h3>
    </NonIdealState>
  );
};

export default GamesNonIdeal;
