import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import CalcComponent from './CalcComponent';
import {connect} from 'react-redux';


class MainComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {calcReducer} = this.props;
        let myValue = calcReducer.value;
        return (
            <View style={styles.container}>
                <Text>{myValue}</Text>
                <CalcComponent/>
            </View>
        );
    }
}

//khong can chia se nen connect rong
//khi ma exprt connect ==> co 1 bien dispatch
export default connect((state)=>{
    return {calcReducer} = state;
})(MainComponent);



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  