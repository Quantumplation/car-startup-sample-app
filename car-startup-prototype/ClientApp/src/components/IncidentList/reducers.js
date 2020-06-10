import { modified } from '../../utils';

function loadIncidentsReducer(prev, action) {
  if (action.type !== 'LOAD_INCIDENTS') {
    return prev;
  }
  const { shopId, incidents, error } = action;
  switch (action.status) {
    case undefined:
      return modified(prev, { shopId, isLoading: true, error: null, incidents: [] });
    case 'SUCCESS':
      return modified(prev, { shopId, incidents, isLoading: false });
    case 'FAILURE':
      return modified(prev, { shopId, error, isLoading: false, incidents: [] });
    default:
      return prev;
  }
}

export default function adminReducer(prev, action) {
  if (prev === undefined) {
    return {
      isLoading: false,
      incidents: [],
      error: null,
      shopId: null
    };
  }
  switch (action.type) {
    case 'LOAD_INCIDENTS':
      return loadIncidentsReducer(prev, action);
    default:
      return prev;
  }
}
