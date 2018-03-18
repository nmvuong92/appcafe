import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
    List:null,
}

export default donHangReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.ARTICLE_FETCH:
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
    
            
       case types.ARTICLER_RECEIVE:
            return{
                ...state,
                ...{
                        List:action.List,
                        isFetching: false,
                   } 
            };

       default:
            return state;
    }
};