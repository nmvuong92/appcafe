import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import GioHangPage from './pages/GioHangPage';
import DSSP from './pages/DSSP';
import { SearchBar } from 'react-native-elements';
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

class GioHang extends Component{
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
            page:0,
            page_size:10
        }
    }
   
    componentDidMount(){
        const {sanPhamReducer,cartReducer,dispatch} =this.props;
        dispatch(cartCRUD("sync"));
        console.log("sync now");
        //lay dssp
        //dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa));
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
    onPressProductItem = (item)=>{
        const {navReducer,dispatch}  = this.props;
        dispatch({type:"SanPham_ChitietSanPham_Screen",id:item.ID});
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
    //
    render(){
        const {navReducer}=this.props;
       // console.log(navReducer);
        const {dispatch,sanPhamReducer,cartReducer} = this.props;


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
                                <View key={item.ID} style={styles2.containerStyle}>
                                    <Image 
                                        source={{ uri: item.HinhAnh }} 
                                        indicator={ProgressBar} 
                                        style={styles2.imageStyle}/>

                                         <View style={styles2.textStyle}>
                                            <Text style={{ color: '#2e2f30' }}>{item.TenSanPham}</Text>
                                            <View style={styles2.priceStyle}>
                                            <Text style={{ color: '#2e2f30', fontSize: 12 }}>${item.Gia}</Text>
                                            </View>
                                        </View>

      <View style={styles2.counterStyle}>
        <Icon.Button 
          name="ios-remove" 
          size={25} 
          color='#fff' 
          backgroundColor='#fff' 
          style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }} 
          iconStyle={{ marginRight: 0 }}
          onPress={()=>{
                dispatch(cartCRUD("-",item,1));
            }}
        />

        <Text>{item.SLSP}</Text>

        <Icon.Button 
          name="ios-add" 
          size={25} 
          color='#fff' 
          backgroundColor='#fff' 
          style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }} 
          iconStyle={{ marginRight: 0 }}
          onPress={()=>{
                dispatch(cartCRUD("+",item,1));
          }}
        />

      </View>


                               
                                      
                               
                                </View>
                            }
                            keyExtractor={(item,index) => item.ID+""}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}  

                            onEndReached={this.onEndReached} 
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        />
                 </View>
                 <View style={styles.footer}>
                                        <Button
                                            large
                                            backgroundColor="red"
                                            color="white"
                                            icon={{name: 'opencart', type: 'font-awesome'}}
                                            title='THANH TOÁN'
                                            onPress={()=>{
                                              
                                                
                                               
                                            }}
                                            />

                  </View>
               
            </View>
        );
    };
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamReducer:state.sanPhamReducer,
    cartReducer:state.cartReducer,
});
export default connect(mapStateToProps)(GioHang);

const styles=StyleSheet.create({
    container:{
        flex:1,
        position:"relative",
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
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
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
      width: 40,
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