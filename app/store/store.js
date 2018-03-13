import {createStore,applyMiddleware,compose } from 'redux';

import rootReducer from './../reducers/rootReducer';

import {middleware} from './../redux';
import thunk from 'redux-thunk';




const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default store = createStore(rootReducer,compose(applyMiddleware(thunk,middleware)));
