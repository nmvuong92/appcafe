import React,{Component} from 'react';
import {View,Text,TouchableOpacity,FlatList,StyleSheet,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Header from './../common/components/Header';
import {fetchDanhSachDonHang,fetchDanhSachDonHangDevice,postGoiTinhTien,postGopY} from './../actions/donHangAction';
import commonStyles,{colors} from './../common/commonStyles';
import { HeadPadding,formatVND,vStyles } from '../common/vUtils';
import Loading from './../common/components/Loading';

import LoadingActivityIndicator from './../common/components/LoadingActivityIndicator';

import Login from './pages/Login';
import Register from './pages/Register';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { VCOLOR } from '../common/constants';
import { Button, ButtonGroup} from 'react-native-elements';
import Modal from 'react-native-modalbox';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as vUtils  from './../common/vUtils';
class DonHang extends Component{
    constructor(props){
        super(props); 
        const { params } = this.props.navigation.state;
        this.state={
            appIsReady:false,
            showBtnTimKiem:false,
            data:[],
            searchClearIcon: false,
            tukhoa:"",
            loading:false,
            seed:1,
            error:null,
            refreshing:false,
            page:1,
            page_size:1000,
            show_header:params!=undefined&&params.show_header!=undefined,
            detail_nav:params!=undefined?params.detail_nav:"DonHang_CTDonHang_Screen",
            txtGopY:"",
            GopYDonHangID:-1,

            txtTienKhachDua:"",
            txtTienThoiLai:0,
            DonHangSelected:null,
            
        }
    }
    static navigationOptions = ({ navigation }) => {
            return {
                tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
                    const { route, index, focused} = scene;
                    //console.log(scene)
                    if(focused){
                        console.log("focused");
                        //navigation.state.params.reLoad()
                    }

                  
                    if(navigation.state.params!=undefined){
                        navigation.state.params.scrollToTop();
                    }
                    
                    //toi trang hoa don
                    jumpToIndex(index);
                   
                }
            }
    };
    scrollToTop(){
        console.log("scrollToTop");
    }
    reLoad=()=>{
        const {donHangReducer,dispatch} = this.props; 
        dispatch(fetchDanhSachDonHangDevice(this.state.page,this.state.page_size));
    }
 

    //pull refresh
    handleRefresh=()=>{  
        //scrolltop
        this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});

        const {donHangReducer,dispatch} =this.props;
        this.setState({
            page:1,
            data:[],
            refreshing:donHangReducer.isFetching,
            seed:this.state.seed+1,
        },()=>{
            const {authReducer} =this.props;
            dispatch(fetchDanhSachDonHangDevice(this.state.page,this.state.page_size));
        });
    }

    //
    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
        this.handleLoadMore();
        this.onEndReachedCalledDuringMomentum = true;
        }
    }

    //bam vao san pham item
    onPressProductItem = (item)=>{
         const {dispatch}  = this.props;
         console.log("------------onPressProductItem------------");
         console.log(item);
         
         dispatch({type:this.state.detail_nav,DonHang:item});
    }

    componentDidMount(){
      
        console.log("componentDidMount");
        const {donHangReducer,dispatch,authReducer} = this.props; 
        dispatch(fetchDanhSachDonHangDevice(this.state.page,this.state.page_size));
       
    }
   
    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
          this.handleLoadMore();
          this.onEndReachedCalledDuringMomentum = true;
        }
    }
    handleLoadMore=(page=1)=>{
        //scrolltop
       this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});


        const {sanPhamReducer,dispatch} =this.props;
        this.setState({
            page:this.state.page+page,
        },()=>{
            const {authReducer} = this.props; 
            dispatch(fetchDanhSachDonHangDevice(this.state.page,this.state.page_size));
        });
    }
    render(){
        const {authReducer,dispatch,donHangReducer} = this.props;
        let isLoggedIn = authReducer.user!=null;//authReducer.isLoggedIn;
        let user = authReducer.user;

     
        const {List,Paging,isFetching} = donHangReducer;
        
        return (
            <View style={styles.container}>
                    <Header
                        showBack={this.state.show_header}
                        //leftIcon='angle-left'
                        //leftIconAction={()=>this.goBack()}

                        rightIcon='refresh'
                        rightIconAction={()=>this.reLoad()}

                        // rightIcon2='heart'
                        // rightIconAction2={()=>this.goBack()}
                        title={"Danh sách đơn đặt hàng"}
                    />
                <View style={styles.header}>
                    <View style={[styles.cot1,{padding:5}]}>
                        <Text style={{color:"white"}}>Đơn hàng</Text>
                    </View>
                    <View style={[styles.cot3,{padding:5}]}>
                        <Text style={{color:"white"}}>Trạng thái</Text>
                    </View>    
                </View>
               {
                   List!=undefined&&Paging!=undefined&&List.length==0?
                   <View style={{flex:1,alignContent:"center",alignItems:"center",alignSelf:"center"}}>
                       <Text>0 đơn hàng</Text>
                   </View>
                   :null
               }
               {
                   isFetching?<LoadingActivityIndicator loading={isFetching}/>:
                   <FlatList
                            ref="FlatList"
                            data={List}
                            renderItem={({item}) =>
                                <TouchableOpacity key={item.Id} onPress={()=>{
                                    this.onPressProductItem(item);
                                }} style={styles.productItem}>
                                    <View style={item.Id%2==0?styles.item:styles.item2} >
                                        <View style={styles.cot1}>
                                            <Text style={{fontWeight:"bold"}}>#{item.MaDonHang}-{item.NgayDatHang}</Text>
                                            <View style={{  borderRadius:10,borderWidth: 1,borderColor: VCOLOR.do_dam, paddingLeft:5, }}>
                                            {
                                                item.CTDonHangs.map((item,index)=>{
                                                    return(
                                                        <Text key={item.Id+""}>{index+1}. {item.SanPham.TenSanPham} ({item.SoLuong+" cái"})</Text>
                                                    );
                                                })
                                            }
                                            </View>
                                            <Text>-Tổng tiền: {formatVND(item.TongTienHang)}</Text>
                                            <Text>-Thanh toán: {item.TrangThaiThanhToan.Ten}</Text>
                                            <Text>-Hình thức mua hàng: {item.HinhThucMuaHang.Ten}</Text>
                                            {
                                                item.HinhThucMuaHangId==1?
                                                <Text>-Bàn:  {item.Ban}</Text>
                                                :null
                                            }
                                        </View>
                                    
                                        <View style={styles.cot3}>
                                         
                                        
                                            <Button
                                                disabled={item.SoLanGoiTinhTien>0||item.TrangThaiThanhToanId==2}
                                                disabledTextStyle={{color:"black"}}
                                                buttonStyle={{
                                                    backgroundColor:VCOLOR.do_dam,
                                                    borderColor: "transparent",
                                                    borderWidth: 0,
                                                    borderRadius: 0,
                                                    height:55,         
                                                }}
                                                containerViewStyle={{width: '100%', marginLeft: 0}}
                                                fontSize={12}
                                                color="white"
                                                iconRight={{name: item.SoLanGoiTinhTien>0?'check':'volume-control-phone', type: 'font-awesome'}}
                                                title={item.TrangThaiThanhToanId==2?'Đã tính tiền':item.SoLanGoiTinhTien>0?'Đã gọi tính tiền':'Gọi tính tiền '}
                                                onPress={()=>{
                                                    this.setState({
                                                        DonHangSelected:item,
                                                    },()=>{
                                                        this.refs.modal_goitinhtien.open();
                                                        /*dispatch(postGoiTinhTien(item.Id,()=>{
                                                            this.reLoad();
                                                        }));  */
                                                    });                                          
                                                }}
                                            />
                                            
                                            <Button
                                                buttonStyle={{
                                                    backgroundColor: VCOLOR.do_dam,
                                                    borderColor: "transparent",
                                                    borderWidth: 0,
                                                    borderRadius: 0,
                                                    height:55,      
                                                    marginTop:5,                 
                                                }}
                                                containerViewStyle={{width: '100%', marginLeft: 0}}
                                                fontSize={12}
                                                backgroundColor="red"
                                                color="white"
                                                iconRight={{name: 'comment', type: 'font-awesome'}}
                                                title={'Góp ý'}
                                                onPress={()=>{
                                                    this.setState({
                                                        txtGopY:"",
                                                        GopYDonHangID:item.Id,
                                                    },()=>{
                                                        this.refs.modal_gopy.open();
                                                    });                  
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
                
                <Modal
                    style={[styles.modal, styles.modal_gopy]} position={"center"} 
                    ref={"modal_gopy"}>
                        <View style={{flex:1,width:"100%"}}>
                            {/* <Header
                                leftIcon='angle-left'
                                leftIconAction={()=>{
                                    this.refs.modal_qr.close();
                                }}
                                title={(this.state.chonbantype==1?"Chọn bàn":"Quét QR bàn")}
                            /> */}
                                <View style={{alignContent:"center",alignItems:"center",height:40}}>
                                    <Text>Nhập góp ý</Text>
                                </View>
                              
                                    <TextInput 
                                        style={{width:"100%",flex:1,}}
                                       
                                        multiline = {true}
                                        numberOfLines = {2}
                                        maxLength = {499}
                                        onChangeText={(text) => this.setState({txtGopY:text})}
                                        placeholder='Nhập góp ý/phản hồi'
                                        value={this.state.txtGopY}                                      
                                    />
                             
                             
                                 <Button
                                    buttonStyle={{
                                        backgroundColor: VCOLOR.do_dam,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 0,                                    
                                    }}
                                    backgroundColor="red"
                                    color="white"
                                    icon={{name: 'send-o', type: 'font-awesome'}}
                                    title={'Gửi'}
                                    onPress={()=>{
                                        if(this.state.txtGopY.length>=3&&this.state.txtGopY.length<500){
                                            dispatch(postGopY(this.state.GopYDonHangID,this.state.txtGopY,()=>{
                                                this.refs.modal_gopy.close();
                                                this.reLoad();
                                            }));  
                                        }else{
                                            Toast.show("Nội dung góp ý/phản hồi từ 3-499 ký tự!", {position:Toast.positions.TOP});
                                        }
                                    }}
                                />
                        </View>
                </Modal>

                <Modal
                    backdrop={false}
                    position={"top"} 
                    swipeToClose={false}
                    keyboardTopOffset={0}
                    ref={"modal_goitinhtien"}>
                       {
                           this.state.DonHangSelected!=null?
                            <KeyboardAwareScrollView>
                                <Header
                                    leftIcon='angle-left'
                                    leftIconAction={()=>{
                                        this.refs.modal_goitinhtien.close();
                                    }}
                                    title="Gọi tính tiền"
                                    //noPadding={this.state.height_modal_qr==1}
                                /> 
                                    <Text style={styles.vTitle}></Text>
                                    <View style={{width:"100%",padding:5}}>
                                    <View style={{flex:1,alignItems:"center"}}>
                                        <Text>Tổng tiền:</Text>
                                        <Text style={{fontSize:20,fontWeight:"bold",color:VCOLOR.do_dam}}>{vUtils.formatVND(this.state.DonHangSelected.TongTienHang)}</Text>
                                    </View>
                                    <View style={{flex:1,alignItems:"center"}}>
                                        <Text>Tiền khách đưa:</Text>
                                        <TextInput 
                                            style={styles.vInput2}
                                            keyboardType='numeric'
                                            onChangeText={(tienkhachdua) => {
                                                this.setState({txtTienKhachDua:tienkhachdua});
                                                if(vUtils.isInt(tienkhachdua)&&tienkhachdua>=this.state.DonHangSelected.TongTienHang){
                                                    var tienthoi = tienkhachdua-this.state.DonHangSelected.TongTienHang;
                                                    this.setState({txtTienThoiLai:tienthoi});
                                                }else{
                                                    this.setState({txtTienThoiLai:""})
                                                }
                                            }}
                                            placeholder='Tiền khách đưa (*)'
                                            value={this.state.txtTienKhachDua}
                                            maxLength={7}  //setting limit of input
                                        />
                                        <Text>Tiền quán thối lại:</Text>
                                        <Text style={{fontSize:20,fontWeight:"bold",color:VCOLOR.do_dam}}>{vUtils.formatVND(this.state.txtTienThoiLai)}</Text>
                                    </View>
                                    </View>
                             
                              
                                    <Button
                                        disabled={isFetching}
                                        buttonStyle={{
                                            backgroundColor: VCOLOR.do_dam,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 0,    
                                            marginBottom:5,
                                            height: 40,                     
                                        }}
                                        backgroundColor="red"
                                        color="white"
                                        icon={{name: 'check', type: 'font-awesome'}}
                                        title={'Gửi'}
                                        onPress={()=>{
                                            if (!vUtils.isInt(this.state.txtTienKhachDua)){
                                                Toast.show("Vui lòng nhập số tiền bạn sẽ trả để nhân viên thối lại!", {position:Toast.positions.TOP});
                                                return;
                                            }
                                            dispatch(postGoiTinhTien({
                                                DonHangID:this.state.DonHangSelected.Id,
                                                TienKhachDua:this.state.txtTienKhachDua,
                                            },()=>{
                                                this.reLoad();
                                            })); 
                                        }}
                                    />
                            </KeyboardAwareScrollView>
                           :null
                       }   
                </Modal>


               <View style = { styles.footerStyle }>
                        <TouchableOpacity 
                            activeOpacity = { 0.7 } 
                            style = { styles.TouchableOpacity_style }
                            onPress = {()=>{
                                this.setState({refreshing:true},()=>{
                                    this.handleRefresh();
                                });
                            }}
                            >

                            <Text style = { styles.TouchableOpacity_Inside_Text }>Tải lại</Text>
                            {
                                ( this.state.fetching_Status )
                                ?
                                    <ActivityIndicator color = "#fff" style = {{ marginLeft: 6 }} />
                                :
                                    null
                            }
                        </TouchableOpacity> 
                                <TouchableOpacity 
                                disabled={this.state.page<=1}
                                activeOpacity = { 0.7 } 
                                style = { this.state.page<=1?styles.TouchableOpacity_style_disabled:styles.TouchableOpacity_style }
                                onPress = { ()=>{
                                    this.handleLoadMore(-1);
                                }} 
                                >
                                <Text style = { styles.TouchableOpacity_Inside_Text }>Trang trước</Text>
                                {
                                    ( this.state.fetching_Status )
                                    ?
                                        <ActivityIndicator color = "#fff" style = {{ marginLeft: 6 }} />
                                    :
                                        null
                                }
                            </TouchableOpacity> 
                        {
                            Paging!=undefined?
                            <TouchableOpacity 
                                disabled={this.state.page==Paging.TotalPages}
                                
                                activeOpacity = { 0.7 } 
                                style = { this.state.page==Paging.TotalPages?styles.TouchableOpacity_style_disabled:styles.TouchableOpacity_style }
                                onPress = { ()=>{
                                    this.handleLoadMore(+1);
                                }} 
                                >

                                <Text style = { styles.TouchableOpacity_Inside_Text }>Trang tiếp theo {this.state.page}/{Paging!=undefined?Paging.TotalPages:""} </Text>
                                {
                                    ( this.state.fetching_Status )
                                    ?
                                        <ActivityIndicator color = "#fff" style = {{ marginLeft: 6 }} />
                                    :
                                        null
                                }

                            </TouchableOpacity> 
                            :
                            null
                        }
                   </View>
            </View>
        );
    };
}
const mapStateToProps = state=>({
    authReducer:state.authReducer,
    donHangReducer:state.donHangReducer,
    navReducer:state.navReducer,
});


//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(DonHang);


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    item:{
        width:'100%',
        borderTopWidth:1,
        borderColor:"red",
        flexDirection:"row",
        padding:3,
    },
    item2:{
        width:'100%',
        borderTopWidth:1,
        borderColor:"red",
        flexDirection:"row",
        backgroundColor:"#e5e5e5",
        padding:3,
    },
    header:{
        width:'100%',
        borderWidth:0.5,
        borderColor:"#ffffff",
        flexDirection:"row",
        backgroundColor:VCOLOR.do_dam,
        
    },
    cot1:{
        borderWidth:0.5,
        borderColor:"#ffffff",
        width:'60%'
    },
    cot2:{
        borderWidth:0.5,
        borderColor:"#ffffff",
        width:'30%'
    },
    cot3:{
        borderWidth:1,
        borderColor:"#ffffff",
        width:'40%'
    },
    footerStyle:
    {
      padding: 7,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 2,
      borderTopColor: '#009688',
      flexDirection:"row"
    },
    TouchableOpacity_style:
    {
      padding: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F44336',
      borderRadius: 5,
      margin:3
    },
    TouchableOpacity_style_disabled:
    {
      padding: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
      borderRadius: 5,
      margin:3
    },
    TouchableOpacity_Inside_Text:
    {
      textAlign: 'center',
      color: '#fff',
      fontSize: 12
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_gopy: {
        height: 180,
        width: 200,
        padding:0,
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
        
        fontSize: 16,
        borderWidth:1,
        borderColor:"gray"
    },
});