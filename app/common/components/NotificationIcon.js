// NotificationIcon.js
import React,{Component} from 'react';
import { Text, Image, View,Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import IconBadge from 'react-native-icon-badge';



class NotificationIcon extends Component {

  render() {
    const { notificaitonReducer } = this.props;
    let notifications= notificaitonReducer.count;
    // below is an example notification icon absolutely positioned 
        return (
        <View style={{
            zIndex: 0,
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'space-around',
            alignItems: 'center'}}>
             <FontAwesome color="black" size={32} name="shopping-cart"/>
        {/* <Image source={require('./../../assets/images/icons/shopping_cart_32.png')}/> */}
        {notifications > 0 ?
            <View style={{
            position: "absolute",
            top: 0,
            right: Platform.OS==="ios"?-20:0,
            borderRadius: 20,
            backgroundColor: 'pink',
            paddingRight:2,
            paddingLeft:2,
          
            zIndex: 2}}>
            <Text style={{fontWeight:'bold'}}>{notifications}</Text>
            </View>
            : undefined}
        </View>
        );
    }
}
/*
const mapStateToProps = state => ({ notifications: state.notifications });
export default connect(mapStateToProps, null)(NotificationIcon);
*/

export default connect((state)=>{
    return {notificaitonReducer} = state;
})(NotificationIcon);