import initialState from '../Redux/initialState';
import { actionTypes } from './collectionsActions';

const reducer = (state = initialState.collections, action) => {
  const payload = action.payload;
  const selectedID = state.selectedCollection ? state.selectedCollection.ID : null;

  switch (action.type) {
    case actionTypes.getCollectionsRequest:
      return { ...state, loading: true };
    case actionTypes.getCollectionsSuccess:
      return {
        ...state,
        loading: false,
        items: payload.Result,
        selectedCollection: payload.Result.find(c => c.ID === selectedID)
      };
    case actionTypes.getCollectionsFailure:
      return { ...state, loading: false, errors: payload.Errors };
    case actionTypes.setSelectedCollection:
      return { ...state, selectedCollection: action.collection };
    case actionTypes.toggleAddCopyDialog:
      return { ...state, addCopyDialogOpen: !state.addCopyDialogOpen };
    case actionTypes.addCopyRequest:
      return { ...state, savingCopy: true };
    case actionTypes.addCopySuccess:
      return { ...state, savingCopy: false, addCopyDialogOpen: false };
    case actionTypes.addCopyFailure:
      return { ...state, savingCopy: false, errors: payload.response.Errors };
    case actionTypes.toggleUploadCopiesDialog:
      return { ...state, uploadCopiesDialogOpen: !state.uploadCopiesDialogOpen };
    case actionTypes.uploadCopiesRequest:
      return { ...state, savingCopy: true };
    case actionTypes.uploadCopiesSuccess:
      return { ...state, savingCopy: false, uploadCopiesDialogOpen: false };
    case actionTypes.uploadCopiesFailure:
      return { ...state, savingCopy: false, errors: payload.response.Errors };
    case actionTypes.toggleUpdateCopyDialog:
      return { ...state, updateCopyDialogOpen: !state.updateCopyDialogOpen, selectedCopy: action.copy };
    case actionTypes.updateCopyRequest:
      return { ...state, savingCopy: true };
    case actionTypes.updateCopySuccess:
      return { ...state, savingCopy: false, updateCopyDialogOpen: false };
    case actionTypes.updateCopyFailure:
      return { ...state, savingCopy: false, errors: payload.response.Errors };
    case actionTypes.toggleImportCollectionDialog:
      return { ...state, importCollectionDialogOpen: !state.importCollectionDialogOpen };
    case actionTypes.importCollectionRequest:
      return { ...state, savingCollection: true };
    case actionTypes.importCollectionSuccess:
      return { ...state, savingCollection: false, importCollectionDialogOpen: false };
    case actionTypes.importCollectionFailure:
      return { ...state, savingCollection: false, errors: payload.response.Errors };
    case actionTypes.toggleAddCollectionDialog:
      return { ...state, addCollectionDialogOpen: !state.addCollectionDialogOpen };
    case actionTypes.addCollectionRequest:
      return { ...state, savingCollection: true };
    case actionTypes.addCollectionSuccess:
      return { ...state, savingCollection: false, addCollectionDialogOpen: false };
    case actionTypes.addCollectionFailure:
      return { ...state, savingCollection: false, errors: payload.response.Errors };
    case actionTypes.toggleUpdateCollectionDialog:
      return { ...state, updateCollectionDialogOpen: !state.updateCollectionDialogOpen, selectedCollection: action.collection };
    case actionTypes.updateCollectionRequest:
      return { ...state, savingCollection: true };
    case actionTypes.updateCollectionSuccess:
      return { ...state, savingCollection: false, updateCollectionDialogOpen: false };
    case actionTypes.updateCollectionFailure:
      return { ...state, savingCollection: false, errors: payload.response.Errors };
    default:
      return state;
  }
};

export default reducer;
