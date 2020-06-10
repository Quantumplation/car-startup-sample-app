import { push } from 'connected-react-router';
import { loadIncidents } from '../IncidentList/actions';

export function cancelIncident(incidentId) {
  return async (dispatch, getState) => {
    dispatch({ type: 'CANCEL_INCIDENT', incidentId });
    const { currentUser } = getState();
    if (!currentUser) {
      dispatch({ type: 'CANCEL_INCIDENT', incidentId, status: 'FAILURE', error: 'Not logged in!' });
      dispatch(push('/login'));
      return;
    }
    try {
      const rawResponse = await fetch(`/api/incident/${incidentId}`, { method: 'DELETE' });
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'CANCEL_INCIDENT', incidentId, status: 'SUCCESS' });
      } else {
        dispatch({ type: 'CANCEL_INCIDENT', incidentId, status: 'FAILURE', error: body.error });
      }
    } catch (err) {
      dispatch({ type: 'CANCEL_INCIDENT', incidentId, status: 'FAILURE', error: err.message });
    }
    dispatch(loadIncidents(null, true));
  };
}