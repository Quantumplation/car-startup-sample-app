import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { modified } from './utils';

import loginFormReducer from './components/Login/reducer';
import userSignupFormReducer from './components/UserSignup/reducer';
import shopSignupFormReducer from './components/ShopSignup/reducer';
import incidentCreateFormReducer from './components/IncidentCreation/reducer';
import adminPageReducer from './components/Admin/reducer';
import incidentListReducer from './components/IncidentList/reducers';

function userReducer(state, action) {
  if (state === undefined || state === null) {
    return { user: null, token: null };
  }
  switch (action.type) {
    case 'REFRESH_USER':
      if (!action.status) {
        return modified(state, { user: null, token: action.token || state.token });
      } else if (action.status === 'SUCCESS') {
        return modified(state, { user: action.user, shops: action.shops });
      } else if (action.status === 'FAILURE') {
        return modified(state, { user: null, token: null });
      } else {
        return state;
      }
    case 'LOGIN':
      if (action.status === 'SUCCESS') {
        return modified(state, { user: null, token: action.token });
      } else {
        return state;
      }
    case 'LOGOUT':
      return modified(state, { user: null, token: null });
    default:
      return state;
  }
}

function clearShopIdReducer(state, action) {
  // This is awkwardly located, find a better place for it
  if (action.type === '@@router/LOCATION_CHANGE') {
    if (action.payload.location.pathname === '/incidents') {
      const incidentList = modified(state.incidentList, { shopId: null });
      return modified(state, { incidentList });
    }
  }
  return state;
}

export default (history) => {
  return (state, action) => {
    const s = clearShopIdReducer(state, action);
    return combineReducers({
      router: connectRouter(history),
      loginForm: loginFormReducer,
      userSignupForm: userSignupFormReducer,
      shopSignupForm: shopSignupFormReducer,
      incidentCreateForm: incidentCreateFormReducer,
      incidentList: incidentListReducer,
      adminPage: adminPageReducer,
      currentUser: userReducer
    })(s, action);
  }
};