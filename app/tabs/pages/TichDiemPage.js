import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {CalcUP,CalcDOWN,vfetch} from './../../actions/CalcAction';
import Loading from './../../common/components/Loading';
import {NavigationActions} from 'react-navigation';
class TichDiemPage extends Component{
    componentWillMount(){
        const {dispatch,calcReducer} = this.props;
        dispatch(CalcUP(2));
    }
    render(){
        const {calcReducer} = this.props;
        let myValue = calcReducer.value;
        let list = calcReducer.list;
        let isLoading = calcReducer.isLoading;

        const {dispatch,authReducer} = this.props;
        
        return (
            isLoading?<Loading/>:<View>
                <Text>TichDiemPage {myValue}</Text>
                
                <Text>{list.length}</Text>
                <TouchableOpacity onPress={()=>{
                  dispatch(NavigationActions.navigate({routeName:'LogoutScreen'}))
                }}>
                    <Text>Touch me now!</Text>
                </TouchableOpacity>

                 <TouchableOpacity onPress={()=>{
                    dispatch(NavigationActions.navigate({routeName:'LoginScreen'}))
                }}>
                    <Text>Touch me now2!</Text>
                </TouchableOpacity>


                 <TouchableOpacity onPress={()=>{
                        dispatch(CalcUP(2));
                    }}>
                    <Text>login now:</Text>
                </TouchableOpacity>
            </View>
        );
    };
}
const mapStateToProps = state=>({
    isLoggedIn:state.authReducer.isLoggedIn,
    calcReducer:state.calcReducer
});


//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect(mapStateToProps)(TichDiemPage);