import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import user from './user';

const reducers = {
  user,
};

const rootReducer = combineReducers(reducers);

// const composeEnhancers =
//   process.env.NODE_ENV === 'development' &&
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const composeEnhancers = compose;

const enhancer = composeEnhancers(applyMiddleware(...[thunk]));

const store = createStore(rootReducer, enhancer);

export default store;

export function registerReducer(key, reducer) {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
}
