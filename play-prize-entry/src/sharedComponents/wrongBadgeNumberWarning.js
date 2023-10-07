import React from 'react';
import { connect } from 'react-redux';
import { Callout, Intent } from '@blueprintjs/core';
import { restart } from '../actions/actions';

const mapStateToProps = state => ({
  name: state.user.name,
  badgeId: state.user.badgeId,
  error: state.checkoutsList.error
});

const mapDispatchToProps = dispatch => ({
  restart: () => dispatch(restart())
});

const WrongBadgeNumberWarning = ({ error }) => {
  return (
    <Callout intent={Intent.WARNING} className='callout' title={error.title}>
      <div className='callout-block'>
        <p>{error.message}</p>
      </div>
    </Callout>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrongBadgeNumberWarning);
