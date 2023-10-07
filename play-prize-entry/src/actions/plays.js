import { RSAA } from 'redux-api-middleware';
import * as types from '../actions/actionTypes';

export function submitPlay(play) {
  return {
    [RSAA]: {
      endpoint: `${API_URL}/plays`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      types: [types.PostPlayRequest, types.PostPlayReceive, types.PostPlayFailure],
      body: JSON.stringify({ checkoutId: play.checkoutId, players: play.players })
    }
  };
}
