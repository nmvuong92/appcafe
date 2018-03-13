import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';


export let fetchSanPhamTrangChu = ()=> {
    if(__DEV__){
            console.log("-----------------fetchSanPham trang chu----------------");
    }
   
    let URL =urls.api_sp+"/layds_trangchu";

    return dispatch => {
        dispatch(fetchFoodTrangChu(true));
        Util.get(URL, (response) => {
            dispatch(fetchFoodTrangChu(false));
            dispatch(receiveFoodTrangChu(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFoodTrangChu([]))
        })
    }
}


let fetchFoodTrangChu = (isload)=> {
    return { type:types.PRODUCT_HOMEPAGE_FETCH,isFetching:isload}
}
let receiveFoodTrangChu = (food)=> {
    console.log(food);
    return {
        type: types.PRODUCT_HOMEPAGE_RECEIVE,
        data: food
    }
}

