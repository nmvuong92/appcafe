import * as types from './actionTypes';
import axios from 'axios';
import Util from './../common/utils';

export let CalcUP = (_num)=>{
    return {
        type:types.kCalcUP,
        num:_num
    }
}

export let  CalcDOWN = (_num)=>{
    return {
        type:types.kCalcDOWN,
        num:_num
    }
}
export let vfetch = ()=> {

  
    

    let URL = 'https://jsonplaceholder.typicode.com/photos';

    return dispatch => {
        dispatch(fetchFood());
        
        Util.get(URL, (response) => {
            console.log("------------SUCCESS");
            console.log(response);
            dispatch(receiveFood(response));
        }, (error) => {alert(error)
            console.log("------------ERRORR");
            console.log(error);
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFood([]))
        })
    }
 }

let fetchFood = ()=> {
    return { type:"K_LOAD_LOADING" }
}

let receiveFood = (data)=> {
    return {
        type:"K_LOAD_SUCCESS",
        newList: data
    }
}