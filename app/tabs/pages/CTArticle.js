import React,{Component} from 'react';
import {
    View,Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    InteractionManager,
    Animated,
    Platform,
    WebView} from 'react-native';


import Loading from './../../common/components/Loading';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { PricingCard,Card,Button } from 'react-native-elements'
import Header from './../../common/components/Header';
import * as vUtils from './../../common/vUtils';
import {getById} from './../../actions/articleAction';
import  LoadingActivityIndicator from './../../common/components/LoadingActivityIndicator';


class CTArticle extends Component{
    

  
    constructor(props){
        super(props);
        //
        const { params } = this.props.navigation.state;
        this.state = {
            article_id: params.article_id,
        };
    }

    componentWillMount(){
        const {dispatch}  = this.props;
        dispatch(getById(this.state.article_id));
    }
    goBack(){
        const {dispatch} = this.props;       
        dispatch(NavigationActions.back());
    }
    goCart(){
        const {dispatch} = this.props;       
        dispatch({
            type:this.state.cart_nav,
            thanhtoan_nav:this.state.thanhtoan_nav
        });
    }
    onPressMuaHang = (sanpham)=>{
        alert(sanpham.TenSanPham);
    }
    render(){
        const { params } = this.props.navigation.state;
        const itemId = params ? params.id : null;
        const {dispatch,articleReducer} = this.props;
        let Article = articleReducer.Detail;
        return (
            <View style={styles.container}>

                 <Header

                    showBack={true}
                    //leftIcon='angle-left'
                    //leftIconAction={()=>this.goBack()}

                    // rightIcon='address-book'
                    // rightIconAction={()=>this.goBack()}

                    // rightIcon2='heart'
                    // rightIconAction2={()=>this.goBack()}
                
                
                    title={Article!=null?Article.Title:"..."}
                />
                    {
                        Article!=null?
                        <WebView style={{height:200,}}
                            source={{html: "<!DOCTYPE html><head><meta charset='UTF-8'></head><body>"+Article.Content+"</body></html>",baseUrl:''}}
                            startInLoadingState={false}
                            bounces={false}
                            scalesPageToFit={Platform.OS==="ios"?false:true}
                        />
                        :<LoadingActivityIndicator/>
                    }
                
             
               
            </View>

        );
    };

}
const mapStateToProps = state => ({
    navReducer:state.navReducer,
    articleReducer:state.articleReducer,
});
export default connect(mapStateToProps)(CTArticle);
const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
       
    },
    center:{
        alignContent:"center",
        alignItems:"center",
    },
});
