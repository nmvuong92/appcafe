import { combineReducers} from 'redux';

import ProductReducer from './ProductReducer';

//
import navReducer from './navReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import sanPhamReducer from './sanPhamReducer';
import sanPhamTrangChuReducer from './sanPhamTrangChuReducer';
import danhMucSanPhamReducer from './danhMucSanPhamReducer';
export default rootReducer = combineReducers({  
    ProductReducer,
    navReducer,
    authReducer,
    cartReducer,
    sanPhamReducer,
    danhMucSanPhamReducer,
    sanPhamTrangChuReducer,
});