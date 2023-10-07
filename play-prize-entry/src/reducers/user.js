import * as types from '../actions/actionTypes';

const user = (state = { badgeId: '', name: '' }, action) => {
  switch (action.type) {
  case types.UpdateBadgeId:
    return { ...state, badgeId: action.badgeId };
  case types.GetCheckoutsReceive: {
    const payload = action.payload.Result;
    const checkoutAttendee = payload && payload.length ? payload[0].Attendee : null;
    if (!checkoutAttendee) {
      return state;
    }

    return { ...state, name: checkoutAttendee.Name, badgeId: checkoutAttendee.BadgeNumber };
  }
  default:
    return state;
  }
};

export default user;