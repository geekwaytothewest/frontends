import React from 'react';
import { Card } from '@blueprintjs/core';
import { gameTileStyles, GameTileHeader, EditGameButton } from '../GamesListStyles';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { IconNames } from '@blueprintjs/icons';
import { Intent } from '@blueprintjs/core';

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
    const { title, openUpdateGameDialog } = this.props;

    return (
      <Card css={gameTileStyles}>
        <GameTileHeader>
          <h3>{title.name}</h3>
        </GameTileHeader>
        <EditGameButton
          icon={IconNames.EDIT}
          onClick={() => openUpdateGameDialog(title)}
          minimal={true}
          intent={Intent.PRIMARY}
        />
      </Card>
    );
  }
}

export default GameTile;
