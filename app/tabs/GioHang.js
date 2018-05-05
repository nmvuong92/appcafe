import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,TextInput,Modal as ReactNativeModal,SafeAreaView,Alert} from 'react-native';
import GioHangPage from './pages/GioHangPage';
import DSSP from './pages/DSSP';
import { SearchBar,Badge } from 'react-native-elements';
import {VCOLOR} from './../common/constants';
import {connect} from 'react-redux';
import {fetchSanPham} from './../actions/sanPhamAction';
import {cartCRUD} from './../actions/cartAction';
import Loading from './../common/components/Loading';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';
import { Button, ButtonGroup} from 'react-native-elements'
import Toast from 'react-native-root-toast';

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
import Icon from 'react-native-vector-icons/Ionicons';
import Header from'./../common/components/Header';
import * as vUtils  from './../common/vUtils';
import Modal from 'react-native-modalbox';
import Camera from 'react-native-camera';

import {postThanhToanDatHang,fetchDanhSachDonHangDevice} from './../actions/donHangAction';
class GioHang extends Component{
    constructor(props){
       
        super(props);

        const { params } = this.props.navigation.state;

        var thanhtoan_nav=(vUtils.checkNotNullNotUndefined(params)&&vUtils.checkNotNullNotUndefined(params.thanhtoan_nav))?params.thanhtoan_nav:"GioHang_ThanhToanForm_Screen";
        var cart_ctsp_nav=(vUtils.checkNotNullNotUndefined(params)&&vUtils.checkNotNullNotUndefined(params.cart_ctsp_nav))?params.cart_ctsp_nav:"GioHang_ChiTietSanPham_Screen";
        this.state={
            thanhtoan_nav:thanhtoan_nav,
            cart_ctsp_nav:cart_ctsp_nav,

            appIsReady:false,
            showBtnTimKiem:false,
            data:[],
            searchClearIcon: false,
            tukhoa:"",

            loading:false,
            seed:1,
            error:null,
            refreshing:false,
            refreshing2:false,
            page:0,
            page_size:10,
            modalVisible: false,

            itemEdit:null,
            slspEdit:0,

            qrcode: null,
            chonbantype:1, //1: chon ban, 2: q2r
            askQR:false,
            Ban:"",//nhập bàn
        }
       
    }
   
    componentDidMount(){
        const {sanPhamReducer,cartReducer,dispatch} =this.props;
        dispatch(cartCRUD("sync"));
        //lay dssp
        //dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa));
    }
    goThanhToan(){
        //const {dispatch} =this.props;
        this.refs.modal_qr.open();
        //dispatch({type:'tichDiem_Wrap'});
        /*dispatch({
            type:this.state.thanhtoan_nav
        });*/
    }
    
    //khi thay doi o tim kiem
    _onChangeSearchText = (searchText) => {
       
        if (searchText) {
            this.setState({searchClearIcon: true,showBtnTimKiem:true})
        } else {
             this.setState({searchClearIcon: false,showBtnTimKiem:false})
        }
        this.setState({
            tukhoa:searchText
        });
    }

    //bam vao san pham item
    _goCTSP = (item)=>{
        const {navReducer,dispatch}  = this.props;
        dispatch({type:this.state.cart_ctsp_nav,id:item.ID});
    }

    //bam vao nut tim kiem
    onPressTimKiem = () => {

        const {sanPhamReducer,dispatch} = this.props;
        // dispatch();
        console.log(this.state.tukhoa);
        dispatch(fetchSanPham(sanPhamReducer.danhmuc,this.state.tukhoa));
    
    }
    //hien thi chon danh muc san pham
    onPressSelectDM = () => {
        const {dispatch} = this.props;
        dispatch({type:'SanPham_NganhHang_Screen'});
    }
    //hien thi btn tim kiem
    _renderBtnTimKiem(){
        if(this.state.showBtnTimKiem){
            return (
                <TouchableOpacity onPress={this.onPressTimKiem}>
                         <Text>Tìm kiếm</Text>
                 </TouchableOpacity>
            );
        }
        return null;
    }
    //pull refresh
    handleRefresh=()=>{  
       const {sanPhamReducer,dispatch} =this.props;
        this.setState({
            page:1,
            data:[],
            refreshing:sanPhamReducer.isFetching,
            seed:this.state.seed+1,
        },()=>{
            dispatch(fetchDanhSachDonHangDevice(1,10));
            //lay dssp
            dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa));
        });
    }
    //
    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
          this.handleLoadMore();
          this.onEndReachedCalledDuringMomentum = true;
        }
    }
    handleLoadMore=()=>{
        const {sanPhamReducer,dispatch} =this.props;
        this.setState({
            page:this.state.page+1,
        },()=>{
            //dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa));
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    showEditSLSP=(item)=>{
        this.setState({
            itemEdit:item,
            slspEdit:item.SLSP,
        });
        this.refs.modal3.open();
    }

    postThanhToan = (Ban)=>{
        const {dispatch,authReducer,quanReducer}  = this.props;
       
        var cart = [];
        for(var i=0;i<cartReducer.cartItems.length;i++){
            cart.push({
                SanPhamId:cartReducer.cartItems[i].ID,
                ThucDonId:cartReducer.cartItems[i].ThucDonId,
                SoLuong:cartReducer.cartItems[i].SLSP,
            });
        }
        dispatch(postThanhToanDatHang(authReducer.user,{
            Ban:Ban,
            QuanId:quanReducer.Quan.Id,
            ChiTietDonHang:cart
        },()=>{
            //lay ds don hang

            //dong modal
            this.refs.modal_qr.close();
        }));
    }
    hoiThanhtoan(){
        
        if (vUtils.isInt(this.state.Ban)){
            Alert.alert(
                "Thanh toán (bàn: "+this.state.Ban+")?",
                "",
                [
                    {text:"Hủy bỏ", onPress:()=>{}},
                    {text:"Thanh toán", onPress:()=>{this.postThanhToan(this.state.Ban)}},
                ]
            );
        }
        else{
            Toast.show("Vui lòng nhập bàn!", {position:Toast.positions.TOP});
        }
    }
    //
    render(){
        const {navReducer}=this.props;
       // console.log(navReducer);
        const {dispatch,sanPhamReducer,cartReducer} = this.props;

      
        var tong_tien_gio_hang  =0;

        for(let i=0;i<cartReducer.cartItems.length;i++){
            tong_tien_gio_hang+=cartReducer.cartItems[i].SLSP*cartReducer.cartItems[i].Gia;
        }

        const {authReducer,donHangReducer,quanReducer} =this.props;
        let isLoggedIn = authReducer.user!=null;
        let slsp=cartReducer.cartItems.length;
        return (
     
            sanPhamReducer.isFetching?<Loading/>:
            <View style={styles.container}>
                <Header
                    showBack={true}
                    //leftIcon='angle-left'
                    //leftIconAction={()=>this.goBack()}
                   
                     rightIcon='trash'
                     rightIconAction={()=>{
                        const {cartReducer,dispatch} =this.props;
                        dispatch(cartCRUD("0"));
                     }}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}

                    //showCartBadgeIcon={true}
                    //CartBadgeIconAction={()=>this.goBack()}
                    title={cartReducer.cartItems.length+" sản phẩm"}
                />
                 <View style={{flex:1}}>
                        <FlatList
                            data={cartReducer.cartItems}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={()=>{
                                    //this._goCTSP(item);
                                    this.showEditSLSP(item);
                                }}>
                                    <View key={item.ID} style={styles2.containerStyle}>
                                        <Image 
                                            source={{ uri: item.HinhAnh }} 
                                            indicator={ProgressBar} 
                                            style={styles2.imageStyle}/>

                                            <View style={styles2.textStyle}>
                                                <Text style={{ color: '#2e2f30' }}>{item.TenSanPham}</Text>
                                                <View style={styles2.priceStyle}>
                                                <Text style={{ color: '#2e2f30', fontSize: 12 }}>{vUtils.formatVND(item.Gia)}</Text>
                                                {
                                                    item.SLSP>1?
                                                    <Text style={{ color:VCOLOR.blue, fontSize: 12 }}>{vUtils.formatVND(item.Gia*item.SLSP)}</Text>
                                                    :null
                                                }
                                               
                                                </View>
                                            </View>

                                            <View style={styles2.counterStyle}>
                                                <TouchableOpacity onPress={()=>{
                                                    this.showEditSLSP(item);
                                                }}>
                                                        <Badge containerStyle={{ backgroundColor: 'violet'}}>
                                                            <Text>{item.SLSP}</Text>
                                                        </Badge>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item,index) => item.ThucDonId+""}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}  

                            onEndReached={this.onEndReached} 
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            contentContainerStyle={{paddingBottom:150}}
                        />
                 </View>
                            
               
                 <View style={styles.footer}>
                        <View style={{flex:2,alignItems:"center"}}>
                            <Text>Tổng tiền:</Text>
                            <Text style={{fontSize:20,fontWeight:"bold",color:VCOLOR.do_dam}}>{vUtils.formatVND(tong_tien_gio_hang)}</Text>
                        </View>
                        <View style={{flex:3,width:"100%",padding:0}}>
                            <Button
                                buttonStyle={{
                                    backgroundColor: VCOLOR.do_dam,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 0,                                    
                                }}
                                backgroundColor="red"
                                color="white"
                                icon={{name: 'opencart', type: 'font-awesome'}}
                                title={'Chọn bàn'}
                                onPress={()=>{
                                    if(quanReducer.Quan==null){
                                        Toast.show("Chưa đăng nhập quán bằng QR!", {position:Toast.positions.CENTER});
                                        return;
                                    }
                                    if(cartReducer.cartItems.length==0){
                                        Toast.show("Vui lòng thêm sản phẩm!", {position:Toast.positions.CENTER});
                                        return;
                                    }
                                    this.setState({
                                        askQR:true
                                    });
                                    this.goThanhToan();
                                }}
                            />
                        </View>
                  </View>
         
                 <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                        {
                            this.state.itemEdit!=null?
                            <View style={{flex:1,alignContent:"center",alignItems:"center"}}>
                                <Text>{this.state.itemEdit.TenSanPham}</Text>
                                <View style={styles2.counterStyle}>
                                        <Icon.Button 
                                        name="ios-remove" 
                                        size={30} 
                                        color='#fff' 
                                        backgroundColor='#fff' 
                                        style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }} 
                                        iconStyle={{ marginRight: 0 }}
                                        onPress={()=>{
                                            if(this.state.slspEdit==""){
                                                this.setState({
                                                    slspEdit:0,
                                                });
                                            }
                                            if(this.state.slspEdit-1>0){
                                                

                                                this.setState({
                                                    slspEdit:this.state.slspEdit-1,
                                                    });
                                            }
                                        }}
                                        />
                                        <TextInput 
                                        style={styles.vInput}
                                        keyboardType='numeric'
                                        onChangeText={(text)=>this.onChanged(text)}
                                        placeholder='Nhập số lượng'   
                                        value={isNaN(this.state.slspEdit)?"":this.state.slspEdit+""}
                                        maxLength={10}  //setting limit of input
                                        />
                                        <Icon.Button 
                                        name="ios-add" 
                                        size={30} 
                                        color='#fff' 
                                        backgroundColor='#fff' 
                                        style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }} 
                                        iconStyle={{ marginRight: 0 }}
                                        onPress={()=>{
                                            if(this.state.slspEdit==""){
                                                this.setState({
                                                    slspEdit:0,
                                                });
                                            }
                                            if(this.state.slspEdit+1<1000000){
                                                this.setState({
                                                    slspEdit:this.state.slspEdit+1,
                                                    });
                                            }
                                        }}/>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Ionicons.Button name="md-arrow-round-back" backgroundColor={VCOLOR.xam} borderRadius={0} onPress={()=>{
                                                    this.refs.modal3.close();
                                            }}/>
                                            <MaterialIcons.Button color={VCOLOR.red} name="delete-forever" backgroundColor={VCOLOR.xam} borderRadius={0} onPress={()=>{
                                                    dispatch(cartCRUD("x",this.state.itemEdit,1));
                                                    this.refs.modal3.close();
                                            }}/>
                                            <FontAwesome.Button color={VCOLOR.green} name="check" backgroundColor={VCOLOR.xam} borderRadius={0}  onPress={() => {
                                                if(this.state.slspEdit!=NaN){
                                                    dispatch(cartCRUD("=",this.state.itemEdit,this.state.slspEdit));
                                                }
                                                this.refs.modal3.close();
                                            }}>
                                                <Text style={{fontFamily: 'Arial', fontSize: 15}}></Text>
                                            </FontAwesome.Button>
                                    </View>
                            </View>
                            :null
                        }
                  </Modal>
             
                  
                <Modal
                    style={[styles.modal, styles.modal_qr]} position={"center"} 
                    ref={"modal_qr"}>
                        <View style={{flex:1,}}>
                            {/* <Header
                                leftIcon='angle-left'
                                leftIconAction={()=>{
                                    this.refs.modal_qr.close();
                                }}
                                title={(this.state.chonbantype==1?"Chọn bàn":"Quét QR bàn")}
                            /> */}
                                <View style={{alignContent:"center",alignItems:"center",height:40}}>
                                    <Text>Nhập số bàn</Text>
                                </View>
                                <View style={{height:40}}>
                                    <TextInput 
                                        style={styles.vInput2}
                                        autoFocus={true}
                                        keyboardType='numeric'
                                        onChangeText={(text) => this.setState({Ban:text})}
                                        placeholder='Nhập số bàn'
                                        value={this.state.Ban}
                                        maxLength={10}  //setting limit of input
                                    />
                                </View>
                             
                                 <Button
                                    buttonStyle={{
                                        backgroundColor: VCOLOR.do_dam,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 0,                                    
                                    }}
                                    backgroundColor="red"
                                    color="white"
                                    icon={{name: 'opencart', type: 'font-awesome'}}
                                    title={'Đặt hàng'}
                                    onPress={()=>{
                                        this.hoiThanhtoan();
                                    }}
                                />
                        </View>
                </Modal>          
                    
            </View>
        );
    };
    /*
    onBarCodeRead = (e) => {
        if(this.state.askQR){
            this.refs.modal_qr.close();
            var json_parsed=vUtils.isValidJson(e.data);
            if(json_parsed!=false){
                this.hoiThanhtoan({
                    Id:json_parsed.ban,
                    TenBan:json_parsed.tenban,
                    MaBan:json_parsed.maban,
                }); 
                this.setState({qrcode: json_parsed})
            }
            else{
                Toast.show("Mã QR không hợp lệ!", {position:Toast.positions.CENTER});
            }
            this.setState({
                askQR:false
            });
        }
    };*/
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }
        if(!isNaN(newText)&&parseInt(newText)>0){
            this.setState({ slspEdit: parseInt(newText) });
        }else{
            this.setState({ slspEdit:"" });
        }
    }

    onChangedBan(text){
        this.setState({ Ban:text});
    }
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamReducer:state.sanPhamReducer,
    cartReducer:state.cartReducer,
    donHangReducer:state.donHangReducer,
    quanReducer:state.quanReducer
});
export default connect(mapStateToProps)(GioHang);

const styles=StyleSheet.create({
        container:{
            flex:1,
            position:"relative",
        },
        vInput:{
            height: 40,
            paddingLeft: 10,
            flex: 1,
            fontSize: 16,
            borderBottomWidth:1,
            borderBottomColor: "gray",
        },
        vInput2:{
            height: 40,
            paddingLeft: 10,
            flex: 1,
            fontSize: 16,
        },
        productItem:{
            borderWidth:1,
            marginBottom:2,
        },
        productItem2:{
            borderWidth:1,
            marginBottom:2,
            width:"48%",
            height:50,
            marginRight:3,
        },
        itemImage:{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer:{
            flexDirection:"row",
            position:'absolute',
            bottom:3,
            left:0,
            width:"100%",
            backgroundColor:VCOLOR.xam,
            alignContent:"center",
            alignItems: "center",
            justifyContent:"center",
            paddingTop:3,
        },

      modal: {
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      modal2: {
        height: 230,
        backgroundColor: "#3B5998"
      },
    
      modal3: {
        height: 180,
        width: 150
      },
      modal_qr: {
        height: 160,
        width: 220
      },
      modal4: {
        height: 300
      },
    
      btn: {
        margin: 10,
        backgroundColor: "#3B5998",
      
        padding: 10
      },
      btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
      },
      text: {
       
        fontSize: 22
      }
});



const styles2 = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#e2e2e2',
      padding: 10,
      paddingLeft: 15,
      backgroundColor: '#fff'
    },
    lastItemStyle: {
      flexDirection: 'row',
      flex: 1,
      padding: 10,
      paddingLeft: 15,
      backgroundColor: '#fff'
    },
    imageStyle: {
      width: 50, 
      height: 50, 
      marginRight: 20
    },
    textStyle: {
      flex: 2,
      justifyContent: 'center'
    },
    priceStyle: {
      backgroundColor: '#ddd',
      width: '80%',
      alignItems: 'center',
      marginTop: 3,
      borderRadius: 3
    },
    counterStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  });


  const styleModals = StyleSheet.create({
    wrapper: {
      paddingTop: 50,
      flex: 1
    },
  
    modal: {
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    modal2: {
      height: 230,
      backgroundColor: "#3B5998"
    },
  
    modal3: {
      height: 300,
      width: 300
    },
  
    modal4: {
      height: 300
    },
  
    btn: {
      margin: 10,
      backgroundColor: "#3B5998",
      color: "white",
      padding: 10
    },
  
    btnModal: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: "transparent"
    },
  
    text: {
      color: "black",
      fontSize: 22
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
    },
    preview2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });