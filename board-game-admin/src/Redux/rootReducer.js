import { combineReducers } from 'redux';
import collections from '../Collections/collectionsReducer';
import attendees from '../Attendees/attendeesReducer';
import games from '../GamesList/gamesReducer';

export default combineReducers({
  attendees,
  collections,
  games,
});