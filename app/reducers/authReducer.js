import * as types from './../actions/actionTypes';
const initialState = {
    isLoggedIn: false,
    isFetching:false,
    user:null,
    
}

let authReducer  = (state=initialState,action)=>{
    switch (action.type) {
       case types.AUTH_LOGIN_FETCH:
          return {...state,isFetching:action.isFetching}
       case  types.AUTH_LOGIN_SAVE:
          return { ...state, isLoggedIn: true,user:action.user };
        case types.AUTH_LOGOUT:
          return { ...state, isLoggedIn: false,user:null };

        //register
        case types.AUTH_REGISTER_FETCH:
          return {...state,isFetching:action.isFetching}
        case types.AUTH_REGISTER_RECEIVE:
          return {...state, isLoggedIn: true,user:action.user };
        
        case types.AUTH_CAPNHATTAIKHOAN_RECEIVE:
          return {...state, user:action.user };
        default:
        
         return state;
    }
};
export default authReducer;