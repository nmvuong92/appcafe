import React,{Component} from 'react';
import {
  Text,
  View,
  Image,


  Dimensions,
  StyleSheet,

} from 'react-native';


export default class BannerSwipper extends Component{


    constructor(props){
        super(props);
        this.state = {
            width: '99%',
            IMGS:[
                'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
                'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
                'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
                'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
                'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
                'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
                'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
            ]
        };
    
      
 
      
    }
  
    
    componentWillMount() {
        setTimeout(() => {
            this.setState({
                width: '100%'
            });
        }, 500);
    }
    getWidth() {
        return Dimensions.get('window').width;
    }
  
     
    render(){
        const width = this.getWidth();
        return (
            <View style={{height:230}}>
                <Text>Swip</Text>
          </View>
        );
    }

 
     
}
var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
       fontSize:50,
    }
  
});