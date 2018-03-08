import { combineReducers} from 'redux';

import calcReducer from './calcReducer';
import ProductReducer from './ProductReducer';

//
import navReducer from './navReducer';
import authReducer from './authReducer';
import notificaitonReducer from './notificaitonReducer';
export default rootReducer = combineReducers({
    calcReducer,
    ProductReducer,
    navReducer,
    authReducer,
    notificaitonReducer
});