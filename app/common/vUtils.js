import React,{Component} from 'react';
import {View,StyleSheet,Dimensions, Platform } from 'react-native';
import {VCOLOR} from './constants';

export const formatVND = (x,default0="Liên hệ") => {
    if(x==null||x==0){
        return default0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" ₫";
}

export const defaultString = (str,defaultStr="...") => {
    if(str==null || str == undefined || str.length==0){
        return defaultStr;
    }
    return str;
}

export const vStyles = StyleSheet.create({
    h1:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        color:"red"
    },
    price:{
        fontSize:15,
        fontWeight: 'bold',
        color: VCOLOR.price
    },
    product_name:{
        fontSize:11,
    },
    cat_name:{
        fontSize:9,
        color:"#a5a5a5",
    }
});


export let checkNotNullNotUndefined = (value)=>{
    return value!=undefined&&value!=null;
}


export const    isIphoneX = () => {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&

    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  );
}

export class HeadPadding extends Component{
    render(){
       return(
        <View style={
            {
                flexDirection: 'row',
                height: isIphoneX()?40:Platform.OS==="ios"?20:0,
                backgroundColor: 'white',
            }
        }>

        </View>
       )
    }
}