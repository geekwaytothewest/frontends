import React from 'react';
import { connect } from 'react-redux';
import { Card, Spinner, Icon, Tooltip, Position } from '@blueprintjs/core';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { collectionListStyles, listItemStyles, selectedListItemStyles } from './CollectionsStyles';
import { NonIdealState } from '@blueprintjs/core';
import { setSelectedCollectionAction } from './collectionsActions';
import { IconNames } from '@blueprintjs/icons';
import styled from '@emotion/styled';
import { PageHeaderTitle, PageHeader } from '../layoutComponents';

const CollectionCard = styled(Card)`
  display: flex;
  justify-content: space-between;
`;

const getMainContent = (collections, loading, selectedCollection, selectCollection) => {
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
    const { collections, loading, selectedCollection, selectCollection } = this.props;

    return (
      <div css={collectionListStyles}>
        <PageHeader>
          <PageHeaderTitle>Collections</PageHeaderTitle>
        </PageHeader>
        {getMainContent(collections, loading, selectedCollection, selectCollection)}
      </div>
    );
  }
}

const mapState = state => ({ selectedCollection: state.collections.selectedCollection });
const mapDispatch = dispatch => ({ selectCollection: collection => dispatch(setSelectedCollectionAction(collection)) });

export default connect(
  mapState,
  mapDispatch
)(CollectionsList);
