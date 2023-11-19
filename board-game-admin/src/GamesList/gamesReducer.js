import initialState from '../Redux/initialState';
import { actionTypes } from './gamesActions';

const reducer = (state = initialState.games, action) => {
  const payload = action.payload;

  switch (action.type) {
    case actionTypes.getGamesSuccess:
      return {
        ...state,
        loading: false,
        items: payload,
      };
    case actionTypes.toggleUpdateGameDialog:
      return { ...state, updateGameDialogOpen: !state.updateGameDialogOpen, selectedGame: action.game };
    default:
      return state;
  }
};

export default reducer;
