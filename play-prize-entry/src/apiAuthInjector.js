import { RSAA } from 'redux-api-middleware';

export default () => next => action => {
  const callApi = RSAA ? action[RSAA] : null;

  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    // Inject the Authorization header from localStorage.
    callApi.headers = Object.assign({}, callApi.headers, {
      Authorization: `Bearer ${localStorage.getItem('access_token')}` || ''
    });
  }

  // Pass the FSA to the next action.
  return next(action);
};
