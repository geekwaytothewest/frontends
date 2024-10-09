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
  setSelectedCollection: 'SET_SELECTED_COLLECTION',
  toggleAddCollectionDialog: 'TOGGLE_ADD_COLLECTION_DIALOG',
  addCollectionRequest: 'ADD_COLLECTION_REQUEST',
  addCollectionSuccess: 'ADD_COLLECTION_SUCCESS',
  addCollectionFailure: 'ADD_COLLECTION_FAILURE',
  toggleImportCollectionDialog: 'TOGGLE_IMPORT_COLLECTION_DIALOG',
  importCollectionRequest: 'IMPORT_COLLECTION_REQUEST',
  importCollectionSuccess: 'IMPORT_COLLECTION_SUCCESS',
  importCollectionFailure: 'IMPORT_COLLECTION_FAILURE',
  toggleUpdateCollectionDialog: 'TOGGLE_UPDATE_COLLECTION_DIALOG',
  updateCollectionRequest: 'UPDATE_COLLECTION_REQUEST',
  updateCollectionSuccess: 'UPDATE_COLLECTION_SUCCESS',
  updateCollectionFailure: 'UPDATE_COLLECTION_FAILURE',
  exportRequest: 'EXPORT_REQUEST',
  exportSuccess: 'EXPORT_SUCCESS',
  exportFailure: 'EXPORT_FAILURE'
};

export const getExportCollection = (collection) => ({
  [RSAA]: {
    endpoint: () => `${apiRoot}/coll/${collection}/exportPlays`,
    method: 'GET',
    types: [actionTypes.exportRequest, actionTypes.exportSuccess, actionTypes.exportFailure]
  }
})

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
export const toggleImportCollectionDialog = () => ({ type: actionTypes.toggleImportCollectionDialog });
export const toggleUpdateCollectionDialog = collection => ({ type: actionTypes.toggleUpdateCollectionDialog, collection });
export const toggleAddCollectionDialog = () => ({ type: actionTypes.toggleAddCollectionDialog });

export const createAddCopyAction = (collection, gameTitle, copyId, winnable, comments) => {
  const collId = collection.ID;

  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/copycollections/${collId}/copies`,
      body: JSON.stringify({
        title: gameTitle,
        libraryId: copyId,
        winnable: winnable,
        comments: comments
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

export const importCollectionAction = (collectionName, allowWinning, files) => {
  const formData = new FormData();
  formData.append('file', files[0], files[0].name);
  formData.append('name', collectionName);
  formData.append('allowWinning', allowWinning);

  return {
    [RSAA]: {
      endpoint: () => `${apiRoot}/importCollection`,
      body: formData,
      method: 'POST',
      types: [actionTypes.importCollectionRequest, actionTypes.importCollectionSuccess, actionTypes.importCollectionFailure]
    }
  };
};

export const addCollectionAction = (collectionName, allowWinning) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/addCollection`,
      body: JSON.stringify({
        name: collectionName,
        allowWinning: allowWinning
      }),
      method: 'POST',
      types: [actionTypes.addCollectionRequest, actionTypes.addCollectionSuccess, actionTypes.addCollectionFailure]
    }
  };
};

export const updateCollectionAction = (collection, collectionName, allowWinning) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/collection/${collection.ID}`,
      body: JSON.stringify({
        name: collectionName,
        allowWinning: allowWinning
      }),
      method: 'POST',
      types: [actionTypes.updateCollectionRequest, actionTypes.updateCollectionSuccess, actionTypes.updateCollectionFailure]
    }
  };
};

export const createUpdateCopyAction = (oldBarcodeLabel, newBarcodeLabel, newCollectionId, winnable, comments) => {
  return {
    [RSAA]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: () => `${apiRoot}/copies/${oldBarcodeLabel}`,
      body: JSON.stringify({
        libraryId: newBarcodeLabel,
        collectionId: newCollectionId,
        winnable: winnable,
        comments: comments
      }),
      method: 'PUT',
      types: [actionTypes.updateCopyRequest, actionTypes.updateCopySuccess, actionTypes.updateCopyFailure]
    }
  };
};
