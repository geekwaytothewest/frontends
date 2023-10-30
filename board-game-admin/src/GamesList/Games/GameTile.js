import React from 'react';
import { Card } from '@blueprintjs/core';
import { gameTileStyles, GameTileHeader } from '../GamesListStyles';
/** @jsx jsx */
import { jsx } from '@emotion/core';

class GameTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { title, openAddGameDialog } = this.props;

    return (
      <Card css={gameTileStyles}>
        <GameTileHeader>
          <h3>{title}</h3>
        </GameTileHeader>
      </Card>
    );
  }
}

export default GameTile;
