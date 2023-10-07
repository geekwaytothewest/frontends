import React from 'react';
import { Card, Collapse, Button, Intent, Divider } from '@blueprintjs/core';
import { gameTileStyles, GameTileHeader, GameTileHeaderAddBtn } from '../CollectionsStyles';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { IconNames } from '@blueprintjs/icons';
import CopyList from './CopyList';

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
    const { title, copies, openAddCopyDialog } = this.props;

    return (
      <Card css={gameTileStyles}>
        <GameTileHeader>
          <h3>{title}</h3>
          <GameTileHeaderAddBtn
            onClick={() => openAddCopyDialog(title)}
            intent={Intent.PRIMARY}
            minimal={true}
            icon={IconNames.ADD}
          />
        </GameTileHeader>
        <div>
          <Button
            text={this.state.open ? 'Hide Copies' : 'Show Copies'}
            intent={Intent.PRIMARY}
            onClick={this.toggle}
            style={{ width: '100%' }}
          />
          <Collapse isOpen={this.state.open}>
            <Divider style={{ marginTop: '2em' }} />
            <CopyList copies={copies} />
          </Collapse>
        </div>
      </Card>
    );
  }
}

export default GameTile;
