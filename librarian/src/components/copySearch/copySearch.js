import React from 'react';
import { connect } from 'react-redux';
import { Spinner, NonIdealState, Button, Intent, InputGroup, H3 } from '@blueprintjs/core';
import CopyList from './copyList';
import PageBlock from '../pageBlock';
import { updateSearchText, searchCopies } from '../../actions/copySearchActions';
import { IconNames } from '@blueprintjs/icons';
import styled from '@emotion/styled';

const PageHeaderText = styled(H3)`
  margin-bottom: 0.25rem;
`;

const copySearch = ({
  searchText,
  searchCompleted,
  loading,
  copies,
  disableSearchButton,
  searchTextUpdate,
  searchCopies
}) => {
  return (
    <PageBlock>
      <PageHeaderText>Search Copies</PageHeaderText>
      <form onSubmit={e => e.preventDefault()}>
        <InputGroup
          leftIcon={IconNames.SEARCH}
          onChange={event => searchTextUpdate(event.target.value)}
          placeholder='Game Copy ID or Title'
          value={searchText}
          rightElement={
            <Button
              type='submit'
              disabled={disableSearchButton}
              loading={loading}
              onClick={searchCopies}
              rightIcon={IconNames.ARROW_RIGHT}
              intent={Intent.PRIMARY}
              minimal={true}
            />
          }
        />
      </form>
      {contentToLoad(loading, copies, searchCompleted)}
    </PageBlock>
  );
};

const contentToLoad = (loading, copies, searchCompleted) => {
  if (loading) {
    return <Spinner />;
  }

  if (!searchCompleted) {
    return null;
  }

  if (!copies.length) {
    const nisTitle = 'No copies found';
    const nisText = "Oh no! I couldn't find any copies with that search. Give it another go!";
    return <NonIdealState title={nisTitle} description={nisText} icon={IconNames.SEARCH} />;
  }

  return <CopyList items={copies} />;
};

const mapStateToProps = state => ({
  searchText: state.copySearch.searchText,
  searchCompleted: state.copySearch.searchCompleted,
  disableSearchButton: !state.copySearch.searchText.length,
  copies: state.copySearch.results,
  loading: state.copySearch.loading
});

const mapDispatchToProps = dispatch => ({
  searchTextUpdate: text => dispatch(updateSearchText(text)),
  searchCopies: () => dispatch(searchCopies())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(copySearch);
