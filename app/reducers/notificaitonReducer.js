import * as types from './../actions/actionTypes';
const initialState = {
    count:5,
}

export default  notificaitonReducer  = (state=initialState,action)=>{
    switch (action.type) {
    
       case types.NOTI_UP:
            return{
                ...state,
                ...{count:state.count+action.value}
            };
       case types.NOTI_DOWN:
            if(state.count+action.value>10){
                alert("Error, maximum: 10");
                break;
            }
            return{
                ...state,
                ...{count:state.count-action.value}
            };
        case types.NOTI_SET_EQUAL:
            
            return{
                ...state,
                ...{count:action.value}
            };
       default:
            return state;
    }
};