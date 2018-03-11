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


class NganhHang extends Component{
    constructor(props){
        
        super(props);
      
        this.state = {
          selectedCat1ID:-1,
          selectedCat2ID:-1,
          appIsReady: false,
          dataDMSP:[]
        };


    }

     
    
    componentDidMount(){
        const {dispatch} =this.props;
        //lay dssp
        dispatch(fetchListDMSP());
    };


    onPressItem = (item)=>{
        const {navReducer,dispatch,sanPhamReducer}  = this.props;
        dispatch({type:"goBack",dataBack:"123"});
        //lay dssp
        dispatch(fetchSanPham(item,sanPhamReducer.tukhoa));
    }


    render(){
        const {danhMucSanPhamReducer} = this.props;
        return (
            danhMucSanPhamReducer.isFetching?<Loading/>:
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
            />
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
        borderWidth:1,
        marginBottom:2,
        
    },
    itemImage:{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
