import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';


export let fetchSanPhamKhuyenMai= (page=1,pageSize=10)=> {
    if(__DEV__){
            console.log("-----------------fetchSanPham layds_khuyenmai----------------");
    }
   
    let URL =urls.api_sp+"/layds_khuyenmai?page="+page+"&pageSize="+pageSize;

    return dispatch => {
        dispatch(fetchFoodSanPhamKhuyenMai(true));
        Util.get(URL, (response) => {
            dispatch(fetchFoodSanPhamKhuyenMai(false));
            dispatch(receiveFoodSanPhamKhuyenMai(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFoodSanPhamKhuyenMai([]))
        })
    }
}


let fetchFoodSanPhamKhuyenMai = (isload)=> {
    return { type:types.PRODUCT_KHUYENMAI_FETCH,isFetching:isload}
}
let receiveFoodSanPhamKhuyenMai = (food)=> { 
    console.log(food);
    return {
        type: types.PRODUCT_KHUYENMAI_RECEIVE,
        List: food.List,
        Paging: food.Paging,
    }
}

