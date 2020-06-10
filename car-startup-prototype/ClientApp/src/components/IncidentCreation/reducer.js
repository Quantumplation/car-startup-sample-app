import { modified } from '../../utils';

function createIncidentReducer(prev, action) {
  if (action.type !== 'CREATE_INCIDENT') {
    return prev;
  }

  switch (action.status) {
  case undefined:
    return modified(prev, { isLoading: true });
  case 'SUCCESS':
    return modified(prev, { isLoading: false, success: true, error: null });
  case 'FAILURE':
    return modified(prev, { isLoading: false, success: false, error: action.error });
  default:
    return prev;
  }
}

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  carModel: '',
  description: ''
};
export default function (prev, action) {
  if (prev === undefined) {
    return initialState;
  }
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (action.payload.location.pathname === '/new-incident') {
        return initialState;
      } else {
        return prev;
      }
    case 'UPDATE_FORM':
      return modified(prev, { [action.field]: action.value });
    case 'CREATE_INCIDENT':
      return createIncidentReducer(prev, action);
    default:
      return prev;
  }
}
