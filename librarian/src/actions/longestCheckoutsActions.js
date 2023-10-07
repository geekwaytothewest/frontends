import { RSAA } from 'redux-api-middleware';
import types from './actionTypes';

export const getLongestCheckouts = () => ({
  [RSAA]: {
    endpoint: () => `${API_URL.trim()}/checkouts/checkedOutLongest/`,
    method: 'GET',
    types: [
      types.longestCheckouts.getLongestCheckoutsRequest,
      types.longestCheckouts.getLongestCheckoutsReceive,
      types.longestCheckouts.getLongestCheckoutsFailure
    ]
  }
});
