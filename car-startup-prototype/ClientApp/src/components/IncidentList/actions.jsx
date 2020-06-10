import { push } from 'connected-react-router';
export function loadIncidents(shopId, force) {
  return async (dispatch, getState) => {
    const state = getState();
    if (shopId === state.incidentList.shopId && !force) {
      return;
    }
    dispatch({ type: 'LOAD_INCIDENTS', shopId });
    const { currentUser } = getState();
    if (!currentUser) {
      dispatch({ type: 'LOAD_INCIDENTS', shopId, status: 'FAILURE', error: 'Not logged in!' });
      dispatch(push('/login'));
      return;
    }
    try {
      const url = shopId ? `/api/incident/shop/${shopId}` : `/api/incident`;
      const rawResponse = await fetch(url);
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'LOAD_INCIDENTS', shopId, status: 'SUCCESS', incidents: body.incidents });
      } else {
        dispatch({ type: 'LOAD_INCIDENTS', shopId, status: 'FAILURE', error: body.error });
      }
    } catch (err) {
      dispatch({ type: 'LOAD_INCIDENTS', shopId, status: 'FAILURE', error: err.message });
    }
  };
}
