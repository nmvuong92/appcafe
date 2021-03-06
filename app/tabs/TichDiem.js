import React,{Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-root-toast';
import Camera from 'react-native-camera';
export default class TichDiem extends Component{
    constructor(props){
        super(props);
        this.state = {
            qrcode: ''
        }
    }
    onBarCodeRead = (e) => {
        Toast.show(e.data, {position:Toast.positions.CENTER});
        this.setState(
            {qrcode: e.data}
        );
    }
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