import React,{Component} from 'react';
import {View,StyleSheet,Dimensions, Platform } from 'react-native';
export const formatVND = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
}

export const vStyles = StyleSheet.create({
    h1:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        color:"red"
    },
    price:{
        fontSize:30,
        fontWeight: 'bold',
    }
});



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