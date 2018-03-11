import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';


export let fetchSanPham = (danhmuc=null,tukhoa="")=> {
    console.log("-----------------fetchSanPham----------------");
    let URL =urls.api_sp+"/layds"+(tukhoa!=""?"?search="+tukhoa:"");
    if(danhmuc!=null){
        URL =urls.api_sp+"/layds?iddm="+danhmuc.ID+(tukhoa!=""?"&search="+tukhoa:"");
    }
    console.log("url: "+URL);

    return dispatch => {
        dispatch(fetchFood(true));
        dispatch(setFilter(danhmuc,tukhoa));
        Util.get(URL, (response) => {
            dispatch(fetchFood(false));
            dispatch(receiveFood(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFood([]))
        })
    }
}
export let fetchSanPhamCT = (idsp)=> {
    console.log("-----------------fetchSanPhamCT----------------");
    let URL =urls.api_sp+"/laysp?id="+idsp;
    console.log("url: "+URL);

    return dispatch => {
        dispatch(fetchFood(true));
        
        Util.get(URL, (response) => {
            dispatch(fetchFood(false));
            dispatch(receiveFoodCT(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFoodCT(null))
        })
    }
}
export let setFilter = (danhmuc,tukhoa)=>{
    return { type:types.PRODUCT_FILTER_SET,danhmuc:danhmuc,tukhoa:tukhoa}
}
let fetchFood = (isload)=> {
    return { type:types.PRODUCT_FETCH,isFetching:isload}
}

let receiveFood = (food)=> {
    return {
        type: types.PRODUCT_RECEIVE,
        data: food
    }
}

let receiveFoodCT = (food)=> {
    return {
        type: types.PRODUCT_SPCT_RECEIVE,
        data: food
    }
}
