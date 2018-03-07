import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import TichDiemPage from './pages/TichDiemPage';
export default class TichDiem extends Component{
    render(){
        return (
            <View>
                <TichDiemPage {...this.props}/>
            </View>
        );
    };
}