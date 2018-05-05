import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';
import {AsyncStorage} from 'react-native';
import Toast from 'react-native-root-toast';
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

export let cartCRUD = (type,product,quantity)=> { //loai, san pham, soluong 
    return dispatch => {
        switch (type) {
            case "sync":
                AsyncStorage.getItem('cart')
                .then(function (value) {                                            
                        var current_cart = [];
                        if(value!=null){
                            current_cart = JSON.parse(value);
                        }
                        //set state
                        dispatch({type:types.CART_ADD,newCartItems:current_cart});                       
                    });
                break;
            case "+":
                AsyncStorage.getItem('cart')
                .then(function (value) {                      
                        var current_cart = [];
                        product.SLSP=quantity;
                        if(value!=null){
                                var current_cart = JSON.parse(value);
                                //if exists
                                var check_exists=false;
                                for(var i=0;i<current_cart.length;i++){
                                    if(current_cart[i].ThucDonId==product.ThucDonId){
                                         //nếu tồn tại thì chỉ cập nhật SLSP
                                        check_exists=true;
                                        current_cart[i].SLSP+=quantity;
                                        break;
                                    }
                                }
                               
                                //nếu chưa tồn tại thì thêm mới 
                                if(!check_exists){
                                    current_cart.push(product);
                                }                                
                        } else{
                            //add
                            current_cart.push(product);
                        }
                     
                        AsyncStorage.setItem('cart', JSON.stringify(current_cart));
                        dispatch({type:types.CART_ADD,newCartItems:current_cart});
                    });
                break;

            case "-":              
                AsyncStorage.getItem('cart')
                .then(function (value) {
                        if(value!=null){
                            var current_cart = JSON.parse(value);
                            //if exists
                            for(var i=0;i<current_cart.length;i++){
                                if(current_cart[i].ThucDonId==product.ThucDonId){
                                    //remove
                                    current_cart[i].SLSP-=1;
                                    //sau khi tru ==0 thi xoa luon
                                    if(current_cart[i].SLSP==0){
                                        current_cart.splice(i, 1);
                                    }
                                    break;
                                }
                            }
                            //update save
                            AsyncStorage.setItem('cart', JSON.stringify(current_cart));
                            dispatch({type:types.CART_REMOVE_ITEM,newCartItems:current_cart},()=>{
                               // Toast.show("Đã giảm sản phẩm trong giỏ hàng", {position:Toast.positions.TOP});
                            });
                        }
                    });
                break;
            case "=": //=
                AsyncStorage.getItem('cart')
                .then(function (value) {
                        if(value!=null){
                            var current_cart = JSON.parse(value);
                            //if exists
                            for(var i=0;i<current_cart.length;i++){
                                if(current_cart[i].ThucDonId==product.ThucDonId){
                                    current_cart[i].SLSP=quantity;
                                    break;
                                }
                            }
                            //update save
                            AsyncStorage.setItem('cart', JSON.stringify(current_cart));
                            dispatch({type:types.CART_SET_SOLUONG,newCartItems:current_cart},()=>{
                               // Toast.show("Đã 1 sản phẩm trong giỏ hàng", {position:Toast.positions.TOP});
                            });
                        }
                    });
                break;

                case "x": //xoa
                AsyncStorage.getItem('cart')
                .then(function (value) {
                        if(value!=null){
                            var current_cart = JSON.parse(value);
                            //if exists
                            for(var i=0;i<current_cart.length;i++){
                                if(current_cart[i].ThucDonId==product.ThucDonId){
                                    current_cart.splice(i, 1);
                                    break;
                                }
                            }
                            //update save
                            AsyncStorage.setItem('cart', JSON.stringify(current_cart));
                            dispatch({type:types.CART_REMOVE_ITEM,newCartItems:current_cart},()=>{
                               // Toast.show("Đã 1 sản phẩm trong giỏ hàng", {position:Toast.positions.TOP});
                            });
                        }
                    });
                break;
            case "0":
                AsyncStorage.removeItem('cart',()=>{
                    dispatch({type:types.CART_CLEAR,newCartItems:[]});
                });
                break;        
            default:
                break;
        }
    }
}
