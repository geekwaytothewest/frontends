export default {
  collections: {
    loading: false,
    errorMessages: [],
    items: [],
    selectedCollection: undefined,
    addCopyDialogOpen: false,
    updateCopyDialogOpen: false,
    uploadCopiesDialogOpen: false,
    selectedCopy: undefined,
    savingCopy: false
  },
  attendees: {
    loading: false,
    errorMessages: [],
    items: [],
    selectedAttendee: undefined,
    addAttendeeDialogOpen: false,
    uploadAttendeesDialogOpen: false,
    updateAttendeeDialogOpen: false,
    updateSyncTabletopEventsDialogOpen: false,
    savingAttendee: false,
    tteBadgeNumber: undefined,
    tteBadgeId: undefined
  },
  games: {
    loading: false,
    errorMessages: [],
    items: [],
    addGameDialogOpen: false,
    uploadGamesDialogOpen: false,
    updateGameDialogOpen: false,
    savingGame: false
  }
};
