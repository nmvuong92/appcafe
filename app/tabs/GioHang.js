import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,TextInput,Modal as ReactNativeModal} from 'react-native';
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

import {postThanhToanDatHang} from './../actions/donHangAction';
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
            page:0,
            page_size:10,
            modalVisible: false,

            itemEdit:null,
            slspEdit:0,

            qrcode: null
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

    postThanhToan = (item)=>{
        const {dispatch,authReducer}  = this.props;
        var cart = [];
        for(var i=0;i<cartReducer.cartItems.length;i++){
            cart.push({
                SanPhamId:cartReducer.cartItems[i].ID,
                SoLuong:cartReducer.cartItems[i].SLSP,
            });
        }



        dispatch(postThanhToanDatHang(authReducer.user,{
            Ban:this.state.qrcode.ban,
            Shop:this.state.qrcode.shop,
            DiaChi:this.state.qrcode.diachi,
            ChiTietDonHang:cart
        },()=>{
            this.refs.modal_qr.close();
        }));
      
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

        const {authReducer,donHangReducer} =this.props;
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
                            keyExtractor={(item,index) => item.ID+""}
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
                                    width: "100%",
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 10
                                }}
                                backgroundColor="red"
                                color="white"
                                icon={{name: 'opencart', type: 'font-awesome'}}
                                title={'THANH TOÁN'}
                                onPress={()=>{
                                    this.goThanhToan();
                                    /* if(isLoggedIn){
                                        this.goThanhToan();
                                    }else{
                                        Toast.show("Vui lòng đăng nhập!", {position:Toast.positions.CENTER});
                                    }*/
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
                                            <MaterialIcons.Button name="delete-forever" backgroundColor={VCOLOR.red} borderRadius={0} onPress={()=>{
                                                    dispatch(cartCRUD("x",this.state.itemEdit,1));
                                                    this.refs.modal3.close();
                                            }}/>
                                            <FontAwesome.Button name="check" backgroundColor={VCOLOR.green} borderRadius={0}  onPress={() => {
                                                if(this.state.slspEdit!=NaN){
                                                    dispatch(cartCRUD("=",this.state.itemEdit,this.state.slspEdit));
                                                }
                                                this.refs.modal3.close();
                                            }}>
                                                <Text style={{fontFamily: 'Arial', fontSize: 15}}>Cập nhật</Text>
                                            </FontAwesome.Button>
                                    </View>
                            </View>
                            :null
                        }
                  </Modal>
             
                  
                <Modal
                    ref={"modal_qr"}>
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
    };
    onBarCodeRead = (e) => {
        var json_parsed=vUtils.isValidJson(e.data);
        if(json_parsed!=false){
            Toast.show("Tìm thấy mã QR bàn số: "+json_parsed.ban, {position:Toast.positions.CENTER});
            this.setState({qrcode: json_parsed})
        }
        else{
            Toast.show("Mã QR không hợp lệ!", {position:Toast.positions.CENTER});
        }
    };
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
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamReducer:state.sanPhamReducer,
    cartReducer:state.cartReducer,
    donHangReducer:state.donHangReducer
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
    productItem:{
        borderWidth:1,
        marginBottom:2,
       
        
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
        height: 300,
        width: 300
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
    }
  });