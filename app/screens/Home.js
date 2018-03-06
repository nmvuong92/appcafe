import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
export default class Home extends Component{
    render(){
        return (
            <View>
                <Text>HOME</Text>

                <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate("DetailScreen");
                }}>
                    <Text>Go to detail</Text>
                </TouchableOpacity>
            </View>
        );
    };
}