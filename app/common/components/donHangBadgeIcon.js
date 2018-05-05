
import React,{Component} from 'react';
import { Text, Image, View,Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class DonHangBadgeIcon extends Component {
  render() {
    const { donHangReducer } = this.props;
    //đếm
    let total= donHangReducer.SoLuongDonHangChuaThanhToan;
   
    // below is an example notification icon absolutely positioned 
        return (
        <View style={{
            zIndex: 0,
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'space-around',
            alignItems: 'center',
            position:'relative',}}>
            <MaterialIcons color="black" size={28} name="playlist-add-check"/>
        {/* <Image source={require('./../../assets/images/icons/shopping_cart_32.png')}/> */}
        {total > 0 ?
            <View style={{
            position: "absolute",
            top: 0,
            right: Platform.OS==="ios"?20:0,
            borderRadius: 10,
            backgroundColor: 'red',
            paddingRight:3,
            paddingLeft:3,
          
            zIndex: 2}}>
            <Text style={{color:"white",fontSize:10}}>{total}</Text>
            </View>
            : undefined}
        </View>
        );
    }
}

const mapStateToProps = state=>({
    authReducer:state.authReducer,
    donHangReducer:state.donHangReducer,
});


//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(DonHangBadgeIcon);
