import {createStore,applyMiddleware,compose } from 'redux';

import rootReducer from './../reducers/rootReducer';

import {middleware} from './../redux';
import thunk from 'redux-thunk';


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native



const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default store = createStore(rootReducer,compose(applyMiddleware(thunk,middleware)));
