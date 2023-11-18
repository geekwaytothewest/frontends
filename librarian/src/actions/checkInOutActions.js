import { RSAA } from 'redux-api-middleware';
import types from './actionTypes';

export const checkStatus = () => ({
  [RSAA]: {
    endpoint: ({ checkInOut }) => `${API_URL.trim()}/copies/${checkInOut.copyId}`,
    method: 'GET',
    types: [
      types.checkInOut.getCopyStatusRequest,
      types.checkInOut.getCopyStatusReceive,
      types.checkInOut.getCopyStatusFailure
    ]
  }
});

export const checkOut = (copyId, attendeeId, overrideLimit) => ({
  [RSAA]: {
    endpoint: () => `${API_URL.trim()}/checkouts`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    types: [types.checkInOut.checkOutRequest, types.checkInOut.checkOutReceive, types.checkInOut.checkOutFailure],
    body: JSON.stringify({
      libraryId: copyId,
      attendeeBadgeNumber: attendeeId,
      overrideLimit
    })
  }
});

export const checkIn = copyId => ({
  [RSAA]: {
    endpoint: `${API_URL.trim()}/checkouts/checkin/${copyId}`,
    method: 'PUT',
    types: [types.checkInOut.checkInRequest, types.checkInOut.checkInReceive, types.checkInOut.checkInFailure]
  }
});

export const updateCopyId = copyId => ({ type: types.checkInOut.updateCopyId, copyId });
export const updateAttendeeId = attendeeId => ({ type: types.checkInOut.updateAttendeeId, attendeeId });
export const toggleOverrideLimit = () => ({ type: types.checkInOut.toggleOverrideLimit });
export const reset = () => ({ type: types.checkInOut.reset });
