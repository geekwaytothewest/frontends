import React from 'react';
import { connect } from 'react-redux';
import { Card, Spinner, Icon, Tooltip, Position } from '@blueprintjs/core';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { collectionListStyles, listItemStyles, selectedListItemStyles } from './CollectionsStyles';
import { NonIdealState } from '@blueprintjs/core';
import { setSelectedCollectionAction, toggleAddCollectionDialog, toggleImportCollectionDialog } from './collectionsActions';
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

const CollectionCard = styled(Card)`
  display: flex;
  justify-content: space-between;
`;

const getMainContent = (collections, loading, selectedCollection, selectCollection,) => {
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
    const { collections, loading, selectedCollection, selectCollection, toggleImportCollectionDialog, toggleAddCollectionDialog } = this.props;

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
        {getMainContent(collections, loading, selectedCollection, selectCollection)}
      </div>
    );
  }
}

const mapState = state => ({ selectedCollection: state.collections.selectedCollection });
const mapDispatch = dispatch => ({
  selectCollection: collection => dispatch(setSelectedCollectionAction(collection)),
  toggleAddCollectionDialog: () => dispatch(toggleAddCollectionDialog()),
  toggleImportCollectionDialog: () => dispatch(toggleImportCollectionDialog())
});

export default connect(
  mapState,
  mapDispatch
)(CollectionsList);
