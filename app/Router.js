import React,{Component} from 'react';
import {StackNavigator,TabNavigator,addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import Home from './screens/Home';
import User from './screens/User';
import Detail from './screens/Detail';

import Main from './screens/Main';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Image,Platform} from 'react-native';
import SanPham from './tabs/SanPham';
import KhuyenMai from './tabs/KhuyenMai';
import TaiKhoan from './tabs/TaiKhoan';
import TichDiem from './tabs/TichDiem';

import NotificationIcon from './common/components/NotificationIcon';
import {StatusBar} from 'react-native';

import PropTypes from 'prop-types';
import {addListener} from './redux';
import Login from './screens/Login';
import Logout from './screens/Logout';
export const TabbarStack = TabNavigator({
    Home:{
        screen:Home,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'HOME',
            
            header:null,
            tabBarIcon: <NotificationIcon/>,
        }
    },
    SanPham:{
        screen:SanPham,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            //tabBarLabel:'Sản phẩm',

            header:null,
            tabBarLabel: 'Sản phẩm',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon1_32.png")}/>
        }
    },
    KhuyenMai:{
        screen:KhuyenMai,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            // tabBarLabel:'Khuyến mãi',

            header:null,
            tabBarLabel: 'Khuyến mãi',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon2_32.png")}/>
        }
    },
    TichDiem:{
        screen:TichDiem,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            //tabBarLabel:'Tích điểm',

            //
            header:null,
            tabBarLabel: 'Tích điểm',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon5_32.png")}/>
        }
    },
    TaiKhoan:{
        screen:TaiKhoan,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            //tabBarLabel:'Tài khoản',

            //
            header:null,
            tabBarLabel: 'Tài khoản',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon4_32.png")}/>
        }
    },
},{
   
    initialRouteName: 'TaiKhoan',
    tabBarPosition:'bottom',
    swipeEnabled:true,
    showIcon:true,
    showLabel:true,
    tabBarOptions:{
        style:{
            backgroundColor:"gray",
            
        },
        activeTintColor: '#222',
        activeBackgroundColor :'yellow',  //Doesn't work
        inactiveTintColor:"blue",
        showIcon:true,
        showLabel:true,
        tabStyle: {
            padding: 0, margin:0,  //Padding 0 here
        },
        iconStyle: {
            
            padding:0,
           
        },
        labelStyle:{
            fontSize:10
        },
    },
});

export class TabbarCom extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <TabbarStack />
        );
    }
}
export const MainScreenNavigator = StackNavigator({
    ScreenNotOnTabbar:{
        screen:SanPham,
    },
    ScreenNotOnTabbar2:{
        screen:TichDiem,
    },
    LoginScreen:{
        screen:Login
    },
    LogoutScreen:{
        screen:Logout
    },
    Tabxxx:{
        screen:TabbarCom,
        navigationOptions:{
            header:null,
        }
    },
},{
    initialRouteName:"Tabxxx",
    cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
    }
})

class MainScreenNavigatorState extends Component{
        static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navReducer: PropTypes.object.isRequired,
      };

        render(){
            const {dispatch,navReducer} = this.props;
            return(
                <MainScreenNavigator
                    navigation={addNavigationHelpers({
                        dispatch,
                        state:navReducer,
                        addListener
                    })}
                />
            );
        }
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
});

export default connect(mapStateToProps)(MainScreenNavigatorState);