import { RSAA } from 'redux-api-middleware';
import { authInstance as auth } from '../components/auth/auth';

export default () => next => async action => {
  const callApi = RSAA ? action[RSAA] : null;

  if (callApi) {
    const token = await auth.getAccessToken();
    callApi.headers = Object.assign({}, callApi.headers, {
      Authorization: `Bearer ${token}`
    });
  }

  return next(action);
};
