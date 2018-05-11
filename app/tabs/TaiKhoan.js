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
    FlatList,
    Platform,
    TextInput,
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
import DoiMatKhau from './pages/DoiMatKhau';
import * as vUtils  from './../common/vUtils';
import Modal from 'react-native-modalbox';
import Qr from './pages/Qr';
import {getQR,setQR,getQuan} from './../common/Storage';
import {logoutQuan} from './../actions/quanAction';
import {cartCRUD} from './../actions/cartAction';
var DeviceInfo = require('react-native-device-info');
import Camera from 'react-native-camera';
import * as quanAction from './../actions/quanAction';
import {fetchListDMSP} from './../actions/danhMucSanPhamAction';
import {fetchDanhSachDonHangDevice} from './../actions/donHangAction';
import Toast from 'react-native-root-toast';
class TaiKhoan extends Component{
    constructor(props){
        super(props);
        this.state={
            isloading:false,
            dssp:true,
            refreshing:false,
            modalVisible: false,
            DeviceName:"-",
            UniqueID:"-",
            ModelNumber:"-",
            Version:"-",
            BuildNumber:"-",
            QRQuan:null,
            txtIDQuan:"",
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

       var _deviceName = DeviceInfo.getDeviceId();
       var _uniqueID=DeviceInfo.getUniqueID();
       var _ModelNumber=DeviceInfo.getModel();
       var _Version=DeviceInfo.getVersion();
       var _BuildNumber=DeviceInfo.getBuildNumber();
       this.setState({
           DeviceName:_deviceName,
           UniqueID:_uniqueID,
           ModelNumber:_ModelNumber,
           Version:_Version,
           BuildNumber:_BuildNumber
       });
    }

    //bam vao san pham item
    onPressProductItem = (item)=>{
        const {dispatch}  = this.props;
        dispatch({type:"CTArticle_Screen",article_id:item.Id});
    }

    render(){
        const {quanReducer} = this.props;
        return quanReducer.Quan!=null?this._mainRender():this._renderQR();
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
    _logoutQR() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(logoutQuan());
            dispatch(cartCRUD("0"));
        });
    }
    _mainRender(){
        const {authReducer,dispatch,articleReducer} = this.props;
        let isLoggedIn = authReducer.user!=null;//authReducer.isLoggedIn;
        let user = authReducer.user;
        let List = articleReducer.List;
        let Quan = quanReducer.Quan;
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
                    title={Quan!=null?Quan.TenQuan:"Chưa quét QR"}
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

                           <TouchableOpacity style={styles.li}  activeOpacity={0.75} onPress={()=>{
                               this.refs.modal_doimatkhau.open();
                           }}>
                            <Image
                                source={require('./../assets/images/ri.png') }
                                style={{width: 30, height: 30, marginLeft: 20}}
                            />
                            <Text style={{marginLeft: 10}}>
                                Đổi mật khẩu
                            </Text>
                        </TouchableOpacity>
                    </View>

                     :
                    null

                }
            
                {
                    Quan!=null?
                    <View style={styles.info}>
                         <TouchableOpacity
                            style={styles.loginWrap}
                            onPress={this._onPressHead.bind(this)}
                            >
                    
                            <Image style={styles.headIcon}
                                    source={{uri:Quan.ImageThumbnail}}
                            />     
                        </TouchableOpacity>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Tên quán:</Text>
                            <Text style={styles.text2}>{Quan.TenQuan}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Mã quán:</Text>
                            <Text style={styles.text2}>{Quan.Id}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Điện thoại:</Text>
                            <Text style={styles.text2}>{Quan.DienThoai}</Text>
                        </View>      
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Địa chỉ:</Text>
                            <Text style={styles.text2}>{Quan.DiaChi}</Text>
                        </View>              
                    </View> 
                    :null
                }
                     
                {
                    Quan!=null?
                    <View style={styles.info}>
                         <TouchableOpacity
                            style={[commonStyles.btn, {marginBottom:20}]}
                            onPress={() => {
                                this._logoutQR();
                            }}
                            underlayColor={colors.backGray}
                        >
                            <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Rời quán </Text>
                        </TouchableOpacity>               
                    </View> 
                    :null
                }
                <View style={styles.info}>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>qcafe:</Text>
                            <Text style={styles.text2}>phiên bản {Platform.OS === 'ios' ? '2.2' : '8.0'}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Tên thiết bị:</Text>
                            <Text style={styles.text2}>{this.state.DeviceName}</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text1}>Model Number:</Text>
                            <Text style={styles.text2}>{this.state.ModelNumber}</Text>
                        </View>
                        {
                            /*
                             <View style={styles.info_item}>
                                <Text style={styles.text1}>Unique ID:</Text>
                                <Text style={styles.text2}>{this.state.UniqueID}</Text>
                            </View> 
                            */
                        }
                        
                </View> 
                   
        
                {
                    false?
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
                ref={"modal_doimatkhau"}>
                    <View style={{flex:1,}}>
                        <Header
                            leftIcon='angle-left'
                            leftIconAction={()=>{
                                this.refs.modal_doimatkhau.close();
                            }}
                            title={"Đổi mật khẩu"}
                        />
                        <DoiMatKhau hide_header={true} onDoiMatKhauThanhCong={()=>{
                            this.refs.modal_doimatkhau.close();
                        }}/>
                    </View>
               </Modal>


        </View>
        );
    }
    goScanQR(){
        this.refs.modal_qr.open();
    }
    goSeedQR(idquan){
            const {dispatch} =this.props;
            var id_quan=idquan;
            var json_quan={quan:idquan};
            dispatch(quanAction.getById(id_quan,json_quan,()=>{
                dispatch(fetchListDMSP());
                dispatch(cartCRUD("0"));
            },()=>{
                console.log("err");
            }));
    }

    onBarCodeRead = (e) => {
        var json_parsed=vUtils.isValidJson(e.data);
        this.refs.modal_qr.close();
            if(json_parsed!=false){
                const {dispatch} =this.props;
                dispatch(quanAction.getById(json_parsed.quan,json_parsed,()=>{
                    dispatch(fetchListDMSP());
                    dispatch(cartCRUD("0"));
                    dispatch(fetchDanhSachDonHangDevice(1,1000));
                },()=>{
                    console.log("err");
                }));
            }
            else{
                Toast.show("Mã QR không hợp lệ!", {position:Toast.positions.CENTER});
            }
        }
        onChangedIDQuan(text){
            let newText = '';
            let numbers = '0123456789';
            for (var i=0; i < text.length; i++) {
                if(numbers.indexOf(text[i]) > -1 ) {
                    newText = newText + text[i];
                }
            }
            if(!isNaN(newText)&&parseInt(newText)>0){
                this.setState({ txtIDQuan: parseInt(newText) });
            }else{
                this.setState({ txtIDQuan:"" });
            }
        }
    _renderQR(){
        const {quanReducer} = this.props;
        return(
            quanReducer.isFetching?<Loading/>:
            <View style={styles.container}>
                <Header
                    //showBack={true}
                    // leftIcon='angle-left'
                    // leftIconAction={()=>this.goBack()}

                    // rightIcon='address-book'
                    // rightIconAction={()=>this.goBack()}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}

                    title="Đăng nhập"
                />

                   
                        <View style={styles.vInputRow}>
                            <TextInput 
                                style={styles.vInput}
                                keyboardType='numeric'
                                onChangeText={(text)=>this.onChangedIDQuan(text)}
                                placeholder='Nhập số ID quán'   
                                value={isNaN(this.state.txtIDQuan)?"":this.state.txtIDQuan+""}
                                maxLength={5}  //setting limit of input
                            />

                            <TouchableOpacity
                                style={[styles.vBtn,{backgroundColor:"red"}]}
                                onPress={() => {
                                    if(vUtils.isInt(this.state.txtIDQuan)){
                                        this.goSeedQR(this.state.txtIDQuan);
                                    }else{
                                        Toast.show("ID quán không hợp lệ!", {position:Toast.positions.CENTER});
                                    }
                                }}
                                underlayColor={colors.backGray}
                            >
                                <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Vào quán </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.vBtn]}
                                onPress={() => {
                                    this.goScanQR();
                                }}
                                underlayColor={colors.backGray}
                            >
                            <Text style={[{color: colors.white,textAlign:"center"}]}> Quét QR </Text>
                        </TouchableOpacity>
                        </View>
                   
                     
                   
                <Modal ref={"modal_qr"}>
                        <View style={{flex:1,}}>
                            <Header
                                leftIcon='angle-left'
                                leftIconAction={()=>{
                                    this.refs.modal_qr.close();
                                }}
                                title={"Quét QR"}
                            />
                            <Camera
                                style={stylesc.preview}
                                onBarCodeRead={this.onBarCodeRead}
                                ref={cam => this.camera = cam}
                                aspect={Camera.constants.Aspect.fill}
                                >
                                 <Image style={stylesc2.borderImage} source={require("../assets/images/qrbox.png")} />
                                {
                                    this.state.qrcode!=null?
                                    <TouchableOpacity  disabled={donHangReducer.isFetching} style={{backgroundColor:"white",padding:10}} onPress={()=>{
                                            this.postThanhToan();
                                    }}>
                                        <Text style={{fontWeight:"bold"}}>{donHangReducer.isFetching?"Đang gửi thông tin thanh toán...":"Thanh toán ngay"}</Text>
                                        <Text>Shop: {this.state.qrcode.shop}</Text>
                                        <Text>Bàn: {this.state.qrcode.ban}</Text>
                                        <Text>Đ/c: {this.state.qrcode.diachi}</Text>
                                    </TouchableOpacity>
                                    :
                                null
                                }
                            </Camera>
                        </View>
                </Modal> 
            </View>
        );
    }
}
//khong can chia se nen connect rong    
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {
        authReducer,
        navReducer,
        articleReducer,
        quanReducer,
        sanPhamReducer,
        danhMucSanPhamReducer,
        sanPhamReducer} = state;
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
    vInputRow:{
        flexDirection:"row"
    },
    vInput:{
        flex:2,
        borderColor: 'gray', borderWidth: 1,
        height:40
    },
    vBtn:{
        flex:1,
        borderWidth: 1,
        height: 40,
        justifyContent: "center",
        borderColor: colors.blue,
        backgroundColor: colors.blue,
        borderRadius: 0,
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


const stylesc = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    preview: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });

  const stylesc2 = {
    container: {
        flex: 1,
    },

    camera: {
        flex: 1,
        // These below are most important, they center your border view in container
        // ref: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
        alignItems: "center",
        justifyContent: "center"
    },

    borderImage: {
        // Your styles for image, or custom borders
        width:250,
        height:250,
    },
}