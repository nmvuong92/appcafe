import * as types from './actionTypes';
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
