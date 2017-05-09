import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from './reducers/index';
import MovieList from './components/MovieList';
import fetchMoviesSaga from './actions/Sagas';
import { MainTitle } from './styles/components';

import { injectGlobal } from 'styled-components';

injectGlobal`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
  * {
      box-sizing: inherit;
      font-family: inherit;
   }
`;

const sagaMiddlware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducer,
// compose(applyMiddleware(sagaMiddlware), offline(offlineConfig))
// composeEnhancers(applyMiddleware(sagaMiddlware), offline(offlineConfig))
// );

const enhancer = compose(
  // <-- CHANGED
  applyMiddleware(sagaMiddlware),
  devToolsEnhancer(), // <-- CHANGED
  offline(offlineConfig)
);

const store = createStore(reducer, enhancer);

sagaMiddlware.run(fetchMoviesSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <MainTitle>MovieFlix</MainTitle>
          <MovieList />
        </div>
      </Provider>
    );
  }
}

export default App;
