import './index.css';
import 'typeface-roboto';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createReducers from './reducers';

const rootElement = document.getElementById('root');

const history = createBrowserHistory();
const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createReducers(history),
  enhancedCompose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
    ),
  ),
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    rootElement,
  );
};
render();

registerServiceWorker();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  })

  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(createReducers(history));
  })
}