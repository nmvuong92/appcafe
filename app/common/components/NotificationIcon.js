// NotificationIcon.js
import React,{Component} from 'react';
import { Text, Image, View } from 'react-native';
import { connect } from 'react-redux';

class NotificationIcon extends Component {

  render() {
    const { calcReducer } = this.props;
    let notifications= calcReducer.notifications;
    // below is an example notification icon absolutely positioned 
        return (
        <View style={{
            zIndex: 0,
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'space-around',
            alignItems: 'center'}}>
        <Image source={require('./../../assets/images/icons/home_32.png')}/>
        {notifications > 0 ?
            <View style={{
            position: "absolute",
            top: 0,
            right: -20,
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
    return {calcReducer} = state;
})(NotificationIcon);