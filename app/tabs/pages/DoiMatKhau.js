import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
    ScrollView
} from 'react-native';
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import Header from './../../common/components/Header';
import Loading from './../../common/components/Loading';
import {postDoiMatKhau} from './../../actions/authAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class DoiMatKhau extends Component{
    constructor(props){
        super(props);
        let hide_header = this.props.hide_header!=undefined;
        this.state = {
            UserId:'',
            MatKhauHienTai: '',
            MatKhauMoi: '',
            XacNhanMatKhauMoi:'',


            code:'',
            verifyCodeText:"",
            user:{},

            hide_header:hide_header,
            message:"",
        };
        this.timer = null;
        this.timeHit = 0;
       
    }
    componentDidMount(){
        this._getCaptcha();
    }
    _getCaptcha(){
         var text = "";
        //ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        var possible = "0123456789";
        
        for (var i = 0; i < 3; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        this.setState({
            verifyCodeText:text
        });
    }
    goBack(){

        this.props.onDoiMatKhauThanhCong();
        /*const {dispatch,cartReducer} = this.props;
        dispatch(NavigationActions.back());*/
    }
  
    componentDidUpdate(){
       
        /*
        const {authReducer} = this.props;
        if(authReducer.user!=null){
            this.goBack();
        }

        */
    }
    render(){
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
                    title={"Đổi mật khẩu"}
                    />
                    :null
            }
              


                 <KeyboardAwareScrollView>
                        <View>
                            <View style={[styles.formInput, styles.formInputSplit]}>
                                <Image source={require('./../../assets/images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput
                                onChangeText={(text) => this.setState({MatKhauHienTai:text})}
                                value={this.state.MatKhauHienTai}
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    placeholder='Mật khẩu hiện tại'/>
                            </View>
                            <View style={[styles.formInput, styles.formInputSplit]}>
                                <Image source={require('./../../assets/images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput
                                onChangeText={(text) => this.setState({MatKhauMoi:text})}
                                value={this.state.MatKhauMoi}
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    placeholder='Mật khẩu mới'/>
                            </View>
                            <View style={[styles.formInput, styles.formInputSplit]}>
                                <Image source={require('./../../assets/images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput
                                onChangeText={(text) => this.setState({XacNhanMatKhauMoi:text})}
                                value={this.state.XacNhanMatKhauMoi}
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    placeholder='Xác nhận Mật khẩu mới'/>
                            </View>
                        
                            
                            <TouchableOpacity style={styles.registerBtn} onPress={this._register.bind(this)}>
                                <Text style={styles.registerText}>Đổi mật khẩu</Text>
                            </TouchableOpacity>

                        </View>
                </KeyboardAwareScrollView>
            </View>
        );
    };

    
    _onChangeMobile(text) {
        this.state.mobile = text;
        // this.setState({'mobile': text});
    }

    _onChangePassword(text){
        this.state.password = text;
        // this.setState({'password': text});
    }

    _onChangeCode(text){
        this.state.code = text;
        // this.setState({'code': text});
    }

    _sendVerifyCode(){
       
    };

    _register(){
        InteractionManager.runAfterInteractions(() => {
            const {dispatch,authReducer} = this.props;
            dispatch(postDoiMatKhau({
                UserId:authReducer.user.UserId,
                MatKhauHienTai:this.state.MatKhauHienTai,
                MatKhauMoi:this.state.MatKhauMoi,
                XacNhanMatKhauMoi:this.state.XacNhanMatKhauMoi,
            },(res)=>{
                this.goBack();
            },(err)=>{}));
        });
    };
}

const mapStateToProps = state=>({
    navReducer:state.navReducer,
    cartReducer:state.cartReducer,
    authReducer:state.authReducer,
 });
 //khong can chia se nen connect rong
 //khi ma exprt connect ==> co 1 bien dispatch
 export default connect(mapStateToProps)(DoiMatKhau);


 
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

    verifyCodeBtn: {
        backgroundColor: '#c5523f',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:'center',
        width: 80,
        height: 30,
        borderRadius: 2,
    },
    verifyCodeText: {
        color: '#ffffff',
    },

    registerBtn:{
        backgroundColor: '#ff6836',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    registerText:{
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
