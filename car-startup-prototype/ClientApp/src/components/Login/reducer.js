import { modified } from '../../utils';

function loginReducer(prev, action) {
  if (action.type !== 'LOGIN') {
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
    case 'UPDATE_LOGIN_EMAIL':
      return modified(prev, { email: action.email });
    case 'UPDATE_LOGIN_PASSWORD':
      return modified(prev, { password: action.password });
    case 'LOGIN':
      return loginReducer(prev, action);
    default:
      return prev;
  }
}
