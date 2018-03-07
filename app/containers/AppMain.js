import React, {Component} from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from './../screens/Home';
import User from './../screens/User';


class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
	  	      selectedTab:'home'
	      };
    }
    
    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    title="home"
                selected={this.state.selectedTab === 'home'}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}
                renderIcon={() => <Image source={require("./../assets/images/icons/icon1_32.png")} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require("./../assets/images/icons/icon1_32.png")} style={styles.iconStyle}/>}
                onPress={() => this.setState({ selectedTab: 'home' })}>
                <HomeContainer {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="user"
                selected={this.state.selectedTab === 'user'}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}
                renderIcon={() => <Image source={require("./../assets/images/icons/icon2_32.png")} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require("./../assets/images/icons/icon2_32.png")} style={styles.iconStyle}/>}
                onPress={() => this.setState({ selectedTab: 'user' })}>
                <CategoryContainer {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles=StyleSheet.create({
   iconStyle:{
       width:26,
       height:26,
   },
   textStyle:{
       color:'#999',
   },
   selectedTextStyle:{
       color:'black',
   }
});

export default AppMain;

