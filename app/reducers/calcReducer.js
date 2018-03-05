import * as types from './../actions/actionTypes';
const initialState = {
    value:0,
    num:1
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
       default:
            return state;
    }
};
export default calcReducer;