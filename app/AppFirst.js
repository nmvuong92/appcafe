import React, { Component } from 'react';
import {
   
    View,
    StatusBar,
    Platform,
    NavigationExperimental
} from 'react-native';

import AppMain from './containers/AppMain';

class AppFirst extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='transparent'
                    translucent={true}
                />
                <NavigationExperimental.Navigator
                    initialRoute={{name: 'AppMain', component: AppMain}}
                    configureScene={()=>{
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    }}
                />
            </View>
        )
    }
}

export default AppFirst;