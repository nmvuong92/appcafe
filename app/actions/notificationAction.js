import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';

///type
export let setNotificationCounter = (type,value)=> {
    return dispatch => {
        switch (type) {
            case "+":
                dispatch({type:types.NOTI_UP,value:value});
                break;

            case "-":
                dispatch({type:types.NOTI_DOWN,value:value});
                break;

            case "=":
                dispatch({type:types.NOTI_SET_EQUAL});
                break;        
            default:
                break;
        }
    }
}

