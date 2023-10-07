import { Button, ButtonGroup, H2, Intent } from '@blueprintjs/core';
import React from 'react';
import { connect } from 'react-redux';
import { enterAnotherPlay, restart } from '../actions/actions';
import { fetchCheckouts } from '../actions/checkouts';

const FinalStep = ({ game, restart, enterAnotherPlay }) => (
  <div className='form-section submit-success'>
    <H2>Congratulations!</H2>
    <H2>
      The play for <em>{game}</em> was entered successfully.
    </H2>
    <p>
      Please ask a Geek Guide to scan your game&apos;s barcode before you return it to the Play &amp; Win shelf.
    </p>
    <p>Get out there, play games, and have fun!</p>
    <ButtonGroup fill={true}>
      <Button intent={Intent.SUCCESS} large={true} text="I'm done!" onClick={restart} />
      <Button large={true} text='Enter Another' onClick={enterAnotherPlay} />
    </ButtonGroup>
  </div>
);

const mapStateToProps = state => ({ game: state.play.game });
const mapDispatchToProps = dispatch => ({
  restart: () => dispatch(restart()),
  enterAnotherPlay: () => {
    dispatch(enterAnotherPlay());
    dispatch(fetchCheckouts());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalStep);
