import { push } from 'connected-react-router';

export function createIncident() {
  return async (dispatch, getState) => {
    dispatch({ type: 'CREATE_INCIDENT' });
    try {
      const { currentUser, incidentCreateForm } = getState();
      if (!currentUser) {
        dispatch({ type: 'CREATE_INCIDENT', status: 'FAILURE', error: 'Not logged in!' });
        dispatch(push('/'));
        return;
      }
      const { carModel, description } = incidentCreateForm;
      const rawResponse = await fetch(`api/incident`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ carModel, description })
        });
      const body = await rawResponse.json();
      if (body.result === 200) {
        dispatch({ type: 'CREATE_INCIDENT', status: 'SUCCESS' });
      } else {
        dispatch({ type: 'CREATE_INCIDENT', status: 'FAILURE', error: body.error });
      }
    } catch (error) {
      dispatch({ type: 'CREATE_INCIDENT', status: 'FAILURE', error: error.message });
    }
    dispatch(push('/incidents'));
  };
}
export function updateForm(field) {
  return (evt) => ({
    type: 'UPDATE_FORM',
    field,
    value: evt.target.value
  });
}