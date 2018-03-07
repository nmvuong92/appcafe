import React from 'react';
import {StackNavigator,TabNavigator} from 'react-navigation';

import Home from './screens/Home';
import User from './screens/User';
import Detail from './screens/Detail';

import Main from './screens/Main';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Image} from 'react-native';
import SanPham from './tabs/SanPham';
import KhuyenMai from './tabs/KhuyenMai';
import TaiKhoan from './tabs/TaiKhoan';
import TichDiem from './tabs/TichDiem';

import NotificationIcon from './common/components/NotificationIcon';
export const HomeStack=StackNavigator({
    HomeScreen:{
        screen:Home,
        navigationOptions:{
            header:null,
            tabBarLabel: 'Home',
            tabBarIcon: <NotificationIcon/>,
           // tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/home_32.png")}/>
        }
    },
    DetailScreen:{
        screen:Detail,
        navigationOptions:{
            header:null,
            tabBarLabel: 'Detail',
        }
    }
});

export const UserStack = StackNavigator({
    UserScreen:{
        screen:User,
        navigationOptions:{
            header:null,
            tabBarLabel: 'User',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon2_32.png")}/>
        }
    }
});

export const SanPhamStack = StackNavigator({
    SanphamScreen:{
        screen:SanPham,
        navigationOptions:{
            header:null,
            tabBarLabel: 'Sản phẩm',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon1_32.png")}/>
        }
    }
});

export const KhuyenMaiStack = StackNavigator({
    KhuyenMaiScreen:{
        screen:KhuyenMai,
        navigationOptions:{
            header:null,
            tabBarLabel: 'Khuyến mãi',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon2_32.png")}/>
        }
    }
});

export const TaiKhoanStack = StackNavigator({
    TaiKhoanScreen:{
        screen: TaiKhoan,
        navigationOptions:{
            header:null,
            tabBarLabel: 'Tài khoản',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon4_32.png")}/>
        }
    }
});
export const TichDiemStack = StackNavigator({
    TichDiemScreen:{
        screen:TichDiem,
        navigationOptions:{
            header:null,
            tabBarLabel: 'Tích điểm',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon5_32.png")}/>
        }
    }
});

export const MainStack = StackNavigator({
    MainScreen:{
        screen:Main,
        
        navigationOptions:{
            header:null,
            tabBarLabel: 'Main',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon3_32.png")}/>
        }
    }
},{
    navigationOptions: ({ navigation, screenProps }) => {
    
    }
});



export const Tabbar = TabNavigator({
    Home:{
        screen:HomeStack,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'HOME',
        }
    },
    SanPham:{
        screen:SanPhamStack,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Sản phẩm',
        }
    },
    KhuyenMai:{
        screen:KhuyenMaiStack,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Khuyến mãi',
        }
    },
    TichDiem:{
        screen:TichDiemStack,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Tích điểm',
        }
    },
    TaiKhoan:{
        screen:TaiKhoanStack,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Tài khoản',
        }
    },
},{
    initialRouteName: 'Home',
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
        }
    },
});

