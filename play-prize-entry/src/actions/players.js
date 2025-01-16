import { RSAA } from 'redux-api-middleware';
import * as types from '../actions/actionTypes';

export const updatePlayerSearchQuery = query => ({
  type: types.UpdatePlayerSearchQuery,
  query
});

export const removePlayer = id => ({
  type: types.RemovePlayer,
  id
});

export const addPlayer = (player, currentPlayers, maxPlayers) => {
  if (currentPlayers => maxPlayers + 1) {
    alert(`Cannot add more than ${maxPlayers} players.`);
    return {};
  }

  return {
    type: types.AddPlayer,
    player: { ...player, wantsToWin: true }
  }
};

export const selectRating = (playerId, rating) => ({
  type: types.SelectRating,
  id: playerId,
  rating
});

export const toggleWantsToWin = playerId => ({
  type: types.ToggleWantsToWin,
  id: playerId
});

export function fetchPlayers() {
  return {
    [RSAA]: {
      endpoint: state => `${API_URL}/attendees?search=${state.playerSearch.query}`,
      method: 'GET',
      types: [types.GetPlayersRequest, types.GetPlayersReceive, types.GetPlayersFailure]
    }
  };
}
