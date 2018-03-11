import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from './../common/constants_url';

export let fetchListDMSP = ()=>{

    console.log("--------fetchListDMSP");
    let URL = urls.api_dmsp+"/layds";
    console.log("--------fetchListDMSP url: "+URL);
    return dispatch => {

        dispatch(fetchFood(true));
        Util.get(URL, (response) => {
            dispatch(fetchFood(false));
            dispatch(receiveFood(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFood([]))
        })
        
    }
}

let fetchFood = (isload)=> {
    return { type:types.DMSP_FETCH,isFetching:isload}
}

let receiveFood = (resData)=> {
    return {
        type: types.DMSP_RECEIVE,
        data: resData
    }
}