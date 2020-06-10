import { refreshUser } from '../../actions';
import { push } from 'connected-react-router';
import Cookies from 'js-cookie';

export function login() {
  return async (dispatch, getState) => {
    dispatch({ type: 'LOGIN' });
    try {
      const { email, password } = getState().loginForm;
      const rawResponse = await fetch('api/user/login',
        {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
      const body = await rawResponse.json();
      if (body.result === 200) {
        Cookies.set('token', body.token, { expires: new Date(body.expiration) });
        dispatch({ type: 'LOGIN', status: 'SUCCESS', token: body.token });
        dispatch(refreshUser());
        dispatch(push('/'));
      } else {
        dispatch({ type: 'LOGIN', status: 'FAILURE', error: body.error });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN', status: 'FAILURE', error: error.message });
    }
  };
}
export function updateEmail(evt) {
  return { type: 'UPDATE_LOGIN_EMAIL', email: evt.target.value };
}
export function updatePassword(evt) {
  return { type: 'UPDATE_LOGIN_PASSWORD', password: evt.target.value };
}