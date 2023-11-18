import { RSAA } from 'redux-api-middleware';
import types from './actionTypes';

export const getRecentCheckouts = () => ({
  [RSAA]: {
    endpoint: () => `${API_URL.trim()}/checkouts/recentCheckouts?numberOfResults=5`,
    method: 'GET',
    types: [
      types.recentCheckouts.getRecentCheckoutsRequest,
      types.recentCheckouts.getRecentCheckoutsReceive,
      types.recentCheckouts.getRecentCheckoutsFailure
    ]
  }
});
