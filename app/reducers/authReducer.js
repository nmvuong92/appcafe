import * as types from './../actions/actionTypes';
const initialState = {
    isLoggedIn: false
}

let authReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case 'Login':
          return { ...state, isLoggedIn: true };
        case 'Logout':
          return { ...state, isLoggedIn: false };
        default:
          return state;
      }
};
export default authReducer;