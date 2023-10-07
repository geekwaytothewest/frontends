import { combineReducers } from 'redux';
import collections from '../Collections/collectionsReducer';
import attendees from '../Attendees/attendeesReducer';

export default combineReducers({
  attendees,
  collections
});