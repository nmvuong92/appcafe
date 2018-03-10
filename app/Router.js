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

import NotificationIcon from './common/components/NotificationIcon';
import {StatusBar,AppState,View,StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
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

const opt_hide_tabbar={
        tabBarVisible:false,
        //header:null,
   
}

const opt_hide_tabbar2={
    tabBarVisible:false,
    //header:null,

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
        navigationOptions:{
            tabBarVisible:false,
            header:null,
        
        }
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
},{
    navigationOptions:{
        headerStyle:{
            marginTop:24
        }
    }
});


export const MainScreenNavigator = TabNavigator({
    Home:HomeStack,
    NganhHang:{
        screen:NganhHang,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Ngành hàng',
            
            header:null,
            tabBarIcon:  <MaterialIcons color="black" size={32} name="view-comfy"/>
        }
    },
    GioHang:{
        screen:GioHang,
        navigationOptions: {
            showLabel:true,
            showIcon:true,
            tabBarLabel:'Giỏ hàng',
            
            header:null,
            tabBarIcon: <NotificationIcon/>,
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
   
   // initialRouteName: 'Home',
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
        paddingTop:Platform.OS==="ios"?20:0,//StatusBar.currentHeight
    },

});

class MainScreenNavigatorState extends Component{
        static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navReducer: PropTypes.object.isRequired,
      };

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
});

export default connect(mapStateToProps)(MainScreenNavigatorState);