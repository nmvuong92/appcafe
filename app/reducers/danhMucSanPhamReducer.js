import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
    data:[]
}

export default ProductReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.DMSP_FETCH: //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
    
            
       case types.DMSP_RECEIVE: //nhan ve food
            return{
                ...state,
                ...{data:action.data, isFetching: false} //gan food moi, loading false
            };
     
       default: //mac dinh
            return state;
    }
};