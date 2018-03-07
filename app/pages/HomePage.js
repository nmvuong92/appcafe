import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Image,Dimensions,ScrollView} from 'react-native';

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
import {CalcUP,CalcDOWN} from './../actions/CalcAction';
import LoadMoreFooter from './../common/components/LoadMoreFooter';

let deviceWidth= Dimensions.get('window').width;

export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state={
            searchClearIcon: false,
            newProductList:[{
                name:"Product 1",
                image:""
            }],
        }
    }

      
    _onChangeSearchText = (searchText) => {
        if (searchText) {
        this.setState({searchClearIcon: true})
        } else {
        this.setState({searchClearIcon: false})
        }
    }

    render(){
       
        return (
            
            <View style={styles.container}>
                
                <View style={styles.searchBar}>
                    <View style={{flex:9}}>
                        {/* <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'white'}} /> */}
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
                          
                            
                            placeholder='Tìm kiếm...' />
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        {/* <FontAwesome.Button name='search' borderRadius={0} backgroundColor={VCOLOR.do_dam} color='black'
                            onPress={()=>{
                                console.log("GioHang");
                            }}
                        ></FontAwesome.Button> */}
                        <Ionicons.Button name='md-cart' borderRadius={0} backgroundColor={VCOLOR.do_dam} color='black'
                            onPress={()=>{
                                console.log("GioHang");
                            }}
                        ></Ionicons.Button>
                    </View>
                </View>


                <ScrollView contentContainerStyle={styles.scroll_container}>
                            <View style={styles.banner}>
                                <Image style={styles.banner_img} source={require('./../assets/images/banner.jpg')}/>
                            </View>
                        
                            <View style={styles.header_menu}>
                                <View style={{flex:1}}>
                                    <Image style={{width:80,height:50}} source={require('./../assets/images/logo.png')}/>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'space-around'}}>
                                        <TouchableOpacity style={styles.head_btn} onPress={()=>{
                                                this.props.navigation.navigate('SanPham');
                                            }}> 
                                            <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon1_32.png')}/>
                                            <Text style={{fontSize:12}}>Sản phẩm</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={styles.head_btn} onPress={()=>{
                                                this.props.navigation.navigate('KhuyenMai');
                                            }}> 
                                            <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon2_32.png')}/>
                                            <Text style={{fontSize:12}}>Khuyến mãi</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.head_btn} onPress={()=>{

                                            }}> 
                                            <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon3_32.png')}/>
                                            <Text style={{fontSize:12}}>Đăng ký</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={styles.head_btn} onPress={()=>{

                                            }}> 
                                            <Image style={{width:32,height:32}} source={require('./../assets/images/icons/icon4_32.png')}/>
                                            <Text style={{fontSize:12}}>Đăng nhập</Text>
                                        </TouchableOpacity>


                                </View>
                            </View>


                            <View style={styles.panel}>
                                    <View style={styles.panel_header}>
                                            <Text style={styles.panel_title}>SẢN PHẨM MỚI</Text>
                                    </View>      
                                    <View style={styles.panel_body}>
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View>       
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View>
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View>
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View> 


                                        <TouchableOpacity style={{backgroundColor:VCOLOR.do_dam}} onPress={()=>{
                                                //load more
                                                dispatch(CalcUP(2));


                                        }}> 
                                                <Text style={{fontSize:12,color:'white',padding:5}}>Xem thêm >></Text>
                                        </TouchableOpacity>
                                              
                                    </View>      
                            </View>


                               <View style={styles.panel}>
                                    <View style={styles.panel_header}>
                                            <Text style={styles.panel_title}>SẢN PHẨM HOT</Text>
                                    </View>      
                                    <View style={styles.panel_body}>
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View>       
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View>
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View>
                                        <View style={styles.product_item}>
                                                <View style={styles.product_item_header}>
                                                        <Text style={styles.product_item_title}>Kiếng xe</Text>
                                                </View>
                                                <View style={styles.product_item_body}>
                                                    <Image style={{width:100,height:100}} source={require('./../assets/images/sc.png')}/>
                                                </View>
                                        </View> 


                                        <TouchableOpacity style={{backgroundColor:VCOLOR.do_dam,padding:5}} onPress={()=>{

                                        }}> 
                                                <Text style={{fontSize:12,color:'white'}}>Xem thêm >></Text>
                                        </TouchableOpacity>
                                        
                                        <View>
                                            <LoadMoreFooter/>
                                        </View> 
                                    </View>      
                            </View>

                              <View style={{backgroundColor: "#ECEFF1"}}>
  
                                <ScrollView horizontal={true}>
                                
                                    
                                
                                    <Image source={require('./../assets/images/sc.png')} />
                                
                                    <Image source={require('./../assets/images/sc.png')} />
                                
                                    <Image source={require('./../assets/images/sc.png')} />
                                
                                    <Image source={require('./../assets/images/sc.png')} />
                                
                                    <Image source={require('./../assets/images/sc.png')} />
                                
                                
                                
                                </ScrollView>
                                
                                </View>



                               

                </ScrollView>            
                
                
                </View>    
               


            // <View>
            //     <Text>HOME</Text>

            //     <TouchableOpacity onPress={()=>{
            //             this.props.navigation.navigate("DetailScreen");
            //     }}>
            //         <Text>Go to detail</Text>
            //     </TouchableOpacity>
            // </View>
        );
    };
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
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
        height:50,
        backgroundColor:VCOLOR.xam,
        
        flexDirection:'row'
    },
    head_btn:{
       alignItems:'center'
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
        width: '100%', 
        paddingTop: 5,
    },
    panel_title:{
        color:'white',
    
    },
    product_item:{
        alignItems: 'center',
        width: '48%', 
        borderColor:VCOLOR.xam,
        borderWidth:1,
        margin: 2,
        borderRadius:5
    },
    product_item_header:{
        backgroundColor:VCOLOR.xam,
        width:'100%',
        alignItems: 'center',
    },
    product_item_title:{
       color:'black'
    },
    product_item_body:{

    },
    scroll_container:{
        paddingVertical: 20
    },
});