import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {CalcUP,CalcDOWN,vfetch} from './../../actions/CalcAction';
import Loading from './../../common/components/Loading';
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

        const {dispatch} = this.props;
        return (
            isLoading?<Loading/>:<View>
                <Text>TichDiemPage {myValue}</Text>
                
                <Text>{list.length}</Text>
                <TouchableOpacity onPress={()=>{
                    dispatch(vfetch());
                }}>
                    <Text>Touch me now!</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {calcReducer} = state;
})(TichDiemPage);