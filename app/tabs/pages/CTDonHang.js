import React,{Component} from 'react';
import {View,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Header from './../../common/components/Header';
import commonStyles,{colors} from './../../common/commonStyles';
import { HeadPadding,formatVND,vStyles,checkNotNullNotUndefined } from './../../common/vUtils';
import Loading from './../../common/components/Loading';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';
import {Badge} from 'react-native-elements';

class CTDonHang extends Component{
    constructor(props){
        super(props);

        const { params } = this.props.navigation.state;

        console.log("--------------CTDonHang params------------");
        console.log(params);
       
        let detail_nav=(checkNotNullNotUndefined(params)&&checkNotNullNotUndefined(params.detail_nav))?params.detail_nav:"DonHang_CTDonHang_Screen";
        this.state={
            detail_nav:detail_nav,
            DonHang: params.DonHang,
        }
    }
    render(){
        return (
            <View>
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
                    title={"Chi tiết đơn hàng: "+this.state.DonHang.MaDonHang}
                />
                <View style={styles.item}>
                    <View style={styles.cot1}>
                        <Text>Sản phẩm</Text>
                    </View>
                    <View style={styles.cot2}>
                        <Text> Đơn giá X Số lượng</Text>
                    </View>
                    <View style={styles.cot3}>
                        <Text>Thành tiền</Text>
                    </View>    
                </View>
                {
                    this.state.DonHang.CTDonHangs.length==0?
                    <View style={styles.null}>
                        <View style={styles.cot1}>
                            <Text>0 sản phẩm</Text>
                        </View>
                    </View>
                    :null
                }
                {
                    this.state.DonHang.CTDonHangs.map((item,index)=>{
                        return (
                            <View style={styles.item} key={item.Id+""+index}>
                                <View style={styles.cot1}>
                                    <Image 
                                        source={{ uri: item.SanPham.HinhAnh }} 
                                        indicator={ProgressBar} 
                                        style={styles.itemImage}/>
                                    <Text>{item.SanPham.TenSanPham}</Text>
                                </View>
                                <View style={styles.cot2}>
                                    <Text>{formatVND(item.DonGia)}</Text>
                                    <Badge containerStyle={{ backgroundColor: 'violet',width:120}}>
                                        <Text>{item.SoLuong+" cái"}</Text>
                                    </Badge>

                                    

                                 
                                </View>
                                <View style={styles.cot3}>
                                    <Text>{formatVND(item.ThanhTien)}</Text>
                                </View>
                            </View>
                        )
                    })
                }

                <View  style={[styles.item,styles.foot]} >
                            <View style={styles.cot1}>
                                  
                            </View>
                            <View style={styles.cot2}>
                                
                            </View>
                            <View style={styles.cot3}>
                                <Text>{formatVND(this.state.DonHang.TongTienHang)}</Text>
                            </View>
                </View>
              

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
export default connect(mapStateToProps)(CTDonHang);


const styles = StyleSheet.create({
    item:{
        width:'100%',
        borderWidth:1,
        borderColor:"red",
        flexDirection:"row",
    },
    itemImage:{
      
        width:50,
        height:50,
    },
    cot1:{
        alignContent:"center",alignItems:"center",
        borderWidth:1,
        borderColor:"gray",
        width:'40%'
    },
    cot2:{
        alignContent:"center",alignItems:"center",
        borderWidth:1,
        borderColor:"gray",
        width:'40%',
        
    },
    cot3:{
        alignContent:"center",alignItems:"center",
        borderWidth:1,
        borderColor:"gray",
        width:'20%'
    },
    foot:{
        backgroundColor:"yellow",
    }
});