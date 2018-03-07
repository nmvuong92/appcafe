import * as types from './../actions/actionTypes';
const initialState = {
    value:0,
    num:1,
    list:[],
    isLoading:false
}

let calcReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.kCalcUP:
            return{
                ...state,
                ...{value:state.value+action.num}
            };
    
       case types.kCalcDOWN:
            return{
                ...state,
                ...{value:state.value-action.num}
            };
       case "K_LOAD_LOADING":
            return{
                ...state,
                ...{isLoading:true}
            };
        case "K_LOAD_SUCCESS":
            return{
                ...state,
                ...{isLoading:false,list:action.newList}
            }
        case "K_LOAD_FAILED":
            return{
                ...state,
                ...{isLoading:false,list:[]}
            }
       default:
            return state;
    }
};
export default calcReducer;