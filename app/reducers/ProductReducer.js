import * as types from './../actions/actionTypes';
const initialState = {
    isFetchingFood: false,
    food:[]
}

export default ProductReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case "FOOD_INFO_FETCH_FOOD": //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetchingFood:true}
            };
    
            
       case "FOOD_INFO_RECEIVE_FOOD": //nhan ve food
            return{
                ...state,
                ...{
                    food:ation.food, isFetchingFood: false} //gan food moi, loading false
            };

       default: //mac dinh
            return state;
    }
};