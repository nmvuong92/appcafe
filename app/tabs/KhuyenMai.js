import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Header from './../common/components/Header';
export default class KhuyenMai extends Component{
    render(){
        return (
            <View>
                <Header
                        showBack={true}
                        //leftIcon='angle-left'
                        //leftIconAction={()=>this.goBack()}
                    
                        //rightIcon='trash'
                        //rightIconAction={()=>{}}

                        // rightIcon2='heart'
                        // rightIconAction2={()=>this.goBack()}

                        //showCartBadgeIcon={true}
                        //CartBadgeIconAction={()=>this.goBack()}
                        title={"Thông tin Khuyến mãi"}
                />
                    
              
            </View>
        );
    };
}
