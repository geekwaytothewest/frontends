import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CollectionsList from './CollectionsList';
import { createGetCollectionsAction } from './collectionsActions';
import Games from './Games/Games';
import { RowPage } from '../layoutComponents';
import _ from 'lodash';

const Collections = ({ collections, loading, games, requestCollections }) => {
  useEffect(() => {
    requestCollections();
  }, []);

  return (
    <RowPage>
      <CollectionsList collections={collections} loading={loading} />
      <Games games={games} />
    </RowPage>
  );
};

const mapState = state => {
  const selectedCollectionCopies = state.collections.selectedCollection
    ? state.collections.selectedCollection.Copies
    : [];
  const orderedSelectedCollectionCopies = _.orderBy(selectedCollectionCopies, 'Title');
  return {
    collections: state.collections.items,
    loading: state.collections.loading,
    games: _.groupBy(orderedSelectedCollectionCopies, 'Title')
  };
};

const mapDispatch = dispatch => ({
  requestCollections: () => {
    const action = createGetCollectionsAction();
    dispatch(action);
  }
});

export default connect(
  mapState,
  mapDispatch
)(Collections);
