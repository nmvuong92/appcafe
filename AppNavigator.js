import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';

import { connect,Provider } from 'react-redux';

import store from './app/store/store';
import {Tabbar} from './app/Router';



export default class AppNavigator extends Component {
    render() {
        return (
            <Provider store={store}>
                  <Tabbar/>
            </Provider>
        );
    }
}
