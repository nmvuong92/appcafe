import React,{Component} from 'react';
import {
    View,Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    InteractionManager,
    Animated,
    Platform,
    WebView} from 'react-native';
import {window} from './../common/constants';
import GioHangPage from './pages/GioHangPage';
import Loading from './../common/components/Loading';
import {connect} from 'react-redux';
import {fetchSanPhamCT} from './../actions/sanPhamAction';
import {setNotificationCounter,cartCRUD} from './../actions/cartAction';
import Toast from 'react-native-root-toast';

import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { PricingCard,Card,Button } from 'react-native-elements'
import Header from './../common/components/Header';
import * as vUtils from './../common/vUtils';


const imageHeight = Math.round(window.width * 9 / 16);
const imageWidth = window.width;

import CartBadgeIcon from './../common/components/cartBadgeIcon';
import {VCOLOR} from './../common/constants';

class ChiTietSanPham extends Component{
    

  
    constructor(props){
        super(props);
        //
        const { params } = this.props.navigation.state;
        var read_only=vUtils.checkNotNullNotUndefined(params.read_only)&&params.read_only==true;
        
        const product_detail_id =params.id;
        this.state = {
            read_only:read_only,
            cart_nav: params.cart_nav,
            thanhtoan_nav:params.thanhtoan_nav,
            product_detail_id:params.id,
        };
     
     

    }

    goBack(){
        const {dispatch} = this.props;       
        dispatch(NavigationActions.back());
    }
    goCart(){
        const {dispatch} = this.props;       
        dispatch({
            type:this.state.cart_nav,
            thanhtoan_nav:this.state.thanhtoan_nav
        });
    }
    onPressMuaHang = (sanpham)=>{
        alert(sanpham.TenSanPham);
    }
      
    componentWillMount = () => {
        const {dispatch}  = this.props;
        dispatch(fetchSanPhamCT(this.state.product_detail_id));
        //console.log(this.props.navigation);
    };

    render(){
        const { params } = this.props.navigation.state;
        const itemId = params ? params.id : null;
        const {sanPhamReducer,dispatch,cartReducer} = this.props;
        let sanpham = sanPhamReducer.spChiTiet;
        let scalesPageToFit=Platform.OS==="ios"?true:false;
        return (
            sanpham==null?<Loading/>:
       
            <View style={styles.container}>

                 <Header

                    showBack={true}
                    //leftIcon='angle-left'
                    //leftIconAction={()=>this.goBack()}

                    // rightIcon='address-book'
                    // rightIconAction={()=>this.goBack()}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}
                
                   /*showCartBadgeIcon={!this.state.read_only}
                   CartBadgeIconAction={
                       
                        ()=>{
                            this.goCart();
                        }
                    }*/
                    title={sanpham.TenSanPham}
                />

      

                 <ScrollView>
                    <View style={{alignContent:"center",alignItems:"center"}}>
                        <Image
                            
                            style={styles.canvas}
                            source={{ uri: sanpham.HinhAnh }} 
                        />
                    </View>

                <Card title="Tên sản phẩm">
                    <View style={styles.user}>
                            <View style={{alignContent:"center",alignItems:"center"}}>
                                <Text style={vUtils.vStyles.h1}>{sanpham.TenSanPham}</Text>
                            </View>
                    </View>
                </Card>



                <Card title="Giá bán">
                    <View style={styles.center}>
                            <Text style={vUtils.vStyles.price}>{vUtils.formatVND(sanpham.Gia)}</Text>
                    </View>
                </Card>
                <Card title="Size">
                    <View style={styles.user}>
                            <Text style={styles.name}>{sanpham.Size}</Text>
                    </View>
                </Card>
                <Card title="Màu sắc">
                    <View style={styles.user}>
                            <Text style={styles.name}>{sanpham.MauSac}</Text>
                    </View>
                </Card>
               

                <Card title="Danh mục">
                    <View style={styles.user}>
                            <Text style={styles.name}>{sanpham.TenDanhMuc}</Text>
                    </View>
                </Card>
                <Card title="Mô tả" containerStyle={{margin:0,padding:0}}>

                    <WebView style={{height:200,}}
                        source={{html: "<!DOCTYPE html><head><meta charset='UTF-8'></head><body>"+sanpham.MoTa+"</body></html>",baseUrl:''}}
                        startInLoadingState={sanpham==null}
                        bounces={false}
                        scalesPageToFit={Platform.OS==="ios"?false:true}
                    />

                </Card>

                </ScrollView>

             
                <View style={styles.footer}>

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
                                icon={{name: 'cart-plus', type: 'font-awesome'}}
                                title='THÊM VÀO GIỎ HÀNG'
                                onPress={()=>{
                                    //dispatch(setNotificationCounter("+",1));
                                    dispatch(cartCRUD("+",sanpham,1));
                                    Toast.show("Đã thêm sản phẩm vào giỏ hàng", {position:Toast.positions.TOP});
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
    cartReducer:state.cartReducer
});
export default connect(mapStateToProps)(ChiTietSanPham);
const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
        paddingBottom: 30,
       
    },
    center:{
        alignContent:"center",
        alignItems:"center",
    },
   
    footer:{
        flexDirection:"row",
        position:'absolute',
        bottom:3,
        left:0,
        width:"100%",
     
        alignContent:"center",
        alignItems: "center",
        justifyContent:"center",
        padding:3
    },
      canvas: {
            width:imageWidth,
            height:imageHeight
      },
});
