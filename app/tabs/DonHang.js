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
                    <View style={styles.cot1}>
                        <Text>Đơn hàng</Text>
                    </View>
                    <View style={styles.cot3}>
                        <Text>Trạng thái</Text>
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
                                            <Text style={{fontWeight:"bold"}}>#{item.MaDonHang}</Text>
                                            <Text>{item.NgayDatHang}</Text>
                                            <Text>{formatVND(item.TongTienHang)}</Text>
                                            <Text>{item.CTDonHangs.length} sản phẩm</Text>
                                        </View>
                                    
                                        <View style={styles.cot3}>
                                            <Text>{item.TrangThaiThanhToan.Ten}</Text>
                                            {
                                                item.TrangThaiThanhToan.Id==2?
                                                <FontAwesome color={VCOLOR.green} size={28} name="check"/>
                                                :null
                                            }
                                            {
                                                item.TrangThaiThanhToan.Id==1?
                                                <Button
                                                    buttonStyle={{
                                                        backgroundColor:VCOLOR.green,
                                                        borderColor: "transparent",
                                                        borderWidth: 0,
                                                        borderRadius: 0,
                                                        height:25,                  
                                                    }}
                                                    containerViewStyle={{width: '100%', marginLeft: 0}}
                                                    fontSize={12}
                                                    color="white"
                                                    iconRight={{name: item.SoLanGoiTinhTien>0?'check':'gratipay', type: 'font-awesome'}}
                                                    title={'Gọi tính tiền'}
                                                    onPress={()=>{
                                                        dispatch(postGoiTinhTien(item.Id,()=>{
                                                            this.reLoad();
                                                        }));                                                        
                                                    }}
                                                />
                                                :null
                                            }
                                            <Button
                                                buttonStyle={{
                                                    backgroundColor: VCOLOR.green,
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
                                                iconRight={{name: 'comment-o', type: 'font-awesome'}}
                                                title={'Góp ý/phản hồi'}
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
                        <View style={{flex:1,}}>
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
                                <View style={{flex:1}}>
                                    <TextInput 
                                        style={{width:"100%"}}
                                      
                                        multiline = {true}
                                        numberOfLines = {2}
                                        maxLength = {499}
                                        onChangeText={(text) => this.setState({txtGopY:text})}
                                        placeholder='Nhập góp ý/phản hồi'
                                        value={this.state.txtGopY}                                      
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
        borderWidth:0.5,
        borderColor:"#ffffff",
        flexDirection:"row",
    },
    item2:{
        width:'100%',
        borderWidth:0.5,
        borderColor:"#ffffff",
        flexDirection:"row",
        backgroundColor:"#e5e5e5"
    },
    header:{
        width:'100%',
        borderWidth:0.5,
        borderColor:"#ffffff",
        flexDirection:"row",
        backgroundColor:"#00c6e5",
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
        width: 200
    },
});