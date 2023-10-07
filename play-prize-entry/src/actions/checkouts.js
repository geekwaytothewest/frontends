import { RSAA } from 'redux-api-middleware';
import * as types from '../actions/actionTypes';

export function fetchCheckouts() {
  return {
    [RSAA]: {
      endpoint: ({ user }) => `${API_URL}/checkouts?badgeId=${user.badgeId}`,
      method: 'GET',
      types: [types.GetCheckoutsRequest, types.GetCheckoutsReceive, types.GetCheckoutsFailure]
    }
  };
}

export const selectCheckout = checkout => ({
  type: types.CheckoutSelected,
  checkout
});
