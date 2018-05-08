import React,{Component} from 'react';
import {
    View,Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    FlatList,
    InteractionManager,
    Animated,
    Platform} from 'react-native';
import {window} from './../common/constants';
import NganhHangPage from './pages/NganhHangPage';
import {connect} from 'react-redux';
import {fetchListDMSP} from './../actions/danhMucSanPhamAction';
import Loading from './../common/components/Loading';
import commonStyles,{colors} from './../common/commonStyles';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';

import {fetchSanPham,setDSSP} from './../actions/sanPhamAction';
import Header from './../common/components/Header';
import{NavigationActions} from 'react-navigation';
import {VCOLOR} from './../common/constants';

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
import Modal from 'react-native-modalbox';

import {getQR,setQR,getQuan} from './../common/Storage';
import { Button } from 'react-native-elements'
import Camera from 'react-native-camera';
import * as vUtils  from './../common/vUtils';
import Toast from 'react-native-root-toast';
import * as quanAction from './../actions/quanAction';
import {cartCRUD} from './../actions/cartAction';
import {fetchDanhSachDonHangDevice} from './../actions/donHangAction';
class NganhHang extends Component{
    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
          selectedCat1ID:-1,
          selectedCat2ID:-1,
          appIsReady: false,
          dataDMSP:[],
          page:1,
          pageSize:100,
          QRQuan:null,
          txtIDQuan:"",
        };
    }

     
    goBack(){
        const {dispatch} = this.props;       
        dispatch(NavigationActions.back());
    }

    componentDidMount(){
        const {dispatch} =this.props;
        //lay dssp
        dispatch(fetchListDMSP());
        this._getQR();
    };
    _getQR(){
        getQR().then((qr)=>{
            this.setState({
                QRQuan:qr
            });
        });
    }

    onPressAllItem = ()=>{
        const {navReducer,dispatch,sanPhamReducer}  = this.props;
        //dispatch({type:"goBack",dataBack:"123"});
        dispatch({type:"SanPham_Screen"});
        //lay dsspxx
        dispatch(fetchSanPham(null,sanPhamReducer.tukhoa,1,this.state.pageSize));
    }

    onPressItem = (item)=>{
        const {navReducer,dispatch,sanPhamReducer}  = this.props;
       // dispatch({type:"goBack",dataBack:"123"});
        dispatch({type:"SanPham_Screen"});
        //lay dssp
        dispatch(setDSSP(item,item.DSSP));
        //dispatch(fetchSanPham(item,sanPhamReducer.tukhoa,1,this.state.pageSize));
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


    refresh(){
        const {dispatch} =this.props;
       
        dispatch(fetchListDMSP());
        
    }
    render(){
        const {quanReducer} = this.props;
        return quanReducer.Quan!=null?this._mainRender():this._renderQR();
    }
    _mainRender(){
        const {danhMucSanPhamReducer} = this.props;
        return (
            danhMucSanPhamReducer.isFetching?<Loading/>:
            <View>
                <Header
                    //showBack={true}
                    // leftIcon='angle-left'
                    // leftIconAction={()=>this.goBack()}

                    rightIcon='refresh'
                    rightIconAction={()=>this.refresh()}
                    title="Chọn danh mục sản phẩm"
                />
                {/* <FontAwesome.Button  name="th-list" style={{alignContent:"center",justifyContent:"center",alignItems:"center"}} alignItems="center" backgroundColor="#3b5998" borderRadius={0} onPress={()=>{
                    this.onPressAllItem();
                }}>
                    Tất cả danh mục sản phẩm
                </FontAwesome.Button> */}
                <FlatList
                    data={danhMucSanPhamReducer.data}
                    renderItem={({item}) =>
                        <TouchableOpacity key={item.ID} onPress={()=>{
                            this.onPressItem(item);
                        }} style={styles.productItem}>
                            <Image 
                                source={{ uri: item.HinhAnh }} 
                                indicator={ProgressBar} 
                                style={styles.itemImage}/>
                            <Text>{item.TenDanhMuc}</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item,index) => item.ID+""}
                    numColumns={2}
                    contentContainerStyle={{paddingBottom:150}}
                />
            </View>
        );
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
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    danhMucSanPhamReducer:state.danhMucSanPhamReducer,
    sanPhamReducer:state.sanPhamReducer,
    quanReducer:state.quanReducer
});

export default connect(mapStateToProps)(NganhHang);

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    productItem:{
        alignItems: 'center',
       
        borderColor:VCOLOR.xam,
        borderWidth:1,
        margin: 2,
        borderRadius:5,
        width:'49%'
        
    },
    itemImage:{
        width: "95%",
        height: 125,
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});

const stylesc = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  });