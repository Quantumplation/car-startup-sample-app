import { modified } from '../../utils';

function shopSignupReducer(prev, action) {
  if (action.type !== 'SIGNUP_SHOP') {
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
  name: '',
  email: '',
  phone: '',
  address: '',
  managerEmail: '',
};
export default function (prev, action) {
  if (prev === undefined) {
    return initialState;
  }
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (action.payload.location.pathname === '/new-shop') {
        return initialState;
      } else {
        return prev;
      }
  case 'UPDATE_FORM':
    return modified(prev, { [action.field]: action.value });
  case 'SIGNUP_SHOP':
    return shopSignupReducer(prev, action);
  default:
    return prev;
  }
}