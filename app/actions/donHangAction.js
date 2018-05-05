import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';
import Toast from 'react-native-root-toast';
import {cartCRUD} from './cartAction';

var DeviceInfo = require('react-native-device-info');

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

export let fetchDanhSachDonHangDevice = (page,pageSize)=> {
   
    var _uniqueID=DeviceInfo.getUniqueID();
    let URL =urls.api_donhang+"/laydsdevice?uniqueID="+_uniqueID+"&trangthaithanhtoanid=-1&page="+page+"&pageSize="+pageSize;
    console.log(URL);
    return dispatch => {
        dispatch(fetchFood(true));
        Util.get(URL, (response) => {
            dispatch(fetchFood(true));
            dispatch(receive(response));
        }, (error) => {
            alert(error);
            console.log(`Fetch food info error: ${error}`);
        })
    }
}

export let fetchDanhSachDonHangDeviceBS = (page,pageSize)=> {
    var _uniqueID=DeviceInfo.getUniqueID();
    let URL =urls.api_donhang+"/laydsdevice?uniqueID="+_uniqueID+"&trangthaithanhtoanid=1&page="+page+"&pageSize="+pageSize;
    console.log(URL);
    return dispatch => {
        dispatch(fetchFoodBS(true));
        Util.get(URL, (response) => {
            dispatch(fetchFoodBS(true));
            dispatch(receiveBS(response));
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
        SoLuongDonHangChuaThanhToan:food.Number1
    }
}
let fetchFoodBS = (isload)=> {
    return { type:types.DONHANG_FETCHBS,isFetching:isload}
}
let receiveBS = (food)=> { 
    return {
        type: types.DONHANG_BS_RECEIVE,
        List: food.List,
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


export let postThanhToanDatHang = (user,data,fnSuccess)=> {
   
    /*data.UserId=user.UserId;
    data.Token = user.JWTToken;*/

    let url = urls.api_donhang+"/dat_hang_qr";

    var _deviceName = DeviceInfo.getDeviceId();
    var _uniqueID=DeviceInfo.getUniqueID();
    var _ModelNumber=DeviceInfo.getModel();

    data.ModelNumber=_ModelNumber;
    data.UniqueID=_uniqueID;
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
                    /*dispatch(fetchDanhSachDonHang(user));*/
                    fnSuccess();
                    /*dispatch({
                        type:"GioHang_ThanhToan_DonHang_Screen"
                    });*/
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



export let postGoiTinhTien = (DonHangID,fnSuccess)=> {
   
    /*data.UserId=user.UserId;
    data.Token = user.JWTToken;*/

    let url = urls.api_donhang+"/goitinhtien";
    var data={
        DonHangID:DonHangID
    };
    console.log(data);
    return (dispatch) => {
       
        Util.postJson(url, data,
            (response) => {           
                console.log(response);
                if(response.r==true){
                    //hien thi thong bao
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                    fnSuccess();
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

export let postGopY = (DonHangID,NoiDung,fnSuccess)=> {
   
    /*data.UserId=user.UserId;
    data.Token = user.JWTToken;*/

    let url = urls.api_donhang+"/gopy";
    var data={
        DonHangID:DonHangID,
        NoiDung:NoiDung,
    };
    console.log(data);
    return (dispatch) => {
       
        Util.postJson(url, data,
            (response) => {           
                console.log(response);
                if(response.r==true){
                    //hien thi thong bao
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                    fnSuccess();
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