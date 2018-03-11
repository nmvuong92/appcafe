import {createStore,applyMiddleware,compose } from 'redux';

import rootReducer from './../reducers/rootReducer';

import {middleware} from './../redux';
import thunk from 'redux-thunk';
/*
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
export default store;
*/
export default compose(applyMiddleware(thunk,middleware))(createStore)(rootReducer);
