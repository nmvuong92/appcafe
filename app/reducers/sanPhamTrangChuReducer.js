import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
    products:[],
}

export default sanPhamTrangChuReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.PRODUCT_HOMEPAGE_FETCH: //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
    
            
       case types.PRODUCT_HOMEPAGE_RECEIVE: //nhan ve food
            
            return{
                ...state,
                ...{products:action.data, isFetching: false} //gan food moi, loading false
            };
    
       default: //mac dinh
            return state;
    }
};