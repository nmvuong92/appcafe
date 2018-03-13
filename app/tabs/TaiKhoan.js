import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    ScrollView,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    InteractionManager,
    ImageBackground

} from 'react-native';
import {Avatar,Card,Button,Divider} from 'react-native-elements';
import Loading from './../common/components/Loading';
import {connect} from 'react-redux';
import { HeadPadding } from '../common/vUtils';

import {window} from './../common/constants';
import commonStyles,{colors} from './../common/commonStyles';
import ImageButton from './../common/ImageButton';
import TextButton from './../common/TextButton';
class TaiKhoan extends Component{
    constructor(props){
        super(props);
        this.state={
            isloading:false,
            dssp:true
        }

        //setTimeout(() => {this.setState({isloading: false})}, 1000)
    }
   
   
    render(){
        const {authReducer,dispatch} = this.props;
        let isLoggedIn = true;//authReducer.isLoggedIn;
        return (
            !isLoggedIn?
            <View style={{flex:1,alignContent:'center',justifyContent:'center',alignItems: 'center',alignSelf:'center'}}>
                <HeadPadding/>
                <TouchableOpacity onPress={()=>{
                    
                     dispatch({type:'LoginScreen'});
                }}>
                    <Text>Đăng nhập</Text>
                </TouchableOpacity>

                 <TouchableOpacity onPress={()=>{
                       dispatch({type:'RegisterScreen'});
                }}>
                    <Text>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            :
            <View style={styles.container}>
            <View style={styles.headerWrap}>
                <Text style={styles.header}>我的</Text>
            </View>
            <ScrollView style={{
                backgroundColor: 'rgba(240,240,240,0.9)'
            }}>
                <ImageBackground style={styles.myBgImage} source={require('./../assets/images/img_my_bg.png')}>
                    <TouchableOpacity
                        style={styles.loginWrap}
                        onPress={this._onPressHead.bind(this)}
                    >
                        {true?
                            <Image style={styles.headIcon} source={require('./../assets/images/img_default_head.png')}/> :
                            <Image style={styles.headIcon} source={require('./../assets/images/img_default_head.png')}/>
                        }
                        {true ?
                            <Text style={styles.login}>027747892794724</Text> :
                            <Text style={styles.login}>点击登录</Text>
                        }
                    </TouchableOpacity>
                </ImageBackground>

                <Text style={{
                    width: window.width,
                    height: 40,
                    position: 'absolute',
                    padding: 10,
                    fontSize: 18,
                    backgroundColor: 'white'
                }}>
                    我的订单
                </Text>
                <Text
                    style={{position: 'absolute', padding: 10, fontSize: 18, marginLeft: window.width - 30}}>
                    >
                </Text>
                <View style={{
                    width: window.width,
                    height: 2 / PixelRatio.get(),
                    backgroundColor: 'gray',
                    marginTop: 40
                }}>
                </View>
                <View style={{
                    padding: 10,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white'
                }}>
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/moneys.png') }
                        text={'代付款'}
                    />
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/bus.png') }
                        text={'物流'}
                    />
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/tosts.png') }
                        text={'物流'}
                    />

                </View>


                <Text style={{
                    marginTop: 10,
                    width: window.width,
                    height: 40,
                    position: 'absolute',
                    padding: 10,
                    fontSize: 18,
                    backgroundColor: 'white'
                }}>
                    我的钱包
                </Text>
                <View style={{
                    width:window.width,
                    height: 2 / PixelRatio.get(),
                    backgroundColor: 'gray',
                    marginTop: 50
                }}>
                </View>

                <View style={{
                    padding: 15,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white'
                }}>
                    <TextButton

                        onPress={() => {
                        } }
                        text={'物流'}
                        upText={'0'}
                    />
                    <TextButton

                        onPress={() => {
                        } }
                        text={'物流'}
                        upText={'0'}
                    />
                    <TextButton

                        onPress={() => {
                        } }
                        text={'物流'}
                        upText={'0'}
                    />
                    <ImageButton
                        imageStyle={{
                            width: 20,
                            height: 20,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/RMB.png') }
                        text={'优红利'}
                    />
                </View>

                <View style={{
                    marginTop: 10,
                    padding: 15,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white'
                }}>
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/sc.png') }
                        text={'我的收藏'}
                    />
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/yj.png') }
                        text={'浏览记录'}
                    />
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/wh.png') }
                        text={'帮组中心'}
                    />
                    <ImageButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                        onPress={() => {
                        } }
                        imageUrl={require('./../assets/images/yjj.png') }
                        text={'意见反馈'}
                    />

                </View>

                <TouchableOpacity style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    position: 'relative',
                    backgroundColor: 'white'
                }} activeOpacity={0.75}>
                    <Image
                        source={require('./../assets/images/ri.png') }
                        style={{width: 30, height: 30, marginLeft: 20}}
                    />
                    <Text style={{marginLeft: 10}}>
                        每日签到
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        padding: 12,
                        fontSize: 18,
                        marginLeft: window.width - 150
                    }}>
                        >
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={{
                    marginTop: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    position: 'relative',
                    backgroundColor: 'white'
                }} activeOpacity={0.75}>
                    <Image
                        source={require('./../assets/images/kf.png')}
                        style={{width: 30, height: 30, marginLeft: 20}}
                    />
                    <Text style={{marginLeft: 10}}>
                        联系客服
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        padding: 12,
                        fontSize: 18,
                        marginLeft: window.width - 150
                    }}>
                        >
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[commonStyles.btn, {marginBottom:20}]}
                    onPress={() => {
                        Alert.alert(
                            "确定要登录么?",
                            "",
                            [
                                {text:"确定", onPress:()=>{this._logout()}},
                                {text:"取消", onPress:()=>{}},
                            ]
                        );
                    }}
                    underlayColor={colors.backGray}
                >
                    <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> 退出登录 </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        );
    }

    _onPressHead() {
     
    }

    _logout() {
        InteractionManager.runAfterInteractions(() => {
           
        });
    }

}

//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {authReducer,navReducer} = state;
})(TaiKhoan);



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 16,
    },

    myBgImage: {
        flex: 1,
        width: window.width,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headIcon: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    loginWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        borderColor: 'white',
        color: 'white',
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
        borderRadius: 3,
    },
});
