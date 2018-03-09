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
    Platform} from 'react-native';
import {window} from './../common/constants';
import GioHangPage from './pages/GioHangPage';
import Loading from './../common/components/Loading';
export default class NganhHang extends Component{
    constructor(props){
        
        super(props);
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          selectedCat1ID:-1,
          selectedCat2ID:-1,
          dataSource: ds.cloneWithRows(this._getList()),
          appIsReady: false,
        };


    }

     
    fetchData = async small => {
        const start_time = Date.now();
        try {
          // ~7700 records
          let uri = 'https://jsonplaceholder.typicode.com/photos';
          if (small === true) {
            // 5 records
            uri =
              'https://jsonplaceholder.typicode.com/photos';
          }
          let response = await fetch(uri);
          console.log(
            'Download remote data took: ' + (Date.now() - start_time) + 'ms.'
          );
          // const data = await response.json();
          let data = await response.text();
          // https://github.com/facebook/react-native/issues/10377
          if (Platform.OS === 'android') {
            data = data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
          }
          data = JSON.parse(data);
          console.log('Items in catalog: ' + data.length);
          this.setState({
            appIsReady: true,
            data: data,
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      componentWillMount = () => {
        this.fetchData();
      };
      


    _getList = ()=>{
        return [
            {
              "albumId": 1,
              "id": 1,
              "title": "Kieng ne",
              "url": "http://placehold.it/600/92c952",
              "thumbnailUrl": "http://placehold.it/150/92c952"
            },
            {
              "albumId": 1,
              "id": 2,
              "title": "reprehenderit est deserunt velit ipsam",
              "url": "http://placehold.it/600/771796",
              "thumbnailUrl": "http://placehold.it/150/771796"
            },
            {
              "albumId": 1,
              "id": 3,
              "title": "officia porro iure quia iusto qui ipsa ut modi",
              "url": "http://placehold.it/600/24f355",
              "thumbnailUrl": "http://placehold.it/150/24f355"
            },
            {
              "albumId": 1,
              "id": 4,
              "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
              "url": "http://placehold.it/600/d32776",
              "thumbnailUrl": "http://placehold.it/150/d32776"
            },
            {
              "albumId": 1,
              "id": 5,
              "title": "natus nisi omnis corporis facere molestiae rerum in",
              "url": "http://placehold.it/600/f66b97",
              "thumbnailUrl": "http://placehold.it/150/f66b97"
            },
            {
              "albumId": 1,
              "id": 6,
              "title": "accusamus ea aliquid et amet sequi nemo",
              "url": "http://placehold.it/600/56a8c2",
              "thumbnailUrl": "http://placehold.it/150/56a8c2"
            },
            {
              "albumId": 1,
              "id": 7,
              "title": "officia delectus consequatur vero aut veniam explicabo molestias",
              "url": "http://placehold.it/600/b0f7cc",
              "thumbnailUrl": "http://placehold.it/150/b0f7cc"
            },
            {
              "albumId": 1,
              "id": 8,
              "title": "aut porro officiis laborum odit ea laudantium corporis",
              "url": "http://placehold.it/600/54176f",
              "thumbnailUrl": "http://placehold.it/150/54176f"
            },
            {
              "albumId": 1,
              "id": 9,
              "title": "qui eius qui autem sed",
              "url": "http://placehold.it/600/51aa97",
              "thumbnailUrl": "http://placehold.it/150/51aa97"
            },
            {
              "albumId": 1,
              "id": 10,
              "title": "beatae et provident et ut vel",
              "url": "http://placehold.it/600/810b14",
              "thumbnailUrl": "http://placehold.it/150/810b14"
            },
            {
              "albumId": 1,
              "id": 11,
              "title": "nihil at amet non hic quia qui",
              "url": "http://placehold.it/600/1ee8a4",
              "thumbnailUrl": "http://placehold.it/150/1ee8a4"
            },
            {
              "albumId": 1,
              "id": 12,
              "title": "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
              "url": "http://placehold.it/600/66b7d2",
              "thumbnailUrl": "http://placehold.it/150/66b7d2"
            },
            {
              "albumId": 1,
              "id": 13,
              "title": "repudiandae iusto deleniti rerum",
              "url": "http://placehold.it/600/197d29",
              "thumbnailUrl": "http://placehold.it/150/197d29"
            },
            {
              "albumId": 1,
              "id": 14,
              "title": "est necessitatibus architecto ut laborum",
              "url": "http://placehold.it/600/61a65",
              "thumbnailUrl": "http://placehold.it/150/61a65"
            },
            {
              "albumId": 1,
              "id": 15,
              "title": "harum dicta similique quis dolore earum ex qui",
              "url": "http://placehold.it/600/f9cee5",
              "thumbnailUrl": "http://placehold.it/150/f9cee5"
            },
            {
              "albumId": 1,
              "id": 16,
              "title": "iusto sunt nobis quasi veritatis quas expedita voluptatum deserunt",
              "url": "http://placehold.it/600/fdf73e",
              "thumbnailUrl": "http://placehold.it/150/fdf73e"
            },
            {
              "albumId": 1,
              "id": 17,
              "title": "natus doloribus necessitatibus ipsa",
              "url": "http://placehold.it/600/9c184f",
              "thumbnailUrl": "http://placehold.it/150/9c184f"
            },
            {
              "albumId": 1,
              "id": 18,
              "title": "laboriosam odit nam necessitatibus et illum dolores reiciendis",
              "url": "http://placehold.it/600/1fe46f",
              "thumbnailUrl": "http://placehold.it/150/1fe46f"
            },
            {
              "albumId": 1,
              "id": 19,
              "title": "perferendis nesciunt eveniet et optio a",
              "url": "http://placehold.it/600/56acb2",
              "thumbnailUrl": "http://placehold.it/150/56acb2"
            },
            {
              "albumId": 1,
              "id": 20,
              "title": "assumenda voluptatem laboriosam enim consequatur veniam placeat reiciendis error",
              "url": "http://placehold.it/600/8985dc",
              "thumbnailUrl": "http://placehold.it/150/8985dc"
            },
            {
              "albumId": 1,
              "id": 21,
              "title": "ad et natus qui",
              "url": "http://placehold.it/600/5e12c6",
              "thumbnailUrl": "http://placehold.it/150/5e12c6"
            },
            {
              "albumId": 1,
              "id": 22,
              "title": "tieu de",
              "url": "http://placehold.it/600/45601a",
              "thumbnailUrl": "http://placehold.it/150/45601a"
            },
            {
              "albumId": 1,
              "id": 23,
              "title": "harum velit vero totam",
              "url": "http://placehold.it/600/e924e6",
              "thumbnailUrl": "http://placehold.it/150/e924e6"
            },
            {
              "albumId": 1,
              "id": 24,
              "title": "beatae officiis ut aut",
              "url": "http://placehold.it/600/8f209a",
              "thumbnailUrl": "http://placehold.it/150/8f209a"
            },
            {
              "albumId": 1,
              "id": 25,
              "title": "facere non quis fuga fugit vitae",
              "url": "http://placehold.it/600/5e3a73",
              "thumbnailUrl": "http://placehold.it/150/5e3a73"
            },
            {
              "albumId": 1,
              "id": 26,
              "title": "asperiores nobis voluptate qui",
              "url": "http://placehold.it/600/474645",
              "thumbnailUrl": "http://placehold.it/150/474645"
            },
            {
              "albumId": 1,
              "id": 27,
              "title": "sit asperiores est quos quis nisi veniam error",
              "url": "http://placehold.it/600/c984bf",
              "thumbnailUrl": "http://placehold.it/150/c984bf"
            },
            {
              "albumId": 1,
              "id": 28,
              "title": "non neque eligendi molestiae repudiandae illum voluptatem qui aut",
              "url": "http://placehold.it/600/392537",
              "thumbnailUrl": "http://placehold.it/150/392537"
            },
          ];
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.cot1}>
                <Text>{this.state.selectedCat1ID}</Text>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRowDanhMucCap1.bind(this)}
                        /> 
                </View>
                <View style={styles.cot2}>
                        <Text>{this.state.selectedCat2ID}</Text>
                        {/* <ListView 
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRowDanhMucCap2.bind(this)}
                        />  */}

                        {
                            this.state.appIsReady? <GioHangPage screenProps={{ data: this.state.data }} />:<Loading/>
                        }
                       
                </View>
            </View>
        );
    };

  
    renderRowDanhMucCap2(food) {

        let lightStyle = [styles.healthLight];
        /*if (food.health_light == 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light == 3) {
            lightStyle.push({backgroundColor: 'red'})
        }*/

        return (
            <TouchableOpacity
                key={food.id}
                style={this.state.selectedCat2ID==food.id?styles.foodsCellSelected:styles.foodsCell}

                onPress={()=>{
                    InteractionManager.runAfterInteractions(()=>{
                        this._onPressDanhMuc2(this,food);
                    })
                }}
               
            >
                <View>
                
                        <View style={{width:'100%'}}>
                            <Image style={styles.foodIcon}  source={{uri: food.thumbnailUrl}}/>
                            <Text numberOfLines={1}>{"Danh muc cap 2"}</Text>
                        </View>                        
               
                </View>
               
            </TouchableOpacity>
        )
    }
    _onPressDanhMuc1(that,rowData){
        //alert(rowData.id);
        this.setState({
            selectedCat1ID:rowData.id,
            dataSource:this.state.dataSource.cloneWithRows(this._getList())
        });
     }
 
    _onPressDanhMuc2(that,rowData){
      // alert(rowData.id);
       this.setState({
           selectedCat2ID:rowData.id,
           dataSource:this.state.dataSource.cloneWithRows(this._getList())
       });
       
    }

    renderRowDanhMucCap1(food) {

        let lightStyle = [styles.healthLight];
        /*if (food.health_light == 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light == 3) {
            lightStyle.push({backgroundColor: 'red'})
        }*/

        return (
            <TouchableOpacity
                style={this.state.selectedCat1ID==food.id?styles.foodsCellSelected:styles.foodsCell}
                onPress={()=>{
                    InteractionManager.runAfterInteractions(()=>{
                        this._onPressDanhMuc1(this,food);
                    })
                }}
            >
                <View style={{width:'100%',flexDirection: 'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Image style={styles.foodIcon} source={{uri: food.thumbnailUrl}}/>
                   
                        <Text style={{fontSize:10}} numberOfLines={1}>{"Danh muc cap 1"}</Text>
             
                </View>
              
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',

    },
    selected:{
        backgroundColor:"red"
    },  
    cot1:{
        flex:3,
        height:'100%',
        borderRightWidth: 2,
        borderRightColor:"red"
    },
    cot2:{
        flex:7,
    },

    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        width: window.width,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 3,
       
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
       
    },
    foodsCellSelected: {
        flexDirection: 'row',
        paddingLeft: 3,
       
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#faf2e6'
    },
    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    titleContainer: {
      
       
    
    },



    calory: {
        fontSize: 13,
        color: 'red',
    },

    unit: {
        fontSize: 13,
        color: 'black'
    },

    healthLight: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 0,
    },

    sortType: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (window.width - 4 * 10) / 3,
        height: 30,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 10,
    },

    sortTypesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: window.width,
        paddingTop: 10,
    },

    subcategoryContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 150,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
    },

    subcategory: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        height: 40,
        justifyContent: 'center',
        padding: 15,
    }
});

