import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {CalcUP,CalcDOWN} from './../../actions/CalcAction';
class TichDiemPage extends Component{
    componentWillMount(){
        const {dispatch,calcReducer} = this.props;
        dispatch(CalcUP(2));
    }
    render(){
        const {calcReducer} = this.props;
        let myValue = calcReducer.value;
        return (
            <View>
                <Text>TichDiemPage {myValue}</Text>
            </View>
        );
    };
}

//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {calcReducer} = state;
})(TichDiemPage);