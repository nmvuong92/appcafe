/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';
import Toast from 'react-native-root-toast';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import IconBadge from 'react-native-icon-badge';


import I18n from './app/i18n/i18n';

import { getLanguages } from 'react-native-i18n';
import RNRestart from 'react-native-restart'; // Import package from node modules


import AppIntroPage from './app/components/AppIntroPage';

import MainComponent from './app/components/MainComponent';
import {Provider} from 'react-redux';
import store from './app/store/store';
import MainTab from './app/MainTab';
import AppFirst from './app/AppFirst';

import { StackNavigator, addNavigationHelpers } from "react-navigation";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
type Props = {};
import AppNavigator from './AppNavigator';
import MainScreenNavigatorState from './app/Router';


export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
            <MainScreenNavigatorState/>
        </Provider>
    );
  }
  
  /*LANGconstructor(props){
      super(props);
      //
     
      this.state={
        name:"Vuong",
        notifications:10,
        BadgeCount:5,
        IsShowAppIntro:true
      }
     
      this.InitialLang();
  }
 componentWillMount(){
    getLanguages().then(languages => {
      this.setState({ languages });
    });
    this.InitialLang();
  }

  async InitialLang(){
    try{
      let lang = await AsyncStorage.getItem("lang");
      if(lang=="vi"||lang=="en"){
        I18n.locale=lang;
      }
      console.log(lang);
      console.log(I18n.t('greeting'));
    }catch(e){
      console.log(e);
    }
  }
  componentDidMount(){
    console.log("componentDidMount");
    this.InitialLang();
  }*/
 
 
}

