import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
export default class Detail extends Component{
    render(){
        return (
            <View>
                <Text>DETAIL</Text>


                 <TouchableOpacity onPress={()=>{
                        this.props.navigation.goBack();
                }}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        );
    };
}