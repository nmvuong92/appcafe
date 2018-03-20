import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    ScrollView,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    InteractionManager,
    ImageBackground,
    FlatList
} from 'react-native';
import {Avatar,Card,Button,Divider} from 'react-native-elements';
import Loading from './../common/components/Loading';
import {connect} from 'react-redux';
import { HeadPadding } from '../common/vUtils';

import {window} from './../common/constants';
import commonStyles,{colors} from './../common/commonStyles';
import ImageButton from './../common/ImageButton';
import TextButton from './../common/TextButton';
import {logout} from './../actions/authAction';
import {formatVND} from './../common/vUtils';
import donHangBadgeIcon from './../common/components/donHangBadgeIcon';
import cartBadgeIcon from './../common/components/cartBadgeIcon';
import {fetchArticles} from './../actions/articleAction';
import Header from './../common/components/Header';
import Register from './pages/Register';
import Login from './pages/Login';


import Modal from 'react-native-modalbox';

class TaiKhoan extends Component{
    constructor(props){
        super(props);
        this.state={
            isloading:false,
            dssp:true,
            refreshing:false,
            modalVisible: false,
        }

        //setTimeout(() => {this.setState({isloading: false})}, 1000)
    }
   
    //pull refresh
    handleRefresh=()=>{  
        //scrolltop
        this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});

        const {articleReducer,dispatch} =this.props;
        this.setState({
            refreshing:articleReducer.isFetching,
            seed:this.state.seed+1,
        },()=>{
            const {authReducer} =this.props;
            if(authReducer.user!=null){
                dispatch(fetchArticles());
            }
        });
    }

    onEndReached = () => {
        
    }
    componentDidMount(){
        const {dispatch} = this.props; 
       dispatch(fetchArticles());
    }

    //bam vao san pham item
    onPressProductItem = (item)=>{
        const {dispatch}  = this.props;
        dispatch({type:"CTArticle_Screen",Article:item});
    }

    render(){
        const {authReducer,dispatch,articleReducer} = this.props;
        let isLoggedIn = authReducer.user!=null;//authReducer.isLoggedIn;
        let user = authReducer.user;
        let List = articleReducer.List;
        return (
         
            <View style={styles.container}>

               <Header
                    //showBack={true}
                    //leftIcon='angle-left'
                    //leftIconAction={()=>this.goBack()}
                   
                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}

                    //showCartBadgeIcon={true}
                    //CartBadgeIconAction={()=>this.goBack()}
                    title={"Tài khoản"}
                />
            <ScrollView style={{
                backgroundColor: 'rgba(240,240,240,0.9)'
            }}>
                {
                    isLoggedIn?   
                    <View>
                        <ImageBackground style={styles.myBgImage} source={require('./../assets/images/img_my_bg.png')}>
                        <TouchableOpacity
                            style={styles.loginWrap}
                            onPress={this._onPressHead.bind(this)}
                        >
                    
                            <Image style={styles.headIcon} source={require('./../assets/images/img_default_head.png')}/> 
                            <Text style={styles.login}>{user.HoTen}</Text>
                        
                        </TouchableOpacity>
                        </ImageBackground>
                        <View style={{padding: 15,flex: 1,flexDirection: 'row',justifyContent: 'center',backgroundColor: 'white'}}>
                            <TextButton onPress={() => {
                                } }
                                text={'Điểm tích lũy'}
                                upText={formatVND(user.DiemTichLuy)}
                            />
                        </View> 
                        <TouchableOpacity style={styles.li}  activeOpacity={0.75}>
                        <Image
                            source={require('./../assets/images/ri.png') }
                            style={{width: 30, height: 30, marginLeft: 20}}
                        />
                        <Text style={{marginLeft: 10}}>
                            Cập nhật thông tin tài khoản
                        </Text>
                    
                    </TouchableOpacity>
                    </View>

                     :
                    null

                }
            
                


              

              
             
                 

                 {
                     List!=null?
                     List.map((item,index)=>{
                         return (
                            <TouchableOpacity style={styles.li}  activeOpacity={0.75} key={item.Id} onPress={()=>{
                                this.onPressProductItem(item);
                            }}>
                                <Image
                                    source={{uri:item.ImageThumbnail}}
                                    style={{width: 30, height: 30, marginLeft: 20}}
                                />
                                <Text style={{marginLeft: 10}}>
                                    {item.Title}
                                </Text>
                            </TouchableOpacity>
                         )
                     })
                     :null
                 }
                

                {
                    isLoggedIn?
                    <View>
                        <View style={styles.info}>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Họ và tên:</Text>
                            <Text style={styles.text2}>{user.HoTen}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>CMND:</Text>
                            <Text style={styles.text2}>{user.CMND}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Địa chỉ:</Text>
                            <Text style={styles.text2}>{user.DiaChi}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Điện thoại:</Text>
                            <Text style={styles.text2}>{user.DienThoai}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Email:</Text>
                            <Text style={styles.text2}>{user.Email}</Text>
                        </View>
                    </View>

                      <TouchableOpacity
                        style={[commonStyles.btn, {marginBottom:20}]}
                        onPress={() => {
                            Alert.alert(
                                "Bạn chắc chắn muốn đăng xuất?",
                                "",
                                [
                                    {text:"Đăng xuất", onPress:()=>{this._logout()}},
                                    {text:"Hủy bỏ", onPress:()=>{}},
                                ]
                            );
                        }}
                        underlayColor={colors.backGray}
                    >
                        <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Đăng xuất </Text>
                    </TouchableOpacity>
                    </View>
                    
                :null

                }

               
            {
                !isLoggedIn?
                <View style={styles.container}>
                <HeadPadding/>
                <TouchableOpacity
                    style={[commonStyles.btn, {marginBottom:20}]}
                    onPress={() => {
                        this.refs.modal_register.open();
                       // dispatch({type:'RegisterScreen'});
                    }}
                    underlayColor={colors.backGray}
                >
                    <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Đăng ký </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[commonStyles.btn, {marginBottom:20}]}
                    onPress={() => {
                        this.refs.modal_login.open();
                       // this.setState({modalVisible: !this.state.modalVisible});
                        //dispatch({type:'LoginScreen'});
                    }}
                    underlayColor={colors.backGray}
                >
                    <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Đăng nhập </Text>
                </TouchableOpacity>
            </View>
            :null
            }

              
            </ScrollView>

   


            
            <Modal
                ref={"modal_login"}>
                    <View style={{flex:1,}}>
                        <Header
                            leftIcon='angle-left'
                            leftIconAction={()=>{
                                this.refs.modal_login.close();
                            }}
                            title={"Đăng nhập"}
                        />
                        <Login hide_header={true} onLoginSuccess={()=>{
                            this.refs.modal_login.close();
                        }}/>
                    </View>
                </Modal>

                <Modal
                ref={"modal_register"}>
                    <View style={{flex:1,}}>
                        <Header
                            leftIcon='angle-left'
                            leftIconAction={()=>{
                                this.refs.modal_register.close();
                            }}
                            title={"Đăng ký"}
                        />
                        <Register hide_header={true} onRegisterSuccess={()=>{
                            this.refs.modal_register.close();
                        }}/>
                    </View>
               </Modal>


        </View>
        );
    }

    _onPressHead() {
     
    }
    _onLoginSuccess() {
        this.setState({modalVisible: !this.state.modalVisible});
    }
    _logout() {
        InteractionManager.runAfterInteractions(() => {
            const {authReducer,dispatch} = this.props;
            dispatch(logout());
        });
    }

}
//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {authReducer,navReducer,articleReducer} = state;
})(TaiKhoan);



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
        fontSize: 16,
    },

    myBgImage: {
        flex: 1,
        width: window.width,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headIcon: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    loginWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        borderColor: 'white',
        color: 'white',
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
        borderRadius: 3,
    },
    info:{
        marginTop:5,
        marginBottom:5,
    },
    info_item:{
        backgroundColor:"white",
        marginBottom:5,
        marginLeft:5,
        marginRight:5,
        padding:5,
        borderRadius:5
    },
    text2:{
        fontWeight:"bold",
    },
    li:{
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        position: 'relative',
        backgroundColor: 'white'
                
    }
});
