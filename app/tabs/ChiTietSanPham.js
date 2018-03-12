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
    Platform} from 'react-native';
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
const users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]

class ChiTietSanPham extends Component{
    

  
    constructor(props){
        super(props);
        //
      
        this.state = {
       
        };


        const { params } = this.props.navigation.state;
        const itemId = params ? params.id : null;
       
     
        const {sanPhamReducer,dispatch}  = this.props;
        dispatch(fetchSanPhamCT(itemId));

    }

    goBack(){
        const {dispatch} = this.props;       
        dispatch(NavigationActions.back());
    }

    onPressMuaHang = (sanpham)=>{
        alert(sanpham.TenSanPham);
    }
      
    componentWillMount = () => {
    
    };

    render(){
        const { params } = this.props.navigation.state;
        const itemId = params ? params.id : null;
        const {sanPhamReducer,dispatch,cartReducer} = this.props;
        let sanpham = sanPhamReducer.spChiTiet;
        return (
            sanpham==null?<Loading/>:
       
            <View style={styles.container}>

                 <Header

                    //showBack={true}
                    leftIcon='angle-left'
                    leftIconAction={()=>this.goBack()}

                    // rightIcon='address-book'
                    // rightIconAction={()=>this.goBack()}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}
                
                    showCartBadgeIcon={true}
                    CartBadgeIconAction={()=>this.goBack()}
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


                <PricingCard
                    color='#4f9deb'
                    title='Giá bán'
                    price={vUtils.formatVND(sanpham.Gia)}
                    info={[sanpham.DanhMuc.TenDanhMuc]}
                    button={{ title: 'MUA HÀNG', icon: 'flight-takeoff' }}
                    onButtonPress = {()=>{
                        alert("Buyed");
                    }}
                />
                
                <Card title="Giá bán">
                    <View style={styles.user}>
                            <Text style={styles.name}>{sanpham.Gia}</Text>
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
                <Card title="Mô tả">
                    <View style={styles.user}>
                            <Text style={styles.name}>{sanpham.MoTa}</Text>
                    </View>
                </Card>

                <Card title="Danh mục">
                    <View style={styles.user}>
                            <Text style={styles.name}>{sanpham.DanhMuc.TenDanhMuc}</Text>
                    </View>
                </Card>


                </ScrollView>

             
                <View style={styles.footer}>
                    <Button
                        large
                        backgroundColor="red"
                        color="white"
                        icon={{name: 'opencart', type: 'font-awesome'}}
                        title='MUA HÀNG'
                        onPress={()=>{
                            dispatch(setNotificationCounter("+",1));
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
        position: 'relative'
       
    },
   
  
      canvas: {
            width:imageWidth,
            height:imageHeight
      },
});
