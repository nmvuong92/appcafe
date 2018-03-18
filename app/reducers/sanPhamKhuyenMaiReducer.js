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
}

export default sanPhamKhuyenMaiReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.PRODUCT_KHUYENMAI_FETCH: //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
    
            
       case types.PRODUCT_KHUYENMAI_RECEIVE: //nhan ve food
            
            return{
                ...state,
                ...{
                     List:action.List,
                     isFetching: false,
                     Paging:action.Paging
                } //gan food moi, loading false
            };
    
       default: //mac dinh
            return state;
    }
};