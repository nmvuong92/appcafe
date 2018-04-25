import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,ImageBackground} from 'react-native';
import GioHangPage from './pages/GioHangPage';
import DSSP from './pages/DSSP';
import { SearchBar,Button } from 'react-native-elements';
import {VCOLOR} from './../common/constants';
import {connect} from 'react-redux';
import {fetchSanPham} from './../actions/sanPhamAction';
import Loading from './../common/components/Loading';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';
import { HeadPadding,formatVND,vStyles } from '../common/vUtils';
import CornerLabel from './../components/CornerLabel';
import Header from './../common/components/Header';
import {setNotificationCounter,cartCRUD} from './../actions/cartAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
class SanPham extends Component{
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
            page_size:100
        }
    }

    componentDidMount(){
        const {sanPhamReducer,dispatch} =this.props;
        this.setState({
            tukhoa:sanPhamReducer.tukhoa
        });
        //lay dssp
        dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa,this.state.page,this.state.page_size));
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
        dispatch({
            type:"SanPham_ChitietSanPham_Wrap",
            id:item.ID,
            cart_nav:"SanPham_ChiTietSanPham_GioHang_Wrap",
            thanhtoan_nav:"SanPham_ChiTietSanPham_GioHang_ThanhToanForm_Screen",
        });
    }

    //bam vao nut tim kiem
    onPressTimKiem = () => {

        const {sanPhamReducer,dispatch} = this.props;
        // dispatch();
        console.log(this.state.tukhoa);
        dispatch(fetchSanPham(sanPhamReducer.danhmuc,this.state.tukhoa,this.state.page,this.state.page_size));
    
    }
    //hien thi chon danh muc san pham
    onPressSelectDM = () => {
        const {dispatch} = this.props;
        dispatch({type:'SanPham_NganhHang_Screen',page:this.state.page,pageSize:this.state.page_size});
    }
    //hien thi btn tim kiem
    _renderBtnTimKiem(){
        if(this.state.showBtnTimKiem==true){
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
       //scrolltop
       this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});
       const {sanPhamReducer,dispatch} =this.props;
        this.setState({
            page:1,
            data:[],
            refreshing:sanPhamReducer.isFetching,
            seed:this.state.seed+1,
        },()=>{
            //lay dssp
            dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa,this.state.page,this.state.page_size));
            
        });
    }
    //
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
            dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa,this.state.page,this.state.page_size));
        });
    }
    //
    render(){
        const {quanReducer} = this.props;
        if( quanReducer.Quan==null){
            return this._renderRequestQR();
        }else{
            return this._renderMain();
        }
    };
    _renderRequestQR(){
       return (
        <View style={styles.container}>
            <Header
            showBack={true}
            // leftIcon='angle-left'
            // leftIconAction={()=>this.goBack()}

            // rightIcon='address-book'
            // rightIconAction={()=>this.goBack()}

            // rightIcon2='heart'
            // rightIconAction2={()=>this.goBack()}

            title={sanPhamReducer.danhmuc!=null?sanPhamReducer.danhmuc.TenDanhMuc:"-Tất cả danh mục sản phẩm-"}
        />
        <Text>Chưa nhập mã QR</Text>
    </View>
       );
    }
    _renderMain(){

        const {navReducer}=this.props;
        // console.log(navReducer);
         var data_id = 0;
         if(navReducer.dataBack!=null&&navReducer.dataBack.type=="chon_danh_muc"){
             data_id = navReducer.dataBack.data.id;
         }
         const {dispatch,sanPhamReducer} = this.props;
         let isFetching = sanPhamReducer.isFetching;
         let Paging=sanPhamReducer.Paging;
         const {quanReducer} = this.props;

        return(
            <View style={styles.container}>
           
            <View style={styles.container}>
                

                  <Header
                    showBack={true}
                    // leftIcon='angle-left'
                    // leftIconAction={()=>this.goBack()}

                    // rightIcon='address-book'
                    // rightIconAction={()=>this.goBack()}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}

                    title={sanPhamReducer.danhmuc!=null?sanPhamReducer.danhmuc.TenDanhMuc:"-Tất cả danh mục sản phẩm-"}
                />

                
                <View>
                        <View>
                            <SearchBar
                                            ref={search => this.search = search}
                                            lightTheme
                                            round
                                            clearIcon={this.state.searchClearIcon}
                                            containerStyle={{
                                                backgroundColor:VCOLOR.do_dam,
                                                borderBottomColor: VCOLOR.do_dam,
                                                borderTopColor: VCOLOR.do_dam,
                                                height: 0,
                                                opacity: 0
                                            }}
                                        
                                            icon={{ type: 'font-awesome', name: 'search' }}
                                           
                                            onChangeText={this._onChangeSearchText}
                                            onClearText={()=>{
                                                this.search.blur();
                                            }}
                                            value={this.state.tukhoa}
                                            
                                            placeholder='Tìm kiếm...' />
                        </View>
                    
                 </View>
                 <View style={{flex:1}}>
                        {
                            sanPhamReducer.List.length==0?
                            <View>
                                <Text>0 sản phẩm</Text>
                            </View>
                            :null
                        }
                        <FlatList
                            ref="FlatList"
                            data={sanPhamReducer.List}
                            renderItem={({item}) =>
                                <TouchableOpacity key={item.ID} onPress={()=>{
                                    this.onPressProductItem(item);
                                }} style={styles.productItem}>
                                  

                                    <Image 
                                        source={{ uri: item.HinhAnh }} 
                                        indicator={ProgressBar} 
                                        style={styles.itemImage}/>
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

                                    <Button
                                            buttonStyle={{
                                                width: "100%",
                                                borderColor: "transparent",
                                                borderWidth: 0,
                                                borderRadius: 10
                                            }}
                                            
                                            backgroundColor="red"
                                            color="white"
                                            icon={{name: 'cart-plus', type: 'font-awesome'}}
                                            title='Thêm'
                                            onPress={()=>{
                                                //dispatch(setNotificationCounter("+",1));
                                                dispatch(cartCRUD("+",item,1));
                                                Toast.show("Đã thêm vào giỏ hàng", {position:Toast.positions.TOP});
                                            }}
                                        />


                                        {item.Hot?<CornerLabel
                                            alignment={'left'}
                                            cornerRadius={36}
                                            style={{backgroundColor: 'red', }}
                                            textStyle={{fontSize: 12, color: '#fff', }}>
                                            HOT
                                        </CornerLabel>:null}
                                </TouchableOpacity>
                            }
                            keyExtractor={(item,index) => item.ID+""}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}

                            numColumns={2}
                            //onEndReached={this.onEndReached} 
                            //onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            contentContainerStyle={{paddingBottom:150}}
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
            
               
                </View>
            
            </View>

        );
    }
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamReducer:state.sanPhamReducer,
    quanReducer:state.quanReducer
});
export default connect(mapStateToProps)(SanPham);

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
        width:'49%',
        overflow:"hidden",
    },
    itemImage:{
        width: "95%",
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
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
