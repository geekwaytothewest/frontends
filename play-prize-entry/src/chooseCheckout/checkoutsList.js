import { Card, H6 } from '@blueprintjs/core';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { incrementStep } from '../actions/actions';
import { selectCheckout } from '../actions/checkouts';

const CheckoutsList = ({ checkouts, onCheckoutSelection }) => (
  <div className='checkouts-list form-section'>
    <div className='checkouts-list-cards'>
      {checkouts.map(checkout => (
        <Card key={checkout.id} className='game-card' interactive={true} elevation={1} onClick={() => onCheckoutSelection(checkout)}>
          <H6>{checkout.game}</H6>
        </Card>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  loading: state.checkoutsList.loading,
  checkouts: _.sortBy(state.checkoutsList.checkouts, ['game'])
});

const mapDispatchToProps = dispatch => ({
  onCheckoutSelection: checkout => {
    dispatch(selectCheckout(checkout));
    dispatch(incrementStep());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutsList);
