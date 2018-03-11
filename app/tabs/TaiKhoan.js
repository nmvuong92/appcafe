import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {Avatar,Card,Button,Divider} from 'react-native-elements';
import Separator from './../common/components/Separator';
import Loading from './../common/components/Loading';
import {connect} from 'react-redux';
import DSSP from './pages/DSSP';
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

        const {authReducer,navReducer} = this.props;
        //let isLoggedIn=authReducer.isLoggedIn;
        let isLoggedIn=true;
        return (
            this.state.isloading?<Loading/>:!isLoggedIn?<Text>Vui long Dang Nhap</Text>:this.state.dssp?<DSSP/>:
            <View style={{alignContent:'center',justifyContent:'center',alignItems: 'center',}}>
           
                <Avatar
                        xlarge
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        />


              <Divider style={{ backgroundColor: 'blue' }} />

                <Card
                title='HELLO WORLD'
                image={require('./../assets/images/logo.png')}>
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />
                </Card>

                <Divider style={{ backgroundColor: 'blue' }} />
         
            </View>
        );
    };
}

//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {authReducer,navReducer} = state;
})(TaiKhoan);
