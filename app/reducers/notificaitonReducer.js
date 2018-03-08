import * as types from './../actions/actionTypes';
const initialState = {
    count:5,
}

export default  notificaitonReducer  = (state=initialState,action)=>{
    switch (action.type) {
    
       case "K_NOTIFICATION_UP_BADGE":
            return{
                ...state,
                ...{isLoading:true,notifications:state.count+1}
            };
       case "K_NOTIFICATION_DOWN_BADGE":
            return{
                ...state,
                ...{isLoading:true,notifications:state.count-1}
            };
       default:
            return state;
    }
};