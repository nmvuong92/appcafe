import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import TichDiemPage from './pages/TichDiemPage';
import Header from './../common/components/Header';
export default class TichDiem extends Component{
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
                        title={"Thông tin tích điểm khách hàng"}
                 />

                <Text>Tich diem pages</Text>
            </View>
        );
    };
}