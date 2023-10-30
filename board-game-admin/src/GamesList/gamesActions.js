import { RSAA } from 'redux-api-middleware';
import env from '../App/environmentVariables';

const apiRoot = env.apiUrl;

export const actionTypes = {
  getGamesRequest: 'GET_GAMES_REQUEST',
  getGamesSuccess: 'GET_GAMES_SUCCESS',
  getGamesFailure: 'GET_GAMES_FAILURE',
  toggleAddGameDialog: 'TOGGLE_ADD_GAME_DIALOG',
  addGameRequest: 'ADD_GAME_REQUEST',
  addGameSuccess: 'ADD_GAME_SUCCESS',
  addGameFailure: 'ADD_GAME_FAILURE',
};

export const toggleAddGameDialog = () => ({ type: actionTypes.toggleAddGameDialog });

export const createGetGamesAction = () => ({
  [RSAA]: {
    endpoint: () => `${apiRoot}/games`,
    method: 'GET',
    types: [actionTypes.getGamesRequest, actionTypes.getGamesSuccess, actionTypes.getGamesFailure]
  }
});