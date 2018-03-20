import React,{Component} from 'react';
import {
    View,Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    
    FlatList,
    InteractionManager,
    Animated,
    Platform} from 'react-native';
import {window} from './../common/constants';
import NganhHangPage from './pages/NganhHangPage';
import {connect} from 'react-redux';
import {fetchListDMSP} from './../actions/danhMucSanPhamAction';
import Loading from './../common/components/Loading';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';

import {fetchSanPham} from './../actions/sanPhamAction';
import Header from './../common/components/Header';
import{NavigationActions} from 'react-navigation';
import {VCOLOR} from './../common/constants';

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

class NganhHang extends Component{
    constructor(props){
        
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
          selectedCat1ID:-1,
          selectedCat2ID:-1,
          appIsReady: false,
          dataDMSP:[],
          page:1,
          pageSize:20,
        };


    }

     
    goBack(){
        const {dispatch} = this.props;       
        dispatch(NavigationActions.back());
    }

    componentDidMount(){
        const {dispatch} =this.props;
        //lay dssp
        dispatch(fetchListDMSP());
    };


    onPressAllItem = ()=>{
        const {navReducer,dispatch,sanPhamReducer}  = this.props;
        //dispatch({type:"goBack",dataBack:"123"});
        dispatch({type:"SanPham_Screen"});
        //lay dssp
        dispatch(fetchSanPham(null,sanPhamReducer.tukhoa,1,this.state.pageSize));
    }

    onPressItem = (item)=>{
        const {navReducer,dispatch,sanPhamReducer}  = this.props;
       // dispatch({type:"goBack",dataBack:"123"});
        dispatch({type:"SanPham_Screen"});
        //lay dssp
        dispatch(fetchSanPham(item,sanPhamReducer.tukhoa,1,this.state.pageSize));
    }


    render(){
        const {danhMucSanPhamReducer} = this.props;
        return (
            danhMucSanPhamReducer.isFetching?<Loading/>:
            <View>
                <Header
                    //showBack={true}
                    // leftIcon='angle-left'
                    // leftIconAction={()=>this.goBack()}

                    // rightIcon='address-book'
                    // rightIconAction={()=>this.goBack()}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}

                    title="Chọn danh mục sản phẩm"
                />
                <FontAwesome.Button  name="th-list" style={{alignContent:"center",justifyContent:"center",alignItems:"center"}} alignItems="center" backgroundColor="#3b5998" borderRadius={0} onPress={()=>{
                    this.onPressAllItem();
                }}>
                    Tất cả danh mục sản phẩm
                </FontAwesome.Button>
                <FlatList
                    data={danhMucSanPhamReducer.data}
                    renderItem={({item}) =>
                        <TouchableOpacity key={item.ID} onPress={()=>{
                            this.onPressItem(item);
                        }} style={styles.productItem}>
                            <Image 
                                source={{ uri: item.HinhAnh }} 
                                indicator={ProgressBar} 
                                style={styles.itemImage}/>
                            <Text>{item.TenDanhMuc}</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item,index) => item.ID+""}
                    numColumns={2}
                    contentContainerStyle={{paddingBottom:150}}
                />
            </View>
        );
    };
    
}
const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    danhMucSanPhamReducer:state.danhMucSanPhamReducer,
    sanPhamReducer:state.sanPhamReducer,
});
export default connect(mapStateToProps)(NganhHang);

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
        width:'49%'
        
    },
    itemImage:{
        width: "95%",
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
