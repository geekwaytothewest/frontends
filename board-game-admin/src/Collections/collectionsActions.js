import { RSAA } from 'redux-api-middleware';
import env from '../App/environmentVariables';

const apiRoot = env.apiUrl;

export const actionTypes = {
  getCollectionsRequest: 'GET_COLLECTIONS_REQUEST',
  getCollectionsSuccess: 'GET_COLLECTIONS_SUCCESS',
  getCollectionsFailure: 'GET_COLLECTIONS_FAILURE',
  toggleAddCopyDialog: 'TOGGLE_ADD_COPY_DIALOG',
  addCopyRequest: 'ADD_COPY_REQUEST',
  addCopySuccess: 'ADD_COPY_SUCCESS',
  addCopyFailure: 'ADD_COPY_FAILURE',
  toggleUploadCopiesDialog: 'TOGGLE_UPLOAD_COPIES_DIALOG',
  uploadCopiesRequest: 'UPLOAD_COPIES_REQUEST',
  uploadCopiesSuccess: 'UPLOAD_COPIES_SUCCESS',
  uploadCopiesFailure: 'UPLOAD_COPIES_FAILURE',
  toggleUpdateCopyDialog: 'TOGGLE_UPDATE_COPY_DIALOG',
  updateCopyRequest: 'UPDATE_COPY_REQUEST',
  updateCopySuccess: 'UPDATE_COPY_SUCCESS',
  updateCopyFailure: 'UPDATE_COPY_FAILURE',
  setSelectedCollection: 'SET_SELECTED_COLLECTION'
};

export const createGetCollectionsAction = () => ({
  [RSAA]: {
    endpoint: () => `${apiRoot}/copycollections`,
    method: 'GET',
    types: [actionTypes.getCollectionsRequest, actionTypes.getCollectionsSuccess, actionTypes.getCollectionsFailure]
  }
});

export const setSelectedCollectionAction = collection => ({
  type: actionTypes.setSelectedCollection,
  collection
});

export const toggleAddCopyDialog = () => ({ type: actionTypes.toggleAddCopyDialog });
export const toggleUpdateCopyDialog = copy => ({ type: actionTypes.toggleUpdateCopyDialog, copy });
export const toggleUploadCopiesDialog = () => ({ type: actionTypes.toggleUploadCopiesDialog });

export const createAddCopyAction = (collection, gameTitle, copyId) => {
  const collId = collection.ID;

  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/copycollections/${collId}/copies`,
      body: JSON.stringify({
        title: gameTitle,
        libraryId: copyId
      }),
      method: 'POST',
      types: [actionTypes.addCopyRequest, actionTypes.addCopySuccess, actionTypes.addCopyFailure]
    }
  };
};

export const createUploadCopiesAction = (collection, files) => {
  const collId = collection.ID;
  const formData = new FormData();
  formData.append('file', files[0], files[0].name);

  return {
    [RSAA]: {
      endpoint: () => `${apiRoot}/copycollections/${collId}/copies/upload`,
      body: formData,
      method: 'POST',
      types: [actionTypes.uploadCopiesRequest, actionTypes.uploadCopiesSuccess, actionTypes.uploadCopiesFailure]
    }
  };
};

export const createUpdateCopyAction = (gameTitle, originalCopyId, newCopyId, newCollectionId, winnable) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/copies/${originalCopyId}`,
      body: JSON.stringify({
        title: gameTitle,
        libraryId: newCopyId,
        collectionId: newCollectionId,
        winnable
      }),
      method: 'PUT',
      types: [actionTypes.updateCopyRequest, actionTypes.updateCopySuccess, actionTypes.updateCopyFailure]
    }
  };
};
