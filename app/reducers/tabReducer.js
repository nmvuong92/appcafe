import * as types from './../actions/actionTypes';
const initialState = {
    num:1
}

let tabReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.kTabNumUP:
            return{
                ...state,
                ...{value:state.value+1}
            };
       default:
            return state;
    }
};
export default tabReducer;