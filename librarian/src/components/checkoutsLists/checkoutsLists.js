import React from 'react';
import { connect } from 'react-redux';
import { Spinner, NonIdealState, H3 } from '@blueprintjs/core';
import CheckoutsList from './checkoutsList';
import Legend from './legend';
import { listBlockStyles, headerStyles, listBlockContentStyles } from './checkoutsLists.styles';
import PageBlock from '../pageBlock';
import { IconNames } from '@blueprintjs/icons';

const checkoutsLists = ({ loadingLongest, longestCheckouts, loadingRecent, recentCheckouts }) => {
  return (
    <PageBlock>
      <Legend />
      <div className={`${listBlockStyles}`}>
        <H3 className={headerStyles}>Recent Checkouts</H3>
        <div className={listBlockContentStyles}>{contentToLoad(loadingRecent, recentCheckouts)}</div>
      </div>
      <div className={`${listBlockStyles}`}>
        <H3 className={headerStyles}>Longest Checkouts</H3>
        <div className={listBlockContentStyles}>{contentToLoad(loadingLongest, longestCheckouts)}</div>
      </div>
    </PageBlock>
  );
};

const contentToLoad = (loading, results) => {
  if (loading) {
    return <Spinner />;
  }

  if (!results || !results.length) {
    const nisTitle = 'No checkouts found';
    const nisText = 'Nothing to show';
    return <NonIdealState title={nisTitle} description={nisText} icon={IconNames.CONFIRM} />;
  }

  return <CheckoutsList items={results} />;
};

const mapStateToProps = state => ({
  longestCheckouts: state.longestCheckouts.results,
  loadingLongest: state.longestCheckouts.fetchingInitialResults,
  recentCheckouts: state.recentCheckouts.results,
  loadingRecent: state.recentCheckouts.fetchingInitialResults
});

export default connect(mapStateToProps)(checkoutsLists);
