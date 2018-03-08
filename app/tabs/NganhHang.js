import React,{Component} from 'react';
import {
    View,Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    InteractionManager,
    Animated} from 'react-native';
import {window} from './../common/constants';

export default class NganhHang extends Component{
    constructor(props){
        
        super(props);
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['a', 'b', 'c', 'a longer example', 'd', 'e','f', 'a longer example', 'd', 'e','f', 'a longer example', 'd', 'e','f']),
        };

    }
    render(){
        var cat1 = ['Jake', 'Jon', 'Thruster','abc','aaaaaaaaaaa','bbbbbbbbb','ccccccccc'];
        return (
            <View style={styles.container}>
                <View style={styles.cot1}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        /> 
                </View>
                <View style={styles.cot2}>
                        <ListView contentContainerStyle={{
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow2}
                        /> 
                </View>
            </View>
        );
    };
    renderRow2(food) {

        let lightStyle = [styles.healthLight];
        /*if (food.health_light == 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light == 3) {
            lightStyle.push({backgroundColor: 'red'})
        }*/

        return (
            <TouchableOpacity
                style={styles.foodsCell}
                onPress={()=>{
                    InteractionManager.runAfterInteractions(()=>{
                      
                    })
                }}
            >
                <View style={{  backgroundColor: 'red',margin: 1,width: 50}}>
                  
                    <View style={styles.titleContainer}>
                        <Text style={styles.foodName} numberOfLines={1}>{food}</Text>
                        <Text style={styles.calory}>
                            {food}
                            <Text style={styles.unit}> 千卡/{food}克</Text>
                        </Text>
                    </View>
                </View>
                <View style={lightStyle}/>
            </TouchableOpacity>
        )
    }
    renderRow(food) {

        let lightStyle = [styles.healthLight];
        /*if (food.health_light == 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light == 3) {
            lightStyle.push({backgroundColor: 'red'})
        }*/

        return (
            <TouchableOpacity
                style={styles.foodsCell}
                onPress={()=>{
                    InteractionManager.runAfterInteractions(()=>{
                      
                    })
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.foodIcon} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.foodName} numberOfLines={1}>{food}</Text>
                        <Text style={styles.calory}>
                            {food}
                            <Text style={styles.unit}> 千卡/{food}克</Text>
                        </Text>
                    </View>
                </View>
                <View style={lightStyle}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',

    },
    cot1:{
        flex:3,
        backgroundColor:"red",
        height:'100%'
    },
    cot2:{
        flex:7,
        backgroundColor:"green",
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
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    titleContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'space-between',
    },

    foodName: {
        width: window.width - 15 - 15 - 40 - 15 - 10,
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

