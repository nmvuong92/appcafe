import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import GioHangPage from './pages/GioHangPage';
import DSSP from './pages/DSSP';
import { SearchBar } from 'react-native-elements';
import {VCOLOR} from './../common/constants';
import {connect} from 'react-redux';
import {fetchSanPham} from './../actions/sanPhamAction';
import Loading from './../common/components/Loading';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/CircleSnail';

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
            page:0,
            page_size:10
        }
    }

    componentDidMount(){
        const {sanPhamReducer,dispatch} =this.props;
        this.setState({
            tukhoa:sanPhamReducer.tukhoa
        });
        //lay dssp
        dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa));
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
            dispatch(fetchSanPham(sanPhamReducer.danhmuc,sanPhamReducer.tukhoa));
        });
    }
    //
    render(){
        const {navReducer}=this.props;
       // console.log(navReducer);
        var data_id = 0;
        if(navReducer.dataBack!=null&&navReducer.dataBack.type=="chon_danh_muc"){
            data_id = navReducer.dataBack.data.id;
        }
        const {dispatch,sanPhamReducer} = this.props;
        return (
            sanPhamReducer.isFetching?<Loading/>:
            <View style={styles.container}>
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
                                            }}
                                        
                                            icon={{ type: 'font-awesome', name: 'search' }}
                                           
                                            onChangeText={this._onChangeSearchText}
                                            onClearText={()=>{
                                                this.search.blur();
                                            }}
                                            value={this.state.tukhoa}
                                            
                                            placeholder='Tìm kiếm...' />
                        </View>
                        <View>
                                <TouchableOpacity onPress={this.onPressSelectDM}>
                                    <Text>{sanPhamReducer.danhmuc!=null?sanPhamReducer.danhmuc.TenDanhMuc:"-Tất cả danh mục-"}</Text>
                                </TouchableOpacity>
                              {this._renderBtnTimKiem()}
                        </View>
                 </View>
                 <View style={{flex:1}}>
                        <FlatList
                            data={sanPhamReducer.products}
                            renderItem={({item}) =>
                                <TouchableOpacity key={item.ID} onPress={()=>{
                                    this.onPressProductItem(item);
                                }} style={styles.productItem}>
                                    <Image 
                                        source={{ uri: item.HinhAnh }} 
                                        indicator={ProgressBar} 
                                        style={styles.itemImage}/>
                                    <Text>{item.TenSanPham}</Text>
                                    <Text>{item.DanhMuc.TenDanhMuc}</Text>
                                    <Text>{item.Gia}</Text>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item,index) => item.ID+""}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}


                            onEndReached={this.onEndReached} 
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
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
});
export default connect(mapStateToProps)(SanPham);

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
