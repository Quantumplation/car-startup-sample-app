import { push } from 'connected-react-router';

export function loadUsers() {
  return async (dispatch, getState) => {
    dispatch({ type: 'ADMIN_LOAD_USERS' });
    const { currentUser } = getState();
    if (!currentUser) {
      dispatch({ type: 'ADMIN_LOAD_USERS', status: 'FAILURE', error: 'Not logged in!' });
      dispatch(push('/'));
      return;
    }
    try {
      const rawResponse = await fetch(`/api/user/all`);
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'ADMIN_LOAD_USERS', status: 'SUCCESS', users: body.userEmails });
      } else {
        dispatch({ type: 'ADMIN_LOAD_USERS', status: 'FAILURE', error: body.error });
      }
    } catch (err) {
      dispatch({ type: 'ADMIN_LOAD_USERS', status: 'FAILURE', error: err.message });
    }
  };
}

export function loadShops() {
  return async (dispatch, getState) => {
    dispatch({ type: 'ADMIN_LOAD_SHOPS' });
    const { currentUser } = getState();
    if (!currentUser) {
      dispatch({ type: 'ADMIN_LOAD_SHOPS', status: 'FAILURE', error: 'Not logged in!' });
      dispatch(push('/'));
      return;
    }
    try {
      const rawResponse = await fetch(`/api/shop/all`);
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'ADMIN_LOAD_SHOPS', status: 'SUCCESS', shops: body.shops });
      } else {
        dispatch({ type: 'ADMIN_LOAD_SHOPS', status: 'FAILURE', error: body.error });
      }
    } catch (err) {
      dispatch({ type: 'ADMIN_LOAD_SHOPS', status: 'FAILURE', error: err.message });
    }
  };
}

export function loadIncidents() {
  return async (dispatch, getState) => {
    dispatch({ type: 'ADMIN_LOAD_INCIDENTS' });
    const { currentUser } = getState();
    if (!currentUser) {
      dispatch({ type: 'ADMIN_LOAD_INCIDENTS', status: 'FAILURE', error: 'Not logged in!' });
      dispatch(push('/'));
      return;
    }
    try {
      const rawResponse = await fetch(`/api/incident/all`);
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'ADMIN_LOAD_INCIDENTS', status: 'SUCCESS', incidents: body.incidents });
      } else {
        dispatch({ type: 'ADMIN_LOAD_INCIDENTS', status: 'FAILURE', error: body.error });
      }
    } catch (err) {
      dispatch({ type: 'ADMIN_LOAD_INCIDENTS', status: 'FAILURE', error: err.message });
    }
  };
}