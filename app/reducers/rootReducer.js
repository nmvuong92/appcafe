import { combineReducers} from 'redux';

import calcReducer from './calcReducer';
import ProductReducer from './ProductReducer';

//
import navReducer from './navReducer';
import authReducer from './authReducer';
export default rootReducer = combineReducers({
    calcReducer,
    ProductReducer,
    navReducer,
    authReducer
});