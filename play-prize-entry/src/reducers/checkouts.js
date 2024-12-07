import * as types from '../actions/actionTypes';

const checkouts = (state = { checkouts: [], error: null, loading: false }, action) => {
  let error = null;
  switch (action.type) {
  case types.GetCheckoutsRequest:
    return { ...state, checkouts: [], error: null, loading: true };
  case types.GetCheckoutsReceive: {
    const checkouts = mapPayloadToCheckouts(action.payload);
    error =
        !checkouts || !checkouts.length
          ? { title: 'No Eligible Checkouts Found', message: 'Ensure that you entered the correct badge number.' }
          : null;

    return { ...state, checkouts, error, loading: false };
  }
  case types.GetCheckoutsFailure:
    return {
      ...state,
      error: {
        title: 'Error occurred',
        message:
            'An error occurred while trying to fetch the checkouts. Try again. If this problem persists, let someone know.'
      },
      loading: false
    };
  case types.EnterAnotherPlay:
    return { ...state, checkouts: [], loading: true };
  default:
    return state;
  }
};

const mapPayloadToCheckouts = payload => {
  if (!payload.Result) {
    return [];
  }

  return payload.Result.filter(checkout => checkout.Copy.Collection.AllowWinning).map(checkout => ({
    id: checkout.ID,
    game: checkout.Copy.Game.Name,
    maxPlayers: checkout.Copy.Game.MaxPlayers
  }));
};

export default checkouts;
