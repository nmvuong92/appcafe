
import React, { Component } from 'react';
import {
  Platform,
  
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image  
} from 'react-native';


import {Provider} from 'react-redux';
import store from './app/store/store';


type Props = {};
import MainScreenNavigatorState from './app/Router';


export default class App extends Component<Props> {
  constructor(props){
      super(props);
  }

  componentDidMount(){
      
  }
  render() {
    return (
        <Provider store={store}>
            <MainScreenNavigatorState/>
        </Provider>
    );
  }
}

