import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,TextInput,Modal as ReactNativeModal,SafeAreaView,Alert, Animated, Keyboard } from 'react-native';
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
import LoadingActivityIndicator from './../common/components/LoadingActivityIndicator';
import {postThanhToanDatHang,fetchDanhSachDonHangDevice,fetchDanhSachDonHangDeviceBS} from './../actions/donHangAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            HinhThucMuaHangId:-1, //1: TẠI QUÁN, 2: MANG ĐI, 3: GIAO HÀNG TẬN NƠI
            labelMuaHang:"Hình thức mua hàng",
            askQR:false,
            Ban:"",//nhập bàn

            swipeToClose: true,
            txtSDT:"",
            txtDiaChi:"",
            txtYeuCauKhac:"",
            height_modal_qr:1,
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
        this.setState({
            HinhThucMuaHangId:-1, //chưa chọn bàn
            height_modal_qr:1,//
        });
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
            dispatch(fetchDanhSachDonHangDevice(1,1000));
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

    postThanhToan = ()=>{
        const {dispatch,authReducer,quanReducer}  = this.props;
       
        var cart = [];
        for(var i=0;i<cartReducer.cartItems.length;i++){
            cart.push({
                SanPhamId:cartReducer.cartItems[i].ID,
                ThucDonId:cartReducer.cartItems[i].ThucDonId,
                SoLuong:cartReducer.cartItems[i].SLSP,
                GiaId:cartReducer.cartItems[i].GiaId,
            });
        }

        var donhang={};
        if(this.state.HinhThucMuaHangId==1){
            if (!vUtils.isInt(this.state.Ban)){
                Toast.show("Vui lòng nhập số bàn!", {position:Toast.positions.TOP});
                return;
            }
            donhang={
                HinhThucMuaHangId:this.state.HinhThucMuaHangId,
                Ban:this.state.Ban,
                QuanId:quanReducer.Quan.Id,
                DiaChiGiaoHang:"",
                SDT:"",
                YeuCauKhac:this.state.txtYeuCauKhac,
                ChiTietDonHang:cart
            };
        }else if(this.state.HinhThucMuaHangId==2){
            donhang={
                HinhThucMuaHangId:this.state.HinhThucMuaHangId,
                Ban:0,
                QuanId:quanReducer.Quan.Id,
                DiaChiGiaoHang:"",
                SDT:"",
                YeuCauKhac:this.state.txtYeuCauKhac,
                ChiTietDonHang:cart
            };
        }else if(this.state.HinhThucMuaHangId==3){
            if(vUtils.IsNullOrEmpty(this.state.txtDiaChi)||vUtils.IsNullOrEmpty(this.state.txtSDT)){
                Toast.show("Vui lòng nhập đầy đủ số điện thoại và địa chỉ giao hàng!", {position:Toast.positions.TOP});
                return;
            }            
            donhang={
                HinhThucMuaHangId:this.state.HinhThucMuaHangId,
                Ban:0,
                QuanId:quanReducer.Quan.Id,
                DiaChiGiaoHang:this.state.txtDiaChi,
                SDT:this.state.txtSDT,
                YeuCauKhac:this.state.txtYeuCauKhac,
                ChiTietDonHang:cart
            };
        }else{
            Toast.show("Đặt hàng không thành công!", {position:Toast.positions.TOP});
            return;
        }

        Alert.alert(
            "Xác nhận đặt hàng?",
            "",
            [
                {text:"Hủy bỏ", onPress:()=>{}},
                {
                    text:"Đặt hàng", onPress:()=>{

                    dispatch(postThanhToanDatHang(authReducer.user,donhang,()=>{
                        //lay ds don hang
                        dispatch(fetchDanhSachDonHangDevice(1,1000));
                        //dong modal
                        this.refs.modal_qr.close();
                    }));
                }},
            ]
        );
       
    }
    hoiThanhtoan(){
        //validation
        if(this.state.HinhThucMuaHangId==-1){
            Toast.show("Chưa chọn hình thức mua hàng!", {position:Toast.positions.TOP});
            return;
        }
        this.postThanhToan();
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
        let isFetchingPickBoSung=donHangReducer.isFetchingPickBoSung;
        let ListPickBoSung=donHangReducer.ListPickBoSung;
        let {isFetching} = donHangReducer;
        return (
     
            sanPhamReducer.isFetching?<Loading/>:
            <View style={styles.container}>
                <Header
                    //showBack={true}
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
                                    <View key={item.ThucDonId+""+item.GiaId} style={styles2.containerStyle}>
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
                            keyExtractor={(item, index) => item.ThucDonId+""+item.GiaId}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}  

                            onEndReached={this.onEndReached} 
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            contentContainerStyle={{paddingBottom:150}}
                        />
                 </View>
                            
                 <View style={styles.footer1}>
                        <View style={{flex:1,alignItems:"center"}}>
                            <Text>Tổng tiền:</Text>
                            <Text style={{fontSize:20,fontWeight:"bold",color:VCOLOR.do_dam}}>{vUtils.formatVND(tong_tien_gio_hang)}</Text>
                        </View>
                  </View>
                 <View style={styles.footer}>
                       {
                            /*
                                <View style={{flex:1,alignItems:"center"}}>
                                    <Button
                                        buttonStyle={{
                                            backgroundColor: VCOLOR.do_dam,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 0,                                    
                                        }}
                                        backgroundColor="red"
                                        color="white"
                                        icon={{name: 'cart-plus', type: 'font-awesome'}}
                                        title={'Bổ sung'}
                                        onPress={()=>{
                                            if(quanReducer.Quan==null){
                                                Toast.show("Chưa đăng nhập quán bằng QR!", {position:Toast.positions.CENTER});
                                                return;
                                            }
                                            if(cartReducer.cartItems.length==0){
                                                Toast.show("Vui lòng thêm sản phẩm!", {position:Toast.positions.CENTER});
                                                return;
                                            }
                                            dispatch(fetchDanhSachDonHangDeviceBS(1,1000));
                                            this.refs.modal_bosung.open();
                                        }}
                                    />
                                </View>
                            */
                        
                        }
                      
                        <View style={{flex:1,width:"100%",padding:0}}>
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
                
                ref={"modal_bosung"}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}>
                    <Header
                        leftIcon='angle-left'
                        leftIconAction={()=>{
                            this.refs.modal_bosung.close();
                        }}
                        title={("Bổ sung món vào đơn hàng")}
                    />
                     {
                        isFetchingPickBoSung?<LoadingActivityIndicator loading={isFetchingPickBoSung}/>:
                        <FlatList
                                    ref="FlatList"
                                    data={ListPickBoSung}
                                    renderItem={({item}) =>
                                        <TouchableOpacity key={item.Id} onPress={()=>{
                                            this.onPressProductItem(item);
                                        }} style={styles.productItem}>
                                            <View style={item.Id%2==0?styles.item:styles.item2} >
                                                <View style={styles.cot1}>
                                                    <Text style={{fontWeight:"bold"}}>#{item.MaDonHang}</Text>
                                                    <Text>{item.NgayDatHang}</Text>
                                                    <Text>{vUtils.formatVND(item.TongTienHang)}</Text>
                                                    <Text>{item.CTDonHangs.length} sản phẩm</Text>
                                                </View>
                                            
                                                <View style={styles.cot3}>
                                                    <Text>{item.TrangThaiThanhToan.Ten}</Text>
                                                    {
                                                        item.TrangThaiThanhToan.Id==2?
                                                        <FontAwesome color={VCOLOR.green} size={28} name="check"/>
                                                        :null
                                                    }
                                                    <Button
                                                        buttonStyle={{
                                                            backgroundColor: VCOLOR.do_dam,
                                                            borderColor: "transparent",
                                                            borderWidth: 0,
                                                            borderRadius: 0,
                                                            height:25, 
                                                            marginTop:5,                 
                                                        }}
                                                        containerViewStyle={{width: '100%', marginLeft: 0}}
                                                        fontSize={12}
                                                        backgroundColor="red"
                                                        color="white"
                                                        iconRight={{name: 'check', type: 'font-awesome'}}
                                                        title={'CHỌN'}
                                                        onPress={()=>{
                                                            Alert.alert(
                                                                "Xác nhận bổ sung món vào đơn hàng chọn?",
                                                                "",
                                                                [
                                                                    {text:"Hủy bỏ", onPress:()=>{}},
                                                                    {text:"Đồng  ý", onPress:()=>{

                                                                    }},
                                                                ]
                                                            );      
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    keyExtractor={(item,index) => item.Id+""}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.handleRefresh}
                                    //onEndReached={this.onEndReached} 
                                    //onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    contentContainerStyle={{paddingBottom:150}}
                                
                                />
                    }
                </Modal>       
                  
                <Modal
                    style={[styles.modal, this.state.height_modal_qr==1?styles.modal_qr:styles.modal_qr2]} position={"center"} 
                    ref={"modal_qr"}>
                                <Header
                                    leftIcon='angle-left'
                                    leftIconAction={()=>{
                                        //có chọn hình thức mà back
                                        if(this.state.HinhThucMuaHangId>=1){
                                            this.setState({
                                                HinhThucMuaHangId:-1
                                            });
                                        }else{
                                             //thoát
                                             this.refs.modal_qr.close();
                                        }
                                    }}
                                    title={this.state.labelMuaHang}
                                    noPadding={true}
                                /> 
                        <KeyboardAwareScrollView style={{flex:1,width:"100%",}} contentContainerStyle={{justifyContent: 'flex-end',padding:5}}>
                            
                                {
                                    this.state.HinhThucMuaHangId==1?
                                    <Text style={styles.vTitle}>Chọn bàn</Text>:    
                                    this.state.HinhThucMuaHangId==2?
                                    <Text style={styles.vTitle}></Text>:
                                    this.state.HinhThucMuaHangId==3?
                                    <Text style={styles.vTitle}>Nhập thông tin địa chỉ giao hàng</Text>:null
                                }
                               
                                <View style={{flex:1}}>
                                { 
                                    //GIAO HÀNG TẬN NƠI
                                    this.state.HinhThucMuaHangId==3?
                                    <View>
                                    <TextInput 
                                        style={styles.vInput2}
                                        keyboardType='numeric'
                                        maxLength = {15}
                                        onChangeText={(text) => this.setState({txtSDT:text})}
                                        placeholder='Số điện thoại (*)'
                                        value={this.state.txtSDT}                                      
                                    />
                                    <TextInput 
                                        style={styles.vInput2}
                                        multiline = {true}
                                        numberOfLines = {2}
                                        maxLength = {499}
                                        onChangeText={(text) => this.setState({txtDiaChi:text})}
                                        placeholder='Địa chỉ giao hàng (*)'
                                        value={this.state.txtDiaChi}                                      
                                    />
                                   
                                    </View>:null
                                }
                                    
                                </View>

                                {
                                    this.state.HinhThucMuaHangId==-1?
                                    <View>
                                    <Button
                                        buttonStyle={{
                                            backgroundColor: VCOLOR.do_dam,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 0,    
                                            marginBottom:5,  
                                            flex:1,           
                                            height: 40,                     
                                        }}
                                        backgroundColor="red"
                                        color="white"
                                        icon={{name: 'coffee', type: 'font-awesome'}}
                                        title={'Tại quán'}
                                        onPress={()=>{
                                            this.setState({
                                                HinhThucMuaHangId:1,
                                                labelMuaHang:"Tại quán",
                                                height_modal_qr:2,
                                            });
                                        }}
                                    />
                                    <Button
                                        buttonStyle={{
                                            backgroundColor: VCOLOR.do_dam,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 0,    
                                            flex:1,      
                                            marginBottom:5,
                                            height: 40,                     
                                        }}
                                        backgroundColor="red"
                                        color="white"
                                        icon={{name: 'rocket', type: 'font-awesome'}}
                                        title={'Mang đi'}
                                        onPress={()=>{
                                            this.setState({
                                                HinhThucMuaHangId:2,
                                                labelMuaHang:"Mang đi",
                                                height_modal_qr:2,
                                            });
                                        }}
                                    />
                                    <Button
                                        buttonStyle={{
                                            backgroundColor: VCOLOR.do_dam,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 0,    
                                            marginBottom:5,
                                            flex:1,      
                                            height: 40,                     
                                        }}
                                        backgroundColor="red"
                                        color="white"
                                        icon={{name: 'bullseye', type: 'font-awesome'}}
                                        title={'Giao hàng tận nơi'}
                                        onPress={()=>{
                                            this.setState({
                                                HinhThucMuaHangId:3,
                                                labelMuaHang:"Giao hàng tận nơi",
                                                height_modal_qr:2,
                                            });
                                        }}
                                    />
                                    </View>:null
                                }

                                
                                
                                        {
                                            //TẠI QUÁN
                                            this.state.HinhThucMuaHangId==1?
                                            
                                                <TextInput 
                                                    style={styles.vInput2}
                                                    keyboardType='numeric'
                                                    onChangeText={(text) => this.setState({Ban:text})}
                                                    placeholder='Nhập số bàn (*)'
                                                    value={this.state.Ban}
                                                    maxLength={5}  //setting limit of input
                                                />
                                            :null
                                        }
                                  {
                                    this.state.HinhThucMuaHangId!=-1?
                                    <View>
                                    <TextInput 
                                        style={styles.vInput2}
                                        multiline = {true}
                                        numberOfLines = {2}
                                        maxLength = {499}
                                        onChangeText={(text) => this.setState({txtYeuCauKhac:text})}
                                        placeholder='Yêu cầu khác'
                                        value={this.state.txtYeuCauKhac}                                      
                                    />
                                    <Button
                                        disabled={isFetching}
                                        buttonStyle={{
                                            backgroundColor: VCOLOR.do_dam,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 0,    
                                            marginBottom:5,
                                            flex:1,      
                                            height: 40,                     
                                        }}
                                        backgroundColor="red"
                                        color="white"
                                        icon={{name: 'check', type: 'font-awesome'}}
                                        title={'Đặt'}
                                        onPress={()=>{
                                            this.hoiThanhtoan();
                                        }}
                                    />
                                    </View>:null
                                  }
                                
                   
                        </KeyboardAwareScrollView>
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
        vInputRow:{
            flexDirection:"row",
            flex:1,
        },
        vTitle:{
            alignSelf:"center",
            fontWeight:"bold",
            fontSize:16
        },
        vInput:{
            height: 40,
            paddingLeft: 10,
            flex: 2,
            fontSize: 16,
            borderBottomWidth:1,
            borderBottomColor: "gray",
        },
        vInput2:{
           
            width:"100%",
            marginBottom:5,
            height: 40,
            paddingLeft: 5,
            flex: 1,
            fontSize: 16,
            borderWidth:1,
            borderColor:"gray"
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
        footer1:{
            flexDirection:"row",
            position:'absolute',
            bottom:50,
            left:0,
            width:"100%",
            backgroundColor:VCOLOR.xam,
            alignContent:"center",
            alignItems: "center",
            justifyContent:"center",
            paddingTop:3,
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
        height: 200,
        width: 350,
      },
      modal_qr2: {
        height: 300,
        width: 350,
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