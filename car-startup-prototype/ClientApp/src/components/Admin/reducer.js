import { modified } from '../../utils';

function loadUsersReducer(prev, action) {
  if (action.type !== 'ADMIN_LOAD_USERS') {
    return prev;
  }
  switch (action.status) {
    case undefined:
      return modified(prev, { isLoading: prev.isLoading + 1, error: null });
    case 'SUCCESS':
      return modified(prev, { isLoading: prev.isLoading - 1, users: action.users });
    case 'FAILURE':
      return modified(prev, { isLoading: prev.isLoading - 1, error: action.error });
    default:
      return prev;
  }
}

function loadShopsReducer(prev, action) {
  if (action.type !== 'ADMIN_LOAD_SHOPS') {
    return prev;
  }
  switch (action.status) {
    case undefined:
      return modified(prev, { isLoading: prev.isLoading + 1, error: null });
    case 'SUCCESS':
      return modified(prev, { isLoading: prev.isLoading - 1, shops: action.shops });
    case 'FAILURE':
      return modified(prev, { isLoading: prev.isLoading - 1, error: action.error });
    default:
      return prev;
  }
}

function loadIncidentsReducer(prev, action) {
  if (action.type !== 'ADMIN_LOAD_INCIDENTS') {
    return prev;
  }
  switch (action.status) {
    case undefined:
      return modified(prev, { isLoading: prev.isLoading + 1, error: null });
    case 'SUCCESS':
      return modified(prev, { isLoading: prev.isLoading - 1, incidents: action.incidents });
    case 'FAILURE':
      return modified(prev, { isLoading: prev.isLoading - 1, error: action.error });
    default:
      return prev;
  }
}

export default function adminReducer(prev, action) {
  if (prev === undefined) {
    return {
      isLoading: 0,
      users: [],
      shops: [],
      incidents: [],
      error: null
    };
  }
  switch (action.type) {
    case 'ADMIN_LOAD_USERS':
      return loadUsersReducer(prev, action);
    case 'ADMIN_LOAD_SHOPS':
      return loadShopsReducer(prev, action);
    case 'ADMIN_LOAD_INCIDENTS':
      return loadIncidentsReducer(prev, action);
    default:
      return prev;
  }
}