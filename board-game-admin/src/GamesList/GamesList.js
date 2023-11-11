import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ColumnPage, PageHeader, PageSubheader, PageHeaderSection, PageHeaderText, PageHeaderSearch, PageHeaderTitle, PageHeaderButtonSection, PageHeaderButton } from '../layoutComponents';
import _ from 'lodash';
import Games from './Games/Games';
import { createGetGamesAction, toggleAddGameDialog, toggleUpdateGameDialog } from './gamesActions';
import { IconNames } from '@blueprintjs/icons';
import { Intent } from '@blueprintjs/core';
import { ListContainer, LoadMoreButton } from './GamesListStyles';
import filterListItems from '../Utilities/filterListItems';
import UpdateGameDialog from './UpdateGameDialog';

const GamesList = ({ loading, games, requestGames, gamesLoading, toggleUpdateGameDialog }) => {
  const [filterText, setFilterText] = useState('');
  const [displayCap, setDisplayCap] = useState(50);
  const filteredTitles = filterListItems(games, filterText, ['name']).slice(0, displayCap);
  const incrementDisplayCap = () => setDisplayCap(displayCap + 25);

  useEffect(() => {
    requestGames();
  }, []);

  const onFilterTextChange = event => {
    if (event != filterText) {
      setFilterText(event);
    }
  };

  return (
    <ColumnPage>
      <PageHeader>
        <PageHeaderSection>
          <PageHeaderText>Search:</PageHeaderText>
          <PageHeaderSearch
            className='bp5-dark'
            placeholder='Game'
            autoFocus={true}
            onChange={event => onFilterTextChange(event.target.value)}
            type='search'
          />
        </PageHeaderSection>
        <PageHeaderTitle>Games</PageHeaderTitle>
        <PageHeaderButtonSection>
          <PageHeaderButton
            text='Add Game'
            rightIcon={IconNames.ADD}
            intent={Intent.PRIMARY}
            onClick={toggleAddGameDialog}
          />
        </PageHeaderButtonSection>
      </PageHeader>
      <PageSubheader>
        <PageHeaderText>{`Displaying ${filteredTitles.length} of ${games.length} games`}</PageHeaderText>
        <PageHeaderText>{gamesLoading ? 'Refreshing...' : ''}</PageHeaderText>
      </PageSubheader>
      <ListContainer>
        <UpdateGameDialog description='Update the chosen game' />
        <Games games={filteredTitles} filterText={filterText} toggleUpdateGameDialog={toggleUpdateGameDialog} />
      </ListContainer>
      <LoadMoreButton
        text='Load More'
        intent={Intent.PRIMARY}
        onClick={incrementDisplayCap}
        disabled={displayCap >= games.length}
      />
    </ColumnPage>
  );
};

const mapState = state => {
  return {
    loading: state.collections.loading,
    games: _.orderBy(state.games.items, 'name'),
  };
};

const mapDispatch = dispatch => ({
  requestGames: () => {
    const action = createGetGamesAction();
    dispatch(action);
  },
  toggleUpdateGameDialog: (selectedGame) => dispatch(toggleUpdateGameDialog(selectedGame)),
});

export default connect(
  mapState,
  mapDispatch
)(GamesList);
