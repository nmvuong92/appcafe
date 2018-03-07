import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';

import { connect,Provider } from 'react-redux';

import store from './app/store/store';
import {Tabbar} from './app/Router';

import{View,Text,TouchableOpacity} from 'react-native';

export default class AppNavigator extends Component {
    render() {
        let Cstate = store.getState().calcReducer.authIsLogin;
      
        return (
            !Cstate?
            <View>
                <TouchableOpacity onPress={()=>{
                    store.dispatch({type:"K_SET_LOGIN_TRUE"});
                    console.log(Cstate);
                }}><Text>Login</Text></TouchableOpacity>
            </View>
            :
            <Provider store={store}>
                  <Tabbar/>
            </Provider>
        );
    }
}

