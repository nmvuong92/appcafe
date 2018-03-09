import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';


export default class HeadPadding extends Component {
    render() {
        return (
            <View style={{marginTop: Platform.OS==="ios"?20:0}}>
              
            </View>
        )
    }
}
