import React,{Component} from 'react';
import HomePage from './pages/HomePage';
export default class Home extends Component{
    render(){
        return (
            <HomePage {...this.props}/>
            // <View>
            //     <Text>HOME</Text>

            //     <TouchableOpacity onPress={()=>{
            //             this.props.navigation.navigate("DetailScreen");
            //     }}>
            //         <Text>Go to detail</Text>
            //     </TouchableOpacity>
            // </View>
        );
    };
}

