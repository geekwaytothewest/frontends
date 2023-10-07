const actionTypes = {
  initialize: 'initialize',
  makeToast: 'makeToast',
  checkInOut: {
    updateCopyId: 'checkInOut/updateCopyId',
    updateAttendeeId: 'checkInOut/updateAttendeeId',
    toggleOverrideLimit: 'checkInOut/toggleOverrideLimit',
    reset: 'checkInOut/reset',

    getCopyStatusRequest: 'checkInOut/copyStatus/REQUEST',
    getCopyStatusReceive: 'checkInOut/copyStatus/RECEIVE',
    getCopyStatusFailure: 'checkInOut/copyStatus/FAILURE',
        
    checkOutRequest: 'checkInOut/checkOut/REQUEST',
    checkOutReceive: 'checkInOut/checkOut/RECEIVE',
    checkOutFailure: 'checkInOut/checkOut/FAILURE',
        
    checkInRequest: 'checkInOut/checkIn/REQUEST',
    checkInReceive: 'checkInOut/checkIn/RECEIVE',
    checkInFailure: 'checkInOut/checkIn/FAILURE',
  },
  longestCheckouts: {
    getLongestCheckoutsRequest: 'longestCheckouts/REQUEST',
    getLongestCheckoutsReceive: 'longestCheckouts/RECEIVE',
    getLongestCheckoutsFailure: 'longestCheckouts/FAILURE',
  },
  recentCheckouts: {
    getRecentCheckoutsRequest: 'recentCheckouts/REQUEST',
    getRecentCheckoutsReceive: 'recentCheckouts/RECEIVE',
    getRecentCheckoutsFailure: 'recentCheckouts/FAILURE',
  },
  copySearch: {
    updateCopySearchText: 'updateCopySearchText',
    searchRequest: 'copySearch/REQUEST',
    searchReceive: 'copySearch/RECEIVE',
    searchFailure: 'copySearch/FAILURE',
  }
};

export default actionTypes;