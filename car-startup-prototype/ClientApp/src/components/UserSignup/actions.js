import { push } from 'connected-react-router';

export function signup() {
  return async (dispatch, getState) => {
    dispatch({ type: 'SIGNUP' });
    try {
      const { email, password } = getState().userSignupForm;
      const rawResponse = await fetch('api/user/signup',
        {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'SIGNUP', status: 'SUCCESS', body });
        dispatch(push('/login'));
      } else {
        dispatch({ type: 'SIGNUP', status: 'FAILURE', error: body.error });
      }
    } catch (error) {
      dispatch({ type: 'SIGNUP', status: 'FAILURE', error: error.message });
    }
  };
}
export function updateEmail(evt) {
  return { type: 'UPDATE_SIGNUP_EMAIL', email: evt.target.value };
}
export function updatePassword(evt) {
  return { type: 'UPDATE_SIGNUP_PASSWORD', password: evt.target.value };
}