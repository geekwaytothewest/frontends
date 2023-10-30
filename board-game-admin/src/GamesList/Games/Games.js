import { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { GameSection } from '../GamesListStyles';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import GamesList from './GamesList';
import GamesNonIdeal from './GamesNonIdeal';


const Games = ({ games, gamesLoading, toggleUpdateGameDialog, selectedCollection, filterText }) => {
  const [dialogTitle, setDialogTitle] = useState('');

  useLayoutEffect(() => {
    const gameSearch = document.getElementById('game-search');
    if (gameSearch) gameSearch.focus();
  }, [selectedCollection]);

  let pageBody;

  if (!games || !Object.keys(games).length) {
    pageBody = <GamesNonIdeal />;
  } else {
    pageBody = (
      <GamesList
        gamesLoading={gamesLoading}
        games={games}
        openGameDialog={toggleUpdateGameDialog}
        filterText={filterText}
      />
    );
  }

  return (
    <GameSection>
      {pageBody}
    </GameSection>
  );
};
const mapState = state => ({
  collectionsLoading: state.collections.loading,
  selectedCollection: state.collections.selectedCollection
});
const mapDispatch = dispatch => ({
  toggleAddCopyDialog: () => dispatch(toggleAddCopyDialog()),
  toggleUploadCopiesDialog: () => dispatch(toggleUploadCopiesDialog())
});

export default connect(
  mapState,
  mapDispatch
)(Games);
