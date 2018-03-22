import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';
import Toast from 'react-native-root-toast';
import {cartCRUD} from './cartAction';
export let fetchDanhSachDonHang = (user,page,pageSize)=> {
   
   
    let URL =urls.api_donhang+"/layds?userid="+user.UserId+"&token="+user.JWTToken+"&page="+page+"&pageSize="+pageSize;
    if(__DEV__){
        console.log(URL);
    }

    return dispatch => {
        dispatch(fetchFood(true));
        Util.get(URL, (response) => {
            dispatch(fetchFood(true));
            dispatch(receive(response));
            console.log(response);
        }, (error) => {
            alert(error);
            console.log(`Fetch food info error: ${error}`);
        })
    }
}
let fetchFood = (isload)=> {
    return { type:types.DONHANG_FETCH,isFetching:isload}
}
let receive = (food)=> { 
    return {
        type: types.DONHANG_RECEIVE,
        List: food.List,
        Paging: food.Paging,
    }
}


export let fetchDanhSachDonHangTichDiem = (user,page,pageSize)=> {
    let URL =urls.api_donhang+"/layds_tichdiem?userid="+user.UserId+"&token="+user.JWTToken+"&page="+page+"&pageSize="+pageSize;
    if(__DEV__){
        console.log(URL);
    }

    return dispatch => {
        dispatch(fetchFoodTichDiem(true));
        Util.get(URL, (response) => {
            dispatch(fetchFoodTichDiem(true));
            dispatch(receiveTichDiem(response));
            console.log(response);
        }, (error) => {
            alert(error);
            console.log(`Fetch food info error: ${error}`);
        })
    }
}
let fetchFoodTichDiem = (isload)=> {
    return { type:types.DONHANG_TICHDIEM_FETCH,isFetching:isload}
}
let receiveTichDiem = (food)=> { 
    return {
        type: types.DONHANG_TICHDIEM_RECEIVE,
        List: food.List,
        Paging: food.Paging,
    }
}



//dat hang


export let postThanhToanDatHang = (user,data)=> {
   
    data.UserId=user.UserId;
    data.Token = user.JWTToken;


    let url = urls.api_donhang+"/dat_hang";
    if(__DEV__){
        console.log("-----------------postThanhToanDatHang----------------");
        console.log(url);
    
        console.log(data);
    }
    return (dispatch) => {
        dispatch(fetchDatHang(true));
        Util.postJson(url, data,
            (response) => {
                dispatch(fetchDatHang(false));
                console.log(response);
                if(response.r==true){
                    //xoa gio hang
                    dispatch(cartCRUD("0"));
                    //hien thi thong bao
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                    //tai lai danh sach
                    dispatch(fetchDanhSachDonHang(user));
                    dispatch({
                        type:"GioHang_ThanhToan_DonHang_Screen"
                    });
                }else{
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                }
            },
            (error) => {
                alert(error);
                //dispatch(receiveDatHang(user));
            });
    }
}

let fetchDatHang = (isload)=> {
    return { type:types.POST_DATHANG_FETCH,isFetching:isload}
}
