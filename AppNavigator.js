import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';

import { connect,Provider } from 'react-redux';

import store from './app/store/store';
import {Tabbar,MainScreenNavigator} from './app/Router';

import{View,Text,TouchableOpacity} from 'react-native';

export default class AppNavigator extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <Provider store={store}>
                   <MainScreenNavigator />
            </Provider>
        );
    }
}

