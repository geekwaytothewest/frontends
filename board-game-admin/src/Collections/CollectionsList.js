import React from 'react';
import { connect } from 'react-redux';
import { Card, Spinner, Icon, Tooltip, Position } from '@blueprintjs/core';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { collectionListStyles, listItemStyles, selectedListItemStyles, EditCollectionButton } from './CollectionsStyles';
import { NonIdealState } from '@blueprintjs/core';
import { setSelectedCollectionAction, toggleAddCollectionDialog, toggleImportCollectionDialog, toggleUpdateCollectionDialog } from './collectionsActions';
import { IconNames } from '@blueprintjs/icons';
import styled from '@emotion/styled';
import {
  PageHeaderTitle,
  PageHeader,
  PageHeaderButton,
  PageHeaderButtonSection
} from '../layoutComponents';
import { Intent } from '@blueprintjs/core';
import ImportCollectionDialog from './ImportCollectionDialog';
import AddCollectionDialog from './AddCollectionDialog';
import UpdateCollectionDialog from './UpdateCollectionDialog';

const CollectionCard = styled(Card)`
  display: flex;
  justify-content: space-between;
`;

const getMainContent = (collections, loading, selectedCollection, selectCollection, toggleUpdateCollectionDialog) => {
  if (loading || collections.length) {
    return (
      <>
        {collections.map(collection => (
          <CollectionCard
            css={collection === selectedCollection ? selectedListItemStyles : listItemStyles}
            key={collection.ID}
            onClick={() => selectCollection(collection)}
          >
            {collection.Name}
            {collection.AllowWinning && (
              <Tooltip content='Allows Prize Entry' position={Position.TOP_RIGHT}>
                <Icon icon={IconNames.BOX} />
              </Tooltip>
            )}
            <EditCollectionButton
              icon={IconNames.EDIT}
              onClick={() => {toggleUpdateCollectionDialog(collection)}}
              minimal={true}
              intent={Intent.PRIMARY}
            />
          </CollectionCard>
        ))}
        {loading && (
          <NonIdealState>
            <Spinner />
          </NonIdealState>
        )}
      </>
    );
  } else return <NonIdealState title='No Collections Found :(' />;
};

class CollectionsList extends React.Component {
  render() {
    const { collections, loading, selectedCollection, selectCollection, toggleImportCollectionDialog, toggleAddCollectionDialog, toggleUpdateCollectionDialog } = this.props;

    return (
      <div css={collectionListStyles}>
        <PageHeader>
          <PageHeaderTitle>Collections</PageHeaderTitle>
          <PageHeaderButtonSection>
            <PageHeaderButton
              text='Import'
              rightIcon={IconNames.ADD}
              intent={Intent.PRIMARY}
              onClick={toggleImportCollectionDialog}
            />
            <PageHeaderButton
              text='Create'
              rightIcon={IconNames.ADD}
              intent={Intent.PRIMARY}
              onClick={toggleAddCollectionDialog}
            />
          </PageHeaderButtonSection>
        </PageHeader>
        <ImportCollectionDialog />
        <AddCollectionDialog />
        <UpdateCollectionDialog />
        {getMainContent(collections, loading, selectedCollection, selectCollection, toggleUpdateCollectionDialog)}
      </div>
    );
  }
}

const mapState = state => ({ selectedCollection: state.collections.selectedCollection });
const mapDispatch = dispatch => ({
  selectCollection: collection => dispatch(setSelectedCollectionAction(collection)),
  toggleImportCollectionDialog: () => dispatch(toggleImportCollectionDialog()),
  toggleAddCollectionDialog: () => dispatch(toggleAddCollectionDialog()),
  toggleUpdateCollectionDialog: selectedCollection => dispatch(toggleUpdateCollectionDialog(selectedCollection)),
});

export default connect(
  mapState,
  mapDispatch
)(CollectionsList);
