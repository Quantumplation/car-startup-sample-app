import { push } from 'connected-react-router';
import Cookies from 'js-cookie';

export function logout() {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.currentUser && state.currentUser.token) {
      fetch(`api/user/logout`);
    }
    Cookies.remove('token');
    dispatch({ type: 'LOGOUT' });
    dispatch(push('/'));
  };
}

export function checkCookie() {
  return (dispatch, getState) => {
    const state = getState();
    const token = Cookies.get('token');
    if (!token) {
      dispatch(logout());
    }
    if (state.currentUser && token !== state.currentUser.token) {
      dispatch(refreshUser());
    }
  };
}

export function refreshUser() {
  return async (dispatch) => {
    dispatch({ type: 'REFRESH_USER' });
    try {
      const [userResp, shopResp] = await Promise.all([
        fetch(`/api/user/current`),
        fetch(`/api/shop`)
      ]);
      const [userBody, shopBody] = await Promise.all([
        userResp.json(),
        shopResp.json()
      ]);
      if (userBody.result === 200 && shopBody.result === 200) {
        dispatch({ type: 'REFRESH_USER', status: 'SUCCESS', user: userBody.user, shops: shopBody.shops });
      } else {
        dispatch({ type: 'REFRESH_USER', status: 'FAILURE', error: userResp.error + '; ' + shopResp.error });
      }
    } catch (err) {
      dispatch({ type: 'REFRESH_USER', status: 'FAILURE', error: err.message });
    }
  };
}