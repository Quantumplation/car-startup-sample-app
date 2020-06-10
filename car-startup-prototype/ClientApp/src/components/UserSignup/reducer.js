import { modified } from '../../utils';

function signupReducer(prev, action) {
  if (action.type !== 'SIGNUP') {
    return prev;
  }

  switch (action.status) {
  case undefined:
    return modified(prev, { isLoading: true });
  case 'SUCCESS':
    return modified(prev, { isLoading: false, email: '', password: '' });
  case 'FAILURE':
    return modified(prev, { isLoading: false, error: action.error, password: '' });
  default:
    return prev;
  }
}

export default function (prev, action) {
  if (prev === undefined) {
    return {
      email: '',
      password: '',
      isLoading: false
    };
  }
  switch (action.type) {
  case 'UPDATE_SIGNUP_EMAIL':
    return modified(prev, { email: action.email });
  case 'UPDATE_SIGNUP_PASSWORD':
    return modified(prev, { password: action.password });
  case 'SIGNUP':
    return signupReducer(prev, action);
  default:
    return prev;
  }
}