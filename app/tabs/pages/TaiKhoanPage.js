import React,{Component} from 'react';
import {View,Text, FlatList, StyleSheet,Image,ActivityIndicator} from 'react-native';
export default class DSSP extends Component{
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
     paginate (array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

      
    componentDidMount(){
        //this.makeRemoteRequest();
    }
    makeRemoteRequest(){
        const {page,seed}=this.state;
        this.setState(
            {
                loading:true,
            }
        );
        const url="https://jsonplaceholder.typicode.com/photos";
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                data:[...this.state.data,...this.paginate(responseJson,this.state.page_size,this.state.page)],
                mang:responseJson,
                error:responseJson.error||null,
                loading:false,
                refreshing:false
            });
        })
        .catch((e)=>{
            this.setState({error,loading:false,refreshing:false})
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
    render(){

         
        return(
            <View style={styles.container}>
                {
                    this.state.loading?<ActivityIndicator size="large" />:null
                }

                <View style={{height:150,width:"100%",backgroundColor:"yellow"}}>
                    
                </View>
                <FlatList
                data={this.state.data}
                renderItem={ ({item})  =>
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
                />
            </View>

            
        )


      
    }
}

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