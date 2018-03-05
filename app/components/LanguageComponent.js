/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
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


export default class LanguageComponent extends Component{
  constructor(props){
      super(props);
      //
      this.state={
        name:"Vuong",
        notifications:10,
        BadgeCount:5,
        IsShowAppIntro:true
      }
      console.log("constructor");
      this.InitialLang();
  }
  componentWillMount(){
    console.log("componentWillMount");
    
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
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
              // Add a Toast on screen.
              let toast = Toast.show('This is a message', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow: () => {
                    // calls on toast\`s appear animation start
                },
                onShown: () => {
                    // calls on toast\`s appear animation end.
                },
                onHide: () => {
                    // calls on toast\`s hide animation start.
                },
                onHidden: () => {
                    // calls on toast\`s hide animation end.
                }
              });

              // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
              setTimeout(function () {
                Toast.hide(toast);
              }, 1000);
        }}>

      

       <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
        <IconBadge
          MainElement={
            <Image source={require('./app/assets/images/icons/cart32.png')} style={{marginRight:15}}/>
          }
          BadgeElement={
            <Text style={{color:'#FFFFFF'}}>{this.state.BadgeCount}</Text>
          }
          IconBadgeStyle={
            {width:15,
            height:15,
           
            backgroundColor: '#FF00EE'}
          }
          Hidden={this.state.BadgeCount==0}
          />
      </View>

          <Text>{I18n.t('greeting')}</Text>

          <Text>Show toast: {this.state.name}</Text>

             <FontAwesome.Button onPress={()=>{ 
                    this.setState({
                      name:"Coi"
                    });
              }} name="th" style={styles.VButton} backgroundColor="white" color="red">Change state</FontAwesome.Button>
               <FontAwesome.Button onPress={()=>{ 
                   let user='John Doe';
                   AsyncStorage.setItem("user",user);

                   getLanguages().then(languages => {
                    console.log(languages); // ['en-US', 'en']
                  AsyncStorage.setItem("lang",JSON.stringify(languages));
                    
                  });
              }} name="th" style={styles.VButton} backgroundColor="white" color="red">Save data</FontAwesome.Button>
                 <FontAwesome.Button onPress={async()=>{ 
                  try{
                    let user=await AsyncStorage.getItem("lang");
                    console.log("--------exists: "+JSON.parse(user)[0]);
                  
                    this.setState({
                      name:JSON.parse(user)[0]
                    });
                  }catch(error){
                    console.log("--------error: "+error);
                  }
              }} name="th" style={styles.VButton} backgroundColor="white" color="red">Display Data</FontAwesome.Button>


               <FontAwesome.Button onPress={()=>{ 
              
                  AsyncStorage.setItem("lang","vi");
                  I18n.locale='vi';
                  // Immediately reload the React Native Bundle
                  RNRestart.Restart();
              }} name="th" style={styles.VButton} backgroundColor="white" color="red">Set VI</FontAwesome.Button>

                <FontAwesome.Button onPress={()=>{ 
                    AsyncStorage.setItem("lang","en");
                    I18n.locale='en';
                   // Immediately reload the React Native Bundle
                   RNRestart.Restart();
                  }} name="th" style={styles.VButton} backgroundColor="white" color="red">Set EN</FontAwesome.Button>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
