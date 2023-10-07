import * as types from '../actions/actionTypes';

const play = (state = { checkoutId: null, players: [], submitting: false }, action) => {
  switch (action.type) {
  case types.GetCheckoutsReceive: {
    const payload = action.payload && action.payload.Result;
    const checkoutAttendee = payload && payload.length ? payload[0].Attendee : null;
    if (!checkoutAttendee) {
      return state;
    }

    return { ...state, players: [{ id: checkoutAttendee.ID, name: checkoutAttendee.Name, rating: null, wantsToWin: true }] };
  }
  case types.CheckoutSelected:
    return { ...state, game: action.checkout.game, checkoutId: action.checkout.id };
  case types.AddPlayer: {
    const playersWithAdded = state.players.slice();
    playersWithAdded.push(action.player);

    return { ...state, players: playersWithAdded };
  }
  case types.RemovePlayer: {
    const playersWithoutRemoved = state.players.slice().filter(p => p.id !== action.id);

    return { ...state, players: playersWithoutRemoved };
  }
  case types.SelectRating:
    return {
      ...state,
      players: state.players.map(
        player => player.id === action.id
          ? { ...player, rating: action.rating }
          : player
      )
    };
  case types.ToggleWantsToWin:
    return {
      ...state,
      players: state.players.map(
        player => player.id === action.id
          ? { ...player, wantsToWin: !player.wantsToWin }
          : player
      )
    };
  case types.PostPlayRequest:
    return { ...state, submitting: true };
  case types.PostPlayReceive:
  case types.PostPlayFailure:
    return { ...state, submitting: false };
  case types.EnterAnotherPlay:
    return { ...state, checkoutId: null, players: [] };
  default:
    return state;
  }
};

export default play;