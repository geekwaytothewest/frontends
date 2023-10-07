import * as types from '../actions/actionTypes';

const players = (state = { query: '', loading: true, results: [], error: '' }, action) => {
  switch (action.type) {
  case types.UpdatePlayerSearchQuery:
    return { ...state, query: action.query, loading: false, results: [], error: '' };
  case types.GetPlayersRequest:
    return { ...state, query: action.query, loading: true, results: [], error: '' };
  case types.GetPlayersReceive:
    return { ...state, loading: false, results: mapPayloadToPlayers(action.payload), error: '' };
  case types.GetPlayersFailure: {
    const error = action.payload.data || { message: action.payload.Result.message };
    return { ...state, loading: false, results: [], error };
  }
  case types.AddPlayer:
    return { ...state, query: '' };
  default:
    return state;
  }
};

const mapPayloadToPlayers = payload => {
  return payload.Result.Attendees.map(player => ({
    id: player.ID,
    name: player.Name,
    badgeNumber: player.BadgeNumber,
    rating: null
  }));
};

export default players;