import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Loading from './../../common/components/Loading';
import {NavigationActions} from 'react-navigation';
class TichDiemPage extends Component{
    componentWillMount(){
    
    }
    render(){
        return (
           <Loading/>
        );
    };
}
const mapStateToProps = state=>({
    isLoggedIn:state.authReducer.isLoggedIn,
});


//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(TichDiemPage);