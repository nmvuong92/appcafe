import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from './../common/constants_url';
import * as save from './../common/Storage';
export let fetchListDMSP = ()=>{
    return dispatch => {
      
        save.getQuan().then((quan)=>{
            if(quan!=null){
                let URL = urls.api_dmsp+"/layds?quanid="+quan.Id;
                dispatch(fetchFood(true));
                Util.get(URL, (response) => {
                    dispatch(fetchFood(false));
                    dispatch(receiveFood(response));
                }, (error) => {alert(error)
                    if(__DEV__){
                     console.log(`Fetch food info error: ${error}`);
                    }
                    dispatch(receiveFood([]))
                })
            }else{
                dispatch(receiveFood([]))
            }
        });
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