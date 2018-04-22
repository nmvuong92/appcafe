import { combineReducers} from 'redux';

import ProductReducer from './ProductReducer';

//
import navReducer from './navReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import sanPhamReducer from './sanPhamReducer';
import sanPhamTrangChuReducer from './sanPhamTrangChuReducer';
import danhMucSanPhamReducer from './danhMucSanPhamReducer';
import sanPhamKhuyenMaiReducer from './sanPhamKhuyenMaiReducer';
import donHangReducer from './donHangReducer';
import articleReducer from './articleReducer';
import quanReducer from './quanReducer';
export default rootReducer = combineReducers({  
    ProductReducer,
    navReducer,
    authReducer,
    cartReducer,
    sanPhamReducer,
    danhMucSanPhamReducer,
    sanPhamTrangChuReducer,
    sanPhamKhuyenMaiReducer,
    donHangReducer,
    articleReducer,
    quanReducer
});