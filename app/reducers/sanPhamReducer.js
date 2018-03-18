import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
 
    List:[],
    Paging:{
        TotalRecords:0,
        RecordsPerPage:0,
        CurrentPage:0,
        PageNext:0,
        TotalPages:0,
    },

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
                ...{
                    List:action.List, 
                    isFetching: false,
                    Paging:action.Paging,
                } //gan food moi, loading false
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