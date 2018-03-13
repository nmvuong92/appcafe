import React,{Component} from 'react';
import {StackNavigator,TabNavigator,addNavigationHelpers,NavigationActions} from 'react-navigation';

import {connect} from 'react-redux';
import Home from './tabs/Home';
import Detail from './tabs/pages/Detail';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Image,Platform,Button,BackHandler} from 'react-native';
import SanPham from './tabs/SanPham';
import KhuyenMai from './tabs/KhuyenMai';
import TaiKhoan from './tabs/TaiKhoan';
import TichDiem from './tabs/TichDiem';
import NganhHang from './tabs/NganhHang';
import GioHang from './tabs/GioHang';
import Register from './tabs/pages/Register';

import CartBadgeIcon from './common/components/cartBadgeIcon';
import {StatusBar,AppState,View,StyleSheet} from 'react-native';


import {addListener} from './redux';
import Login from './tabs/pages/Login';
import Logout from './tabs/pages/Logout';

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
import ChiTietSanPham from './tabs/ChiTietSanPham';

import{cartCRUD} from './actions/cartAction';
import {isIphoneX} from './common/vUtils';

const opt_hide_tabbar={
    tabBarVisible:false,
    header:null,
   // swipeEnabled:false

}

const opt_hide_tabbar2={
    tabBarVisible:false,
    header:null,
   // swipeEnabled:false

}
const HomeStack  = StackNavigator({
    Home:{
        screen:Home,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Trang chủ',
            
            header:null,
            tabBarIcon:  <FontAwesome color="black" size={32} name="home"/>,
           
        }
    },
    Detail:{
        screen:Detail,
        navigationOptions:opt_hide_tabbar
    },
    RegisterScreen:{
        screen:Register,
        navigationOptions:opt_hide_tabbar
    },
    LoginScreen:{
        screen:Login,
        navigationOptions:opt_hide_tabbar
    },
    ScreenNotOnTabbar:{
        screen:SanPham,
        navigationOptions:opt_hide_tabbar
    },
    ScreenNotOnTabbar2:{
        screen:TichDiem,
        navigationOptions:opt_hide_tabbar
    },
    KhuyenMaiScreen:{
        screen:KhuyenMai,
        navigationOptions:opt_hide_tabbar
       /* navigationOptions: {
            showLabel:true,
            showIcon:true,
            // tabBarLabel:'Khuyến mãi',

            header:null,
            tabBarLabel: 'Khuyến mãi',
            tabBarIcon: <Image style={{width: 32, height: 32}} source={require("./assets/images/icons/icon2_32.png")}/>
        }*/
    },
    LogoutScreen:{
        screen:Logout
    },
    TichDiemScreen:{
        screen:TichDiem,
        navigationOptions:opt_hide_tabbar
    },
    NganhHangScreen:{
        screen:NganhHang,
        navigationOptions:opt_hide_tabbar
    },
    Home_ChitietSanPham_Screen:{
        screen:ChiTietSanPham,
        navigationOptions:opt_hide_tabbar
    },
},{
    navigationOptions:{
        headerStyle:{
            marginTop:24
        }
    }
});


const ChiTietSanPhamStack  = StackNavigator({
    ChiTietSanPhamScreen:{
        screen:ChiTietSanPham,
        navigationOptions: opt_hide_tabbar2
        
    },
    ChiTietSanPham_GioHang_Screen:{
        screen:GioHang,
        navigationOptions:opt_hide_tabbar2
    },
},{
    navigationOptions:{
      
        headerStyle:{
            //marginTop:24
        }
    }
});


const SanPhamStack  = StackNavigator({
    SanPham:{
        screen:SanPham,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Sản phẩm',
            
            header:null,
            tabBarIcon:   <MaterialIcons color="black" size={32} name="view-comfy"/>,
        },
        
    },
    SanPham_NganhHang_Screen:{
        screen:NganhHang,
        navigationOptions:opt_hide_tabbar
    },
    SanPham_ChitietSanPham_Screen:ChiTietSanPhamStack,
},{
    navigationOptions:{
      
        headerStyle:{
            //marginTop:24
        }
    }
});




export const MainScreenNavigator = TabNavigator({
    Home:HomeStack,
    SanPham:SanPhamStack,
    GioHang:{
        screen:GioHang,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Giỏ hàng',
            
            header:null,
            tabBarIcon: <CartBadgeIcon/>,
        }
    },
    /*SanPham:{
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
    },*/
    TaiKhoan:{
        screen:TaiKhoan,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            //tabBarLabel:'Tài khoản',

            //
            header:null,
            tabBarLabel: 'Tài khoản',
            tabBarIcon:  <FontAwesome color="black" size={32} name="user"/>
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
            backgroundColor:"white",
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
            fontSize:12
        },
      

    },
   
    cardStyle:{
       // paddingTop:isIphoneX()?100:Platform.OS==="ios"?20:0,//StatusBar.currentHeight
    },

});

class MainScreenNavigatorState extends Component{
   

       constructor(props){  
           super(props);
           //
           this.state={
                appState: AppState.currentState
           }
       }

        //Handling the Hardware Back Button in Android
        componentDidMount() {
            console.log("---------componentDidMount");
            //setup first setting

            /*const {dispatch,navReducer} = this.props;
            dispatch({type:'KhuyenMaiScreen'});*/
            const {dispatch} = this.props;
            dispatch(cartCRUD("sync"));


            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

            //
            AppState.addEventListener('change', this._handleAppStateChange);
        }
        componentWillUnmount() {
            console.log("---------componentWillUnmount");
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
            //
            AppState.removeEventListener('change', this._handleAppStateChange);
        }

         _handleAppStateChange = (nextAppState) => {
                if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
                    console.log('1.--------------------App has come to the foreground!')

                }
                console.log("2.-----------------"+nextAppState);
                this.setState({appState: nextAppState});
        }

          

        onBackPress = () => {
            const { dispatch, navReducer } = this.props;
            if (navReducer.index === 0) {
                return false;
            }
            dispatch(NavigationActions.back());
            return true;
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
    cardReducer:state.cardReducer,
});

export default connect(mapStateToProps)(MainScreenNavigatorState);