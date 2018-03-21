import React,{Component} from 'react';
import {View,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Header from './../common/components/Header';
import {fetchDanhSachDonHangTichDiem} from './../actions/donHangAction';
import commonStyles,{colors} from './../common/commonStyles';
import { HeadPadding,formatVND,vStyles} from '../common/vUtils';
import Loading from './../common/components/Loading';
import Modal from 'react-native-modalbox';
import Login from './pages/Login';
import Register from './pages/Register';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {VCOLOR} from './../common/constants';
class TichDiem extends Component{
    constructor(props){
        super(props); 
       
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
            page_size:10,
        }
       
    }
    //pull refresh
    handleRefresh=()=>{  
        //scrolltop
        this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});

        const {donHangReducer,dispatch} =this.props;
        this.setState({
            page:1,
            data:[],
            refreshing:donHangReducer.isFetchingTichDiem,
            seed:this.state.seed+1,
        },()=>{
            const {authReducer} =this.props;
            if(authReducer.user!=null){
                dispatch(fetchDanhSachDonHangTichDiem(authReducer.user,this.state.page,this.state.page_size));
            }
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
        
         dispatch({type:"TichDiem_CTDonHang_Screen",DonHang:item});
    }


    componentDidMount(){
        
        const {donHangReducer,dispatch,authReducer} = this.props; 
        if(authReducer.user!=null){
            dispatch(fetchDanhSachDonHangTichDiem(authReducer.user,this.state.page,this.state.page_size));
        }
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
            dispatch(fetchDanhSachDonHangTichDiem(authReducer.user,this.state.page,this.state.page_size));
        });
    }
    render(){
        const {authReducer,dispatch,donHangReducer} = this.props;
        let isLoggedIn = authReducer.user!=null;//authReducer.isLoggedIn;
        let user = authReducer.user;

     
        const {ListTichDiem,PagingTichDiem,isFetchingTichDiem} = donHangReducer;
        
        return (
            <View style={styles.container}>
                    
                    <Header
                        showBack={true}
                        //leftIcon='angle-left'
                        //leftIconAction={()=>this.goBack()}

                        // rightIcon='address-book'
                        // rightIconAction={()=>this.goBack()}

                        // rightIcon2='heart'
                        // rightIconAction2={()=>this.goBack()}
                        title={"Tích điểm"}
                    />
                    {
                        !isLoggedIn?
                        <View style={styles.container}>
                            <TouchableOpacity
                                style={[commonStyles.btn, {marginBottom:20}]}
                                onPress={() => {
                                    this.refs.modal_register.open();
                                    //dispatch({type:'RegisterScreen'});
                                }}
                                underlayColor={colors.backGray}
                            >
                                <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Đăng ký </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[commonStyles.btn, {marginBottom:20}]}
                                onPress={() => {
                                    this.refs.modal_login.open();
                                   // dispatch({type:'LoginScreen'});
                                }}
                                underlayColor={colors.backGray}
                            >
                                <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> Đăng nhập </Text>
                            </TouchableOpacity>

                             <Modal ref={"modal_login"}>
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

                                <Modal ref={"modal_register"}>
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
                        :
                    <View>
                            <View style={styles.header}>
                                <View style={styles.cot1}>
                                    <Text>Đơn hàng</Text>
                                </View>
                                <View style={styles.cot2}>
                                    <Text>Trạng thái</Text>
                                </View>
                                <View style={styles.cot3}>
                                    <Text>Điểm tích lũy</Text>
                                </View>    
                            </View>
                            {
                                ListTichDiem!=undefined&&PagingTichDiem!=undefined&&ListTichDiem.length==0?
                                <View style={{flex:1,alignContent:"center",alignItems:"center",alignSelf:"center"}}>
                                    <Text>0 đơn hàng</Text>
                                </View>
                                :null
                            }
                        
                                <FlatList
                                            ref="FlatList"
                                            data={ListTichDiem}
                                            renderItem={({item}) =>
                                                <TouchableOpacity key={item.Id} onPress={()=>{
                                                    this.onPressProductItem(item);
                                                }} style={styles.productItem}>
                                                     <View style={item.Id%2==0?styles.item:styles.item2} >
                                                        <View style={styles.cot1}>
                                                            <Text style={{fontWeight:"bold"}}>{item.MaDonHang}</Text>
                                                            <Text>{item.NgayDatHang}</Text>
                                                            <Text>{formatVND(item.TongTienHang)}</Text>
                                                            <Text>{item.CTDonHangs.length} sản phẩm</Text>
                                                        </View>
                                                        <View style={styles.cot2}>
                                                            <Text>{item.TrangThaiGiaoHang.Ten}</Text>
                                                            <Text>{item.TrangThaiThanhToan.Ten}</Text>
                                                        </View>
                                                        <View style={styles.cot3}>
                                                            <Text>{formatVND(item.DiemTichLuy,item.TrangThaiThanhToan.Ten)}</Text>
                                                            <FontAwesome color={VCOLOR.green} size={28} name="check"/>
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
                                            ListFooterComponent={()=>{
                                                return(
                                                    <View style={styles.footer}>
                                                        <View style={{flex:1,alignItems:"center"}}>
                                                            <Text>Tổng điểm tích luỹ:</Text>
                                                            <Text style={{fontSize:20,fontWeight:"bold",color:VCOLOR.do_dam}}>{formatVND(user.DiemTichLuy)}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        
                                        />
                
                
                        
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
                                                        PagingTichDiem!=undefined?
                                                        <TouchableOpacity 
                                                            disabled={this.state.page==PagingTichDiem.TotalPages}
                                                            
                                                            activeOpacity = { 0.7 } 
                                                            style = { this.state.page==PagingTichDiem.TotalPages?styles.TouchableOpacity_style_disabled:styles.TouchableOpacity_style }
                                                            onPress = { ()=>{
                                                                this.handleLoadMore(+1);
                                                            }} 
                                                            >
                            
                                                            <Text style = { styles.TouchableOpacity_Inside_Text }>Trang tiếp theo {this.state.page}/{PagingTichDiem!=undefined?PagingTichDiem.TotalPages:""} </Text>
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
                    }
            
               
                    
            </View>
        );
    };
}
const mapStateToProps = state=>({
    authReducer:state.authReducer,
    donHangReducer:state.donHangReducer,
});


//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(TichDiem);


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
        width:'40%'
    },
    cot2:{
        borderWidth:0.5,
        borderColor:"#ffffff",
        width:'30%'
    },
    cot3:{
        borderWidth:1,
        borderColor:"#ffffff",
        width:'30%'
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
});