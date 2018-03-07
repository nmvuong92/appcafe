import React,{Component} from 'react';
import { StyleSheet, View } from 'react-native';


export default class Separator extends Component {
  render(){
    return(
      <View style={styles.container}>
          <View style={styles.separatorOffset} />
          <View style={styles.separator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },
})