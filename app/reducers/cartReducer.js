import * as types from './../actions/actionTypes';
const initialState = {
    cartItems:[]
}

export default  cartReducer  = (state=initialState,action)=>{
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
       case types.CART_ADD:
            return{
                ...state,
                ...{cartItems:action.newCartItems}
            };
       case types.CART_REMOVE_ITEM:
            return {
                ...state,
                ...{cartItems:action.newCartItems}
            };
        case types.CART_CLEAR:
            return {
                ...state,
                ...{cartItems:action.newCartItems}
            };
       default:
            return state;
    }
};