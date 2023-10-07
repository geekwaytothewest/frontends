import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import GameTile from './GameTile';
import filterListItems from '../../Utilities/filterListItems';
import { gameListStyles, LoadMoreButton } from '../CollectionsStyles';
import { Intent } from '@blueprintjs/core';
import { PageHeaderText, PageSubheader } from '../../layoutComponents';

const GamesList = ({ games, collectionsLoading, filterText, openCopyDialog }) => {
  const [displayCap, setDisplayCap] = useState(50);
  const titles = Object.keys(games);
  const filteredTitles = filterListItems(titles, filterText).slice(0, displayCap);
  const incrementDisplayCap = () => setDisplayCap(displayCap + 25);

  return (
    <>
      <PageSubheader>
        <PageHeaderText>{`Displaying ${filteredTitles.length} of ${titles.length} games`}</PageHeaderText>
        <PageHeaderText>{collectionsLoading ? 'Refreshing...' : ''}</PageHeaderText>
      </PageSubheader>
      <div css={gameListStyles}>
        {filteredTitles.map(title => (
          <GameTile key={title} title={title} copies={games[title]} openAddCopyDialog={openCopyDialog} />
        ))}
      </div>
      <LoadMoreButton
        text='Load More'
        intent={Intent.PRIMARY}
        onClick={incrementDisplayCap}
        disabled={displayCap >= titles.length}
      />
    </>
  );
};

export default GamesList;
