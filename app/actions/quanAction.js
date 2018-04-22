import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';
import Toast from 'react-native-root-toast';
import * as save from './../common/Storage';
export let getById = (id,qr,fnSucc,fnErr)=> {
    let URL =urls.api_quan+"/get_by_id?id="+id;
    console.log(URL);
    return dispatch => {
        dispatch({
            type:types.QUAN_FETCH,
            data:true,
        });
        Util.get(URL, (response) => {
            console.log(response);
            if(response.r==true){
                save.setQuan(response.v);
                save.setQR(qr);
                dispatch({
                    type:types.QUAN_RECEIVE,
                    data:response.v
                });
                fnSucc();
            }else{
                Toast.show(response.m, {position:Toast.positions.CENTER});
                fnErr();
            }
        }, (error) => {
            alert(error);
            console.log(`Fetch food info error: ${error}`);
        })
    }
}

export let setSyncQuan = (quan)=> {
    return dispatch => {
        dispatch({
            type:types.QUAN_RECEIVE,
            data:quan
        });
    }
}


export let logoutQuan = ()=> {
    return dispatch => {
        save.setQuan(null);
        save.setQR(null);
        dispatch({
            type:types.QUAN_RECEIVE,
            data:null
        });
    }
}