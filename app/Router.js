import React from 'react';
import {StackNavigator,TabNavigator} from 'react-navigation';

import Home from './screens/Home';
import User from './screens/User';
import Detail from './screens/Detail';


import Icon from 'react-native-vector-icons/FontAwesome';

import {Image} from 'react-native';
export const HomeStack=StackNavigator({
    HomeScreen:{
        screen:Home,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => <Icon name="facebook" size={30}/>
        }
    },
    DetailScreen:{
        screen:Detail,
        navigationOptions:{
            tabBarLabel: 'Detail',
            tabBarIcon: ({ tintColor, focused }) => <Icon name="facebook" size={30} />
        }
    }
});
export const UserStack = StackNavigator({
    UserScreen:{
        screen:User,
        navigationOptions:{
            tabBarLabel: 'User',
            tabBarIcon: ({ tintColor, focused }) =><Icon name="facebook" size={30}/>
        }
    }
});




export const Tabbar = TabNavigator({
    Home:{
        screen:HomeStack,
        navigationOptions: {
            showLabel: false,
            showIcon:true,
            tabBarLabel:'HOME *'
        }
    },
    User:{
        screen:UserStack,
            navigationOptions: {
            showLabel: false,
            showIcon:true,
            tabBarLabel:'USER *'
        }
    }
},{
    
    tabBarPosition:'bottom',
    swipeEnabled:true,
    tabBarOptions:{
        style:{
            backgroundColor:"green"
        },
        activeTintColor:"yellow",
        inactiveTintColor:"blue",
        showIcon:true
    }
});