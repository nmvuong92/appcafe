import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,SafeAreaView} from 'react-native';
import Header from './../common/components/Header';
import {fetchSanPhamKhuyenMai } from './../actions/khuyenMaiAction';
import {connect} from 'react-redux';
import {VCOLOR} from './../common/constants';
import LoadingActivityIndicator from './../common/components/LoadingActivityIndicator';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';
import { HeadPadding,formatVND,vStyles } from './../common/vUtils';
import CornerLabel from './../components/CornerLabel';

class KhuyenMai extends Component{

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state={
            cart_nav:params.cart_nav,
            thanhtoan_nav:params.thanhtoan_nav,
       
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
            page_size:10
        }
    }

    componentDidMount(){
        const {sanPhamKhuyenMaiReducer,dispatch} = this.props; 
        dispatch(fetchSanPhamKhuyenMai());
    }

      //pull refresh
      handleRefresh=()=>{  
             //scrolltop
       this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});
       

        const {sanPhamKhuyenMaiReducer,dispatch} =this.props;
         this.setState({
             page:1,
             data:[],
             refreshing:sanPhamKhuyenMaiReducer.isFetching,
             seed:this.state.seed+1,
         },()=>{
             //lay dssp
             dispatch(fetchSanPhamKhuyenMai());
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
            //scrolltop
       this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});
       

         const {sanPhamKhuyenMaiReducer,dispatch} =this.props;
         this.setState({
             page:this.state.page+1,
         },()=>{
            dispatch(fetchSanPhamKhuyenMai());
         });
     }
    //bam vao san pham item
    onPressProductItem = (item)=>{
        const {navReducer,dispatch}  = this.props;
        dispatch({
            type:"Home_KhuyenMai_ChiTietSanPham_Wap",
            id:item.ID,
            cart_nav:this.state.cart_nav,
            thanhtoan_nav:this.state.thanhtoan_nav,
        });
    }


    render(){

        const {navReducer}=this.props;
        const {dispatch,sanPhamKhuyenMaiReducer} = this.props;
        let isFetching = sanPhamKhuyenMaiReducer.isFetching;
        let Paging = sanPhamKhuyenMaiReducer.Paging;

        return (
            <View style={styles.container}>
                <Header
                    showBack={true}
                    //leftIcon='angle-left'
                    //leftIconAction={()=>this.goBack()}
                
                    //rightIcon='trash'
                    //rightIconAction={()=>{}}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}

                    //showCartBadgeIcon={true}
                    //CartBadgeIconAction={()=>this.goBack()}
                    title={"Sản phẩm khuyến mãi"}
            />
            {
                isFetching?<LoadingActivityIndicator loading={isFetching}/>:sanPhamKhuyenMaiReducer.List.length==0?<View style={styles.container}><Text>0 sản phẩm</Text></View>:
                
          
                 <SafeAreaView style={{flex:1}}>
                        <FlatList
                            ref="FlatList"
                            data={sanPhamKhuyenMaiReducer.List}
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
                      
                 </SafeAreaView>
            
        }
            </View>
        );
    };
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    sanPhamKhuyenMaiReducer:state.sanPhamKhuyenMaiReducer,
});
export default connect(mapStateToProps)(KhuyenMai);


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
