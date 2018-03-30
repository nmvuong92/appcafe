import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    ScrollView,
    Platform
} from 'react-native';

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

import {VCOLOR} from './../common/constants';

import { SearchBar } from 'react-native-elements';

import {connect} from 'react-redux';
import { fetchFoodInfo,fetchFood } from './../actions/ProductAction';

import LoadMoreFooter from './../common/components/LoadMoreFooter';
import {NavigationActions} from 'react-navigation';

import {HeadPadding,formatVND,vStyles} from './../common/vUtils';
import {fetchSanPhamTrangChu} from './../actions/sanPhamTrangChuAction';
import Loading from './../common/components/Loading';
import CartBadgeIcon from './../common/components/cartBadgeIcon';

import CornerLabel from './../components/CornerLabel';
import LoadingActivityIndicator from './../common/components/LoadingActivityIndicator';
import Header from './../common/components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Modal from 'react-native-modalbox';
let deviceWidth= Dimensions.get('window').width;

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            appIsReady:false,
            data:[],
            searchClearIcon: false,
            newProductList:[{
                name:"Product 1",
                image:""
            }],
            modalVisible: false,
            modalVisibleRegister: false,
        }
    }
    componentDidMount(){
        //const {sanPhamTrangChuReducer,dispatch} =this.props;
       
        //lay dssp
        //dispatch(sanPhamTrangChuReducer());

        const {sanPhamTrangChuReducer,dispatch} = this.props; 
        dispatch(fetchSanPhamTrangChu());
    }
      
    _onChangeSearchText = (searchText) => {
        if (searchText) {
        this.setState({searchClearIcon: true})
        } else {
        this.setState({searchClearIcon: false})
        }
    }
   
    render(){
        const {authReducer,navReducer,dispatch,sanPhamTrangChuReducer} = this.props;
        let dssp=sanPhamTrangChuReducer.List;
        let isFetching = sanPhamTrangChuReducer.isFetching || dssp.length==0;
        let isLoggedIn = authReducer.user!=null;
        return (
            <View style={styles.container}>
                <HeadPadding/>
                <ScrollView contentContainerStyle={styles.scroll_container}>
                            
                            <Image style={{width:"100%",height:200}} source={require('./../assets/images/banner.jpg')}/>
                        
                            <View style={styles.header_menu}>
                                <View style={{flex:1}}>
                                    <Image style={{width:80,height:50}} source={require('./../assets/images/logo.png')}/>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-end'}}>
                                       

                                        <TouchableOpacity style={styles.head_btn} onPress={()=>{
                                               // this.props.navigation.navigate('KhuyenMaiScreen');
                                                dispatch({type:'Home_KhuyenMai_Wrap'});
                                            }}> 
                                            <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon2_32.png')}/>
                                            <Text style={{fontSize:12}}>Khuyến mãi</Text>
                                        </TouchableOpacity>

                                        {
                                            !isLoggedIn?
                                            <TouchableOpacity style={styles.head_btn} onPress={()=>{
                                                this.refs.modal_register.open();
                                                //this.setState({modalVisibleRegister: !this.state.modalVisibleRegister});
                                                //dispatch({type:'RegisterScreen'});
                                            }}> 
                                                <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon3_32.png')}/>
                                                <Text style={{fontSize:12}}>Đăng ký</Text>
                                            </TouchableOpacity>
                                            :null
                                        }
                                        {
                                             !isLoggedIn?
                                             <TouchableOpacity style={styles.head_btn} onPress={()=>{
                                                this.refs.modal_login.open();
                                                //this.setState({modalVisible: !this.state.modalVisible});
                                                // dispatch({type:'LoginScreen'});
                                             }}> 
                                                <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon4_32.png')}/>
                                                <Text style={{fontSize:12}}>Đăng nhập</Text>
                                            </TouchableOpacity>
                                            :null
                                        }
                                       
                                       

                                         <TouchableOpacity style={styles.head_btn} onPress={()=>{
                                                    dispatch({type:'TichDiem_Wrap'});
                                              
                                            }}> 
                                            <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon5_32.png')}/>
                                            <Text style={{fontSize:12}}>Tích điểm</Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                             {
                                 isFetching?<LoadingActivityIndicator loading={isFetching}/>:
                                <View>
                                 <View>
                                      <View style={styles.panel}>
                                                <View style={styles.panel_header}>
                                                        <Text style={styles.panel_title}>SẢN PHẨM HOT</Text>
                                                </View>      
                                                <View style={styles.panel_body}>

                                                    {
                                                        dssp.HOT.map(function(item,index){
                                                            return (
                                                                <TouchableOpacity style={styles.product_item}  key={"hot_"+index}  onPress={()=>{
                                                                
                                                                    dispatch({type:"Home_ChitietSanPham_Screen",id:item.ID});
                                                                }}>
                                                                    <View style={styles.product_item_body}>
                                                                        <Image style={{width:100,height:100}} source={{uri:item.HinhAnh}}/>
                                                                    </View>
                                                                    <Text style={vStyles.product_name}>{item.TenSanPham} {item.New?<Text style={{color:"red",fontSize:9,fontWeight:'bold'}}>NEW</Text>:null}</Text>
                                                                    <Text style={vStyles.cat_name}>{item.TenDanhMuc}</Text>
                                                                    <Text style={vStyles.price}>{formatVND(item.Gia)}</Text>
                                                                
                                                                    {item.KM?<CornerLabel
                                                                        alignment={'right'}
                                                                        cornerRadius={36}
                                                                        style={{backgroundColor: 'green', }}
                                                                        textStyle={{fontSize: 12, color: '#fff', }}>
                                                                        KM
                                                                    </CornerLabel>:null}

                                                                

                                                                    {item.Hot?<CornerLabel
                                                                        alignment={'left'}
                                                                        cornerRadius={36}
                                                                        style={{backgroundColor: 'red', }}
                                                                        textStyle={{fontSize: 12, color: '#fff', }}>
                                                                        HOT
                                                                    </CornerLabel>:null}
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }
                                                </View>      
                                        </View>
                                 </View>
                         

                                 <View>
                                      <View style={styles.panel}>
                                    <View style={styles.panel_header}>
                                            <Text style={styles.panel_title}>SẢN PHẨM MỚI</Text>
                                    </View>      
                                    <View style={styles.panel_body}>
                                            
                                        {
                                            dssp.HOT.map(function(item,index){
                                                return (
                                                    <TouchableOpacity style={styles.product_item}  key={"new_"+index}  onPress={()=>{
                                                       
                                                        dispatch({type:"Home_ChitietSanPham_Screen",id:item.ID});
                                                    }}>
                                                       
                                                            <View style={styles.product_item_body}>
                                                                <Image style={{width:100,height:100}} source={{uri:item.HinhAnh}}/>
                                                            </View>
                                                            <Text style={vStyles.cat_name}>{item.TenDanhMuc}</Text>
                                                            <Text style={vStyles.price}>{formatVND(item.Gia)}</Text>
                                                        
                                                            {item.KM?<CornerLabel
                                                                alignment={'right'}
                                                                cornerRadius={36}
                                                                style={{backgroundColor: 'green', }}
                                                                textStyle={{fontSize: 12, color: '#fff', }}>
                                                                KM
                                                            </CornerLabel>:null}

                                                        

                                                            {item.Hot?<CornerLabel
                                                                alignment={'left'}
                                                                cornerRadius={36}
                                                                style={{backgroundColor: 'red', }}
                                                                textStyle={{fontSize: 12, color: '#fff', }}>
                                                                HOT
                                                            </CornerLabel>:null}
                                                    </TouchableOpacity>
                                                   
                                                )
                                            })
                                        }
                                    </View>      
                            </View>



                                     
                                 </View>

                    

                                 </View>
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
        )
    }

    _onLoginSuccess() {
        this.setState({modalVisible: !this.state.modalVisible});
    }
    _onRegisterSuccess() {
        this.setState({modalVisibleRegister: !this.state.modalVisibleRegister});
    }
}
const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamTrangChuReducer:state.sanPhamTrangChuReducer,
   
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#ffffff',
       
    },
    searchBar:{
       
        flexDirection: 'row',
        backgroundColor: VCOLOR.do_dam,
    },
    banner:{

    },
    banner_img:{
        width: deviceWidth,
        height: deviceWidth * 0.5
    },
    header_menu:{
      
        backgroundColor:VCOLOR.xam,
        paddingTop:3,
        paddingBottom:2,
        
        flexDirection:'row'
    },
    head_btn:{
       alignItems:'center',
       marginRight:10,
    },
    panel:{
        marginBottom: 15,
        borderColor:VCOLOR.xam,
        borderWidth:1,
        paddingBottom: 5,
       
    },
    panel_header:{
        backgroundColor:VCOLOR.do_dam,
        alignItems: 'center',
      
    },
    panel_body:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 5,
    },
    panel_title:{
        color:'white',
    
    },
    product_item:{
        alignItems: 'center',
       
        borderColor:VCOLOR.xam,
        borderWidth:1,
        margin: 2,
        overflow:"hidden",
        borderRadius:5,
        width:'47%',
        padding:3,
    },
    product_item_header:{
      
      
        alignItems: 'center',
    },
    product_item_title:{
       color:'black'
    },
    product_item_body:{

    },
    scroll_container:{
       
    },
    gia:{

    },
    KM:{
        color:"blue",
      
        marginRight:2,
        fontSize:10,
    },
    HOT:{
        color:"red",
     
        marginRight:2,
        fontSize:10,
    },
    NEW:{
        color:"green",
      
        marginRight:2,
        fontSize:10,
    }
});