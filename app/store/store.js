import {createStore,applyMiddleware} from 'redux';

import rootReducer from './../reducers/rootReducer';

import {middleware} from './../redux';

/*let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
export default store;*/

const store = createStore(
    rootReducer,
    applyMiddleware(middleware)
);
export default store;


