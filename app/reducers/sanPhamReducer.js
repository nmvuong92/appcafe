import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
    products:[],
    spChiTiet:null,
    danhmuc:null,
    tukhoa:"",
}

export default ProductReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.PRODUCT_FETCH: //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
    
            
       case types.PRODUCT_RECEIVE: //nhan ve food
            
            return{
                ...state,
                ...{products:action.data, isFetching: false} //gan food moi, loading false
            };
     
       case types.PRODUCT_SPCT_RECEIVE: //nhan ve food
            return{
                ...state,
                ...{spChiTiet:action.data, isFetching: false} //gan food moi, loading false
            };
            
        case types.PRODUCT_FILTER_SET: 
            return{
                ...state,
                ...{danhmuc:action.danhmuc, tukhoa: action.tukhoa} //gan food moi, loading false
            };
       default: //mac dinh
            return state;
    }
};