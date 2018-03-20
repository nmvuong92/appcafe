import React,{Component} from 'react';
import {   
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';


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
import Loading from './../../common/components/Loading';
import * as authAction from './../../actions/authAction';

class Login extends Component{
    constructor(props){
        super(props);

        //
       
        let hide_header = this.props.hide_header!=undefined;
        this.state = {
            CMND: '',
            MatKhau: '',
            hide_header:hide_header,
            message:""
        };

    }
    

    goBack(){
        this.props.onLoginSuccess();
       // const {dispatch,cartReducer} = this.props;
       // dispatch(NavigationActions.back());
    }
  
    componentDidUpdate(){
        /*const {authReducer} = this.props;
        if(authReducer.user!=null){
            this.goBack();
        }*/
    }
    render(){
        const {cartReducer,authReducer,dispatch} = this.props;
        
        let count_cart_notification = cartReducer.count;

       
        

        return (
                <View style={styles.container}>
                {
                    !this.state.hide_header?
                    <Header
                        showBack={true}
                        //leftIcon='angle-left'
                        //leftIconAction={()=>this.goBack()}
                    
                        //rightIcon='trash'
                        //rightIconAction={()=>{}}

                        // rightIcon2='heart'
                        // rightIconAction2={()=>this.goBack()}

                        //showCartBadgeIcon={true}
                        //CartBadgeIconAction={()=>this.goBack()}
                        title={"Đăng nhập"}
                    />:null
                }      
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('./../../assets/images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        onChangeText={(text) => this.setState({CMND:text})}
                        value={this.state.CMND}
                        placeholder='CMND'
                        style={styles.loginInput}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('./../../assets/images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        onChangeText={(text) => this.setState({MatKhau:text})}
                        value={this.state.MatKhau}
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder='Mật khẩu'/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>{
                    dispatch(authAction.postLogin(this.state.CMND,this.state.MatKhau ,(response)=>{
                      
                        this.goBack();
                    },(response)=>{
                      
                    }));
                }}>
                    <Text style={styles.loginText}>Đăng nhập</Text>
                </TouchableOpacity>
               
                
                <View style={styles.registerWrap}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:1}} onPress={()=>{

                    }}>
                        <Text style={{color:'#62a2e0'}}>Quyên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'flex-end',flex:1}} onPress={()=>{

                    }}>
                        <Text style={{color:'#62a2e0'}}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
   
}

const mapStateToProps = state=>({
   navReducer:state.navReducer,
   cartReducer:state.cartReducer,
   authReducer:state.authReducer,
});
//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 17,
    },

    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex:1,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },

    formInput:{
        flexDirection:'row',
        height: 60,
        padding: 20,
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    loginBtn:{
        backgroundColor: '#ff6836',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    loginText:{
        color:'#ffffff',
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});
