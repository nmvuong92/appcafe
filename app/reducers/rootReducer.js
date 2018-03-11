import { combineReducers} from 'redux';

import calcReducer from './calcReducer';
import ProductReducer from './ProductReducer';

//
import navReducer from './navReducer';
import authReducer from './authReducer';
import notificaitonReducer from './notificaitonReducer';
import sanPhamReducer from './sanPhamReducer';
import danhMucSanPhamReducer from './danhMucSanPhamReducer';
export default rootReducer = combineReducers({
    calcReducer,
    ProductReducer,
    navReducer,
    authReducer,
    notificaitonReducer,
    sanPhamReducer,
    danhMucSanPhamReducer
});