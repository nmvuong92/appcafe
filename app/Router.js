import React from 'react';
import {StackNavigator,TabNavigator} from 'react-navigation';

import Home from './screens/Home';
import User from './screens/User';
import Detail from './screens/Detail';


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

export const HomeStack=StackNavigator({
    HomeScreen:{
        screen:Home,
        navigationOptions:{
            title:'Home'
        }
    },
    DetailScreen:{
        screen:Detail,
        navigationOptions:{
            title:'Detail'
        }
    }
});
export const UserStack = StackNavigator({
    UserScreen:{
        screen:User,
        navigationOptions:{
            title:'User'
        }
    }
});


const tintColor = "red";

export const Tabbar = TabNavigator({
    Home:{
        screen:HomeStack,
        navigationOptions: {
            tabBarLabel:'HOME *'
        }
    },
    User:{
        screen:UserStack
    }
},{
    tabBarPosition:'bottom',
    swipeEnabled:true,
    tabBarOptions:{
        style:{
            backgroundColor:"green"
        },
        activeTintColor:"yellow",
        inactiveTintColor:"blue"
    }
});