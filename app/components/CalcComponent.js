import React,{Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';


import {CalcUP,CalcDOWN} from './../actions/CalcAction';
class CalcComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {calcReducer} = this.props;
        let myValue=calcReducer.value;
        let list = calcReducer.list;
        const {dispatch} = this.props;
        return (
            <View>
                <Text>CalcComponent</Text>

                <Text>{myValue}</Text>
                <Text>{list.length}</Text>
                <View>

                    <TouchableOpacity onPress={()=>{
                        dispatch(CalcUP(2));
                    }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{
                       dispatch(CalcDOWN(2));
                    }}>
                     <Text>-</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {calcReducer} = state;
})(CalcComponent);