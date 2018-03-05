import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
export default class LayoutComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
                <View style={styles.box1}></View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
       
    },
    box1:{
        borderWidth: 2,
        borderColor: "red",
        width:100,
        height:100,
        backgroundColor:'green'
    }
});