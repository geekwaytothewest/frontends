import { RSAA } from 'redux-api-middleware';
import types from './actionTypes';

export const searchCopies = () => ({
  [RSAA]: {
    endpoint: ({ copySearch }) => `${API_URL}/copies?query=${copySearch.searchText}`,
    method: 'GET',
    types: [types.copySearch.searchRequest, types.copySearch.searchReceive, types.copySearch.searchFailure]
  }
});

export const updateSearchText = text => ({ type: types.copySearch.updateCopySearchText, text });
