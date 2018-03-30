import React,{Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import Header from './../../common/components/Header';
import Loading from './../../common/components/Loading';
import {postRegister} from './../../actions/authAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from 'react-native-camera';
class Qr extends Component{
    constructor(props){
        super(props);
        this.state = {
            qrcode: ''
        }
    }
    onBarCodeRead = (e) => this.setState({qrcode: e.data});
    goBack(){

        this.props.onRegisterSuccess();
        /*const {dispatch,cartReducer} = this.props;
        dispatch(NavigationActions.back());*/
    }
    render () {
        return (
            <View  style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                    >
                        <Text style={{
                            backgroundColor: 'white'
                        }}>{this.state.qrcode}</Text>
                    </Camera>
            </View>
        )
    }
}

const mapStateToProps = state=>({
    navReducer:state.navReducer,
    cartReducer:state.cartReducer,
    authReducer:state.authReducer,
 });
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  });