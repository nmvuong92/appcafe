import React,{Component} from 'react';
import {View,Text, FlatList, StyleSheet,Image,ActivityIndicator,TouchableOpacity} from 'react-native';
import {fetchSanPham} from './../../actions/sanPhamAction';
import {connect} from 'react-redux';
import Loading from './../../common/components/Loading';
import * as types from './../../actions/actionTypes';
class DSSP extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            seed:1,
            error:null,
            refreshing:false,
            data:[],
            page:0,
            page_size:10
        }
    }
 
    componentDidMount() {
        this.makeRemoteRequest();
    }
   
    makeRemoteRequest(){
        const {sanPhamReducer,dispatch} = this.props;
        dispatch(fetchSanPham());
        this.setState({
            data:sanPhamReducer.List,
            isFetching:sanPhamReducer.isFetching,
        });
    }

    handleRefresh=()=>{
        this.setState({
            page:1,
            data:[],
            refreshing:true,
            seed:this.state.seed+1,
        },()=>{
            this.makeRemoteRequest();
        });
    }
    handleLoadMore=()=>{
        this.setState({
            page:this.state.page+1,
        },()=>{
            this.makeRemoteRequest();
        });
    }
    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
          this.handleLoadMore();
          this.onEndReachedCalledDuringMomentum = true;
        }
    }
    onPressSanPhamItem = (item)=>{
        const {navReducer,dispatch}  = this.props;
        dispatch({type:"SanPham_ChitietSanPham_Screen",id:item.id});
    }
    render(){

        return(
            <View style={styles.container}>
                {
                    this.state.loading?<ActivityIndicator size="large" />:null
                }
                  <Text>SLSP: {this.state.data}</Text>
                <Text>{" s "+this.state.isFetching}</Text>
                <FlatList
                data={this.state.data}
                renderItem={ ({item})  =>
                     <TouchableOpacity onPress={()=>{
                        this.onPressSanPhamItem(item);
                     }}>
                        <View style={ao.dong}>
                          
                            <Text>{item.id+". "+this.state.page+"/"+item.title}</Text> 
                            <Image
                                style={
                                    {
                                        width:50,
                                        height:50
                                    }
                                }
                            source={
                                {
                                    uri:"https://picsum.photos/200/300/?random"
                                }
                            }/>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={item=>item.id+""}
                //ItemSeparatorComponent={this.renderSeparator}
                //ListHeaderComponent={this.renderHeader}
                // ListFooterComponent={this.renderFooter}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                contentContainerStyle={{paddingBottom:150}}
                />
            </View>

            
        )


      
    }
}
const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamReducer:state.sanPhamReducer,
});
export default connect(mapStateToProps)(DSSP);
var ao = StyleSheet.create({
    dong:{
        borderBottomWidth:1,
        padding:50
    }
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    listItem: {
      flex: 1,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#d6d7da",
      padding: 6
    },
    imageWrapper: {
      padding: 5
    },
    title: {
      fontSize: 20,
      textAlign: "left",
      margin: 6
    },
    subtitle: {
      fontSize: 10,
      textAlign: "left",
      margin: 6
    }
  });