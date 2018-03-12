import React,{Component} from 'react';
import {View,Text,Button} from 'react-native';


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

import {connect} from 'react-redux';
import { addNavigationHelpers, NavigationActions } from "react-navigation";

import Header from './../../common/components/Header';
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
           
        }
    }
    goBack(){
        const {dispatch,cartReducer} = this.props;
        const { navigate } = this.props.navigation;
        //navigate('LogoutScreen', { name: 'Brent' });
        dispatch(NavigationActions.back());
    }
    render(){
        const {cartReducer} = this.props;
        let count_cart_notification = cartReducer.count;
        return (
            <View>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.goBack()}

                    rightIcon='address-book'
                    rightIconAction={()=>this.goBack()}

                    rightIcon2='heart'
                    rightIconAction2={()=>this.goBack()}


                   

                    title={'资讯详情 '+count_cart_notification}
                />
            </View>
        );
    };
}

const mapStateToProps = state=>({
   navReducer:state.navReducer,
   cartReducer:state.cartReducer,
});
//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(Login);