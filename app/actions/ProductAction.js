import * as types from './actionTypes';
import Util from './../common/utils';





export let fetchFood = ()=> {
    return { 
        type: "FOOD_INFO_FETCH_FOOD", //type required &&  no action data
        
    }
}

let receiveFood = (food)=> {
    return {
        type: "FOOD_INFO_RECEIVE_FOOD", //type required && has action data
        food: food
    }
}