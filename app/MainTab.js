import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StatusBar,StyleSheet,Platform} from 'react-native';
import {Tabbar}  from './Router';
import {connect} from 'react-redux';
import {
    StackNavigator,
    addNavigationHelpers,
  } from 'react-navigation';
export default class MainTab extends Component{
    render(){
        return (
        
           
                    <Tabbar/>
      
        );
    };

}
/*const mapStateToProps = state => {
    return {
      //navigationState: state.NavigationReducer
    };
};*/

