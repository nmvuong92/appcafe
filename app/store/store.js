import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './../reducers/rootReducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
export default store;