import { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { GameSection } from '../CollectionsStyles';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import AddCopyDialog from './AddCopyDialog';
import { Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { toggleAddCopyDialog, toggleUploadCopiesDialog } from '../collectionsActions';
import GamesList from './GamesList';
import GamesNonIdeal from './GamesNonIdeal';
import {
  PageHeader,
  PageHeaderText,
  PageHeaderTitle,
  PageHeaderSearch,
  PageHeaderSection,
  PageHeaderButtonSection,
  PageHeaderButton
} from '../../layoutComponents';
import CopiesUploadDialog from './CopiesUploadDialog';

const Games = ({ games, collectionsLoading, toggleAddCopyDialog, toggleUploadCopiesDialog, selectedCollection }) => {
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogCopyId, setDialogCopyId] = useState('');
  const [filterText, setFilterText] = useState('');
  useLayoutEffect(() => {
    const gameSearch = document.getElementById('game-search');
    if (gameSearch) gameSearch.focus();
  }, [selectedCollection]);

  const onFilterTextChange = event => {
    if (event.target.value != filterText) {
      setFilterText(event.target.value);
    }
  };

  const gameListOpenCopyDialog = (title, copyId) => {
    setDialogTitle(title);
    setDialogCopyId(copyId);
    toggleAddCopyDialog();
  };

  const copyDialogClosing = () => {
    setDialogTitle('');
    setDialogCopyId('');
  };

  let pageBody;

  if (!selectedCollection || !games || !Object.keys(games).length) {
    pageBody = <GamesNonIdeal selectedCollection={selectedCollection} />;
  } else {
    pageBody = (
      <GamesList
        collectionsLoading={collectionsLoading}
        games={games}
        openCopyDialog={gameListOpenCopyDialog}
        filterText={filterText}
      />
    );
  }

  return (
    <GameSection>
      <AddCopyDialog
        close={toggleAddCopyDialog}
        onClosed={copyDialogClosing}
        title={dialogTitle}
        copyId={dialogCopyId}
      />
      <CopiesUploadDialog />
      {selectedCollection && (
        <PageHeader>
          <PageHeaderSection>
            <PageHeaderText>Search:</PageHeaderText>
            <PageHeaderSearch
              id='game-search'
              className='bp5-dark'
              placeholder='Game Title'
              autoFocus={true}
              onChange={event => onFilterTextChange(event)}
              type='search'
            />
          </PageHeaderSection>
          <PageHeaderTitle>Games</PageHeaderTitle>
          <PageHeaderButtonSection>
            <PageHeaderButton
              text='Add Game'
              rightIcon={IconNames.ADD}
              intent={Intent.PRIMARY}
              onClick={toggleAddCopyDialog}
            />
            <PageHeaderButton text='Upload' intent={Intent.PRIMARY} onClick={toggleUploadCopiesDialog} />
          </PageHeaderButtonSection>
        </PageHeader>
      )}
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
