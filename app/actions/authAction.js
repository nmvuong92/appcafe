import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';
import {setUser,getUser} from './../common/Storage';
import Toast from 'react-native-root-toast';
import {fetchDanhSachDonHang} from './donHangAction';
export let postLogin = (CMND,MatKhau,fnSucc,fnErrr)=> {
    if(__DEV__){
            console.log("-----------------login----------------");
    }

    let url = urls.api_auth+"/dang_nhap";
    let data = {
        CMND: CMND,
        MatKhau: MatKhau
    };
    return (dispatch) => {
        dispatch(fetchLogin(true));
        Util.postJson(url, data,
            (response) => {
                dispatch(fetchLogin(false));
                if(response.r==true){
                    fnSucc(response);
                    var user = response.v;
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                    setUser(user);
                    dispatch(receiveLogin(user));

                    dispatch(fetchDanhSachDonHang(user,1,10));
                    
                }else{
                    fnErrr(response);
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                }
                /*
                let user = {};
                if (status) {
                    user = data.user;
                    Storage.setUser(user);
                }
                dispatch({type:types.kUserLoginReceived, status:status, code:code, message:message, share:share, user:user, app_cart_cookie_id:app_cart_cookie_id});
                dispatch(cartView(app_cart_cookie_id, user.access_token));
                */
               //save user
               

               //call reducer

               
            },
            (error) => {
                alert(error);
                //dispatch({'type': types.kActionError});
            });
    }

}


export let postRegister = (formData,fnSucc,fnErr)=> {
    if(__DEV__){
            console.log("-----------------postRegister----------------");
    }

    let url = urls.api_auth+"/dang_ky"; 
    return (dispatch) => {
        dispatch(fetchRegister(true));
        Util.postJson(url, formData,
            (response) => {
                dispatch(fetchRegister(false));
                if(response.r==true){
                    fnSucc(response);
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                    var user = response.v;
                    setUser(user);
                    dispatch(receiveRegister(user));
                }else{
                    fnErr(response);
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                }
                /*
                let user = {};
                if (status) {
                    user = data.user;
                    Storage.setUser(user);
                }
                dispatch({type:types.kUserLoginReceived, status:status, code:code, message:message, share:share, user:user, app_cart_cookie_id:app_cart_cookie_id});
                dispatch(cartView(app_cart_cookie_id, user.access_token));
                */
               //save user
               

               //call reducer

               
            },
            (error) => {
                alert(error);
                //dispatch({'type': types.kActionError});
            });
    }

}


export let updateAccount = (formData)=> {
    if(__DEV__){
            console.log("-----------------updateAccount----------------");
    }

    let url = urls.api_auth+"/dang_ky"; 
    return (dispatch) => {
        dispatch(fetchRegister(true));
        Util.postJson(url, formData,
            (response) => {
                console.log(response);
                dispatch(fetchRegister(false));
                if(response.r==true){
                    var user = response.v;
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                    setUser(user);
                    dispatch(receiveRegister(user));
                }else{
                    Toast.show(response.m, {position:Toast.positions.CENTER});
                }
              
            },
            (error) => {
                alert(error);
                //dispatch({'type': types.kActionError});
            });
    }
}



export let initialSyncSetUser = (user)=>{
    return (dispatch) => {
        dispatch(receiveLogin(user));
    }       
}

export let logout = ()=>{
    setUser(null);
    return (dispatch)=>{
        dispatch({
            type:types.AUTH_LOGOUT,
        });
    }
}

let fetchLogin = (isload)=> {
    return { type:types.AUTH_LOGIN_FETCH,isFetching:isload}
}
let receiveLogin = (user)=> { 
    return {
        type: types.AUTH_LOGIN_SAVE,
        user: user
    }
}



let fetchRegister = (isload)=> {
    return { type:types.AUTH_REGISTER_FETCH,isFetching:isload}
}
let receiveRegister = (user)=> { 
    return {
        type: types.AUTH_REGISTER_RECEIVE,
        user: user
    }
}
