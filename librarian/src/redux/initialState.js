export default {
  checkInOut: {
    copyId: '',
    attendeeId: '',
    overrideLimit: ALWAYS_OVERRIDE_LIMIT ? true : false,
    alwaysOverrideLimit: ALWAYS_OVERRIDE_LIMIT ? true : false,
    gameTitle: '',
    isCheckedOut: false,
    checkingStatus: false,
    checkingIn: false,
    checkingOut: false,
    errors: []
  },
  copySearch: {
    searchText: '',
    searchCompleted: false,
    results: [],
    loading: false,
    errors: []
  },
  longestCheckouts: {
    results: [],
    fetchingInitialResults: true,
    errors: []
  },
  recentCheckouts: {
    results: [],
    fetchingInitialResults: true,
    errors: []
  }
};
