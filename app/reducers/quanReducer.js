import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
    Quan:null
}

export default donHangReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.QUAN_FETCH:
            return{
                ...state,
                ...{isFetching:action.data}
            };

       case types.QUAN_RECEIVE:
            return {
                ...state,
                ...{
                    Quan:action.data,
                    isFetching:false,
                }
            }
       default:
            return state;
    }
};