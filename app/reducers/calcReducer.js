import * as types from './../actions/actionTypes';
const initialState = {
    value:0,
    num:1,
    list:[],
    isLoading:false,
    notifications:5,
    authIsLogin:false,
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
                ...{isLoading:true,notifications:state.notifications+1}
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
        case "K_SET_LOGIN_TRUE":
            console.log("K_SET_LOGIN_TRUE");
            return{
                ...state,
                ...{authIsLogin:true}
            }
       default:
            return state;
    }
};
export default calcReducer;