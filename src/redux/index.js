import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { setStore } from 'wepy-redux';

import wxUser from './wxUser';

const reducers = {
  wxUser,
};

const rootReducer = combineReducers(reducers);

const composeEnhancers = compose;

const enhancer = composeEnhancers(applyMiddleware(...[thunk]));

const reduxStore = createStore(rootReducer, enhancer);

setStore(reduxStore);

export default reduxStore;

export function registerReducer(key, reducer) {
  reducers[key] = reducer;
  reduxStore.replaceReducer(combineReducers(reducers));
}
