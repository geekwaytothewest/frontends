import React from 'react';
import { connect } from 'react-redux';
import { Button, Callout, Intent } from '@blueprintjs/core';
import { restart } from '../actions/actions';

const WrongUserWarning = ({ name, badgeId, restart }) => (
  <Callout intent={Intent.WARNING} icon={null} className='wrong-user-warning' title={`Hello, ${name} (${badgeId})`}>
    <div className='callout-block-inline'>
      Not you? &nbsp;
      <Button text='Enter your badge # again' intent={Intent.PRIMARY} minimal={true} onClick={restart} />
    </div>
  </Callout>
);

const mapStateToProps = state => ({
  name: state.user.name,
  badgeId: state.user.badgeId
});
const mapDispatchToProps = dispatch => ({ restart: () => dispatch(restart()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrongUserWarning);
