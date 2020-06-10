import { push } from 'connected-react-router';

export function signup() {
  return async (dispatch, getState) => {
    dispatch({ type: 'SIGNUP_SHOP' });
    try {
      const { currentUser, shopSignupForm } = getState();
      if (!currentUser) {
        dispatch({ type: 'SIGNUP_SHOP', status: 'FAILURE', error: 'Not logged in!' });
        dispatch(push('/'));
        return;
      }
      const { name, email, phone, address, managerEmail } = shopSignupForm;
      const rawResponse = await fetch(`api/shop`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ name, email, phone, address, managerEmail })
        });
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'SIGNUP_SHOP', status: 'SUCCESS' });
      } else {
        dispatch({ type: 'SIGNUP_SHOP', status: 'FAILURE', error: body.error });
      }
    } catch (error) {
      dispatch({ type: 'SIGNUP_SHOP', status: 'FAILURE', error: error.message });
    }
  };
}
export function updateForm(field) {
  return (evt) => ({
    type: 'UPDATE_FORM',
    field,
    value: evt.target.value
  });
}