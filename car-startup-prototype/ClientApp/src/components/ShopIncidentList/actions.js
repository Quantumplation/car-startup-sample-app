import { push } from 'connected-react-router';
import { loadIncidents } from '../IncidentList/actions';

export function claimIncident(shopId, incidentId) {
  return async (dispatch, getState) => {
    dispatch({ type: 'CLAIM_INCIDENT', shopId, incidentId });
    const { currentUser } = getState();
    if (!currentUser) {
      dispatch({ type: 'CLAIM_INCIDENT', shopId, incidentId, status: 'FAILURE', error: 'Not logged in!' });
      dispatch(push('/login'));
      return;
    }
    try {
      const rawResponse = await fetch(`/api/incident/${incidentId}/claim?shopId=${shopId}`, { method: 'POST' });
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'CLAIM_INCIDENT', shopId, incidentId, status: 'SUCCESS' });
      } else {
        dispatch({ type: 'CLAIM_INCIDENT', shopId, incidentId, status: 'FAILURE', error: body.error });
      }
    } catch (err) {
      dispatch({ type: 'CLAIM_INCIDENT', shopId, incidentId, status: 'FAILURE', error: err.message });
    }
    dispatch(loadIncidents(shopId, true));
  };
}
