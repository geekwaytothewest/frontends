import { InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlayers, updatePlayerSearchQuery } from '../actions/players';

class PlayerSearchInput extends Component {
  constructor({ updateQuery, getPlayers }) {
    super(...arguments);
    this.state = { updateQuery, getPlayers, queryInput: '' };
    this.getCurrentInputValue = this.getCurrentInputValue.bind(this);
    this.setCurrentInputValue = this.setCurrentInputValue.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (Object.keys(nextProps).includes('query') && nextProps.query === '') {
      document.getElementById('player-search').value = '';
    }
  }

  getCurrentInputValue = () => this.state.queryInput;
  setCurrentInputValue = newVal => this.setState({ queryInput: newVal });
  performSearch = _.debounce(() => {
    this.props.updateQuery(this.getCurrentInputValue());
    if (this.getCurrentInputValue()) {
      this.props.getPlayers();
    }
  }, 600);

  render = () => (
    <InputGroup
      id='player-search'
      type='Search'
      placeholder="Enter a person's badge # or name to find them"
      dir='auto'
      autoComplete='off'
      leftIcon={IconNames.SEARCH}
      value={this.state.queryInput}
      autoFocus={true}
      onChange={event => {
        this.setCurrentInputValue(event.target.value);
        this.performSearch();
      }}
    />
  );
}

const mapStateToProps = state => ({ query: state.playerSearch.query });
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateQuery: updatePlayerSearchQuery,
      getPlayers: fetchPlayers
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerSearchInput);
