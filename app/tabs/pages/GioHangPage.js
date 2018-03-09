import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,

  Platform
} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';


// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

// main
export default class GioHangPage extends React.Component {
 
  _keyExtractor = item => {
    return item.id;
  };

  _renderItem = data => {
    const item = data.item;
    return (
      <View style={styles.item}>
        {!item.thumbnailUrl
          ? <View style={styles.itemImage}>
              <Text>No image</Text>
            </View>
          : 
            <Image 
                    source={{ uri: item.thumbnailUrl }} 
                    indicator={ProgressBar} 
                    style={styles.itemImage}/>
            }
        <Text numberOfLines={3} style={styles.itemTitle}>
          {item.title}
        </Text>
        <View style={styles.itemFooter}>
          <Text>Mínimo: {item.title}</Text>
          <Text>UxB: {item.title}</Text>
          <Text
            style={
              !item.id>3 ? styles.itemPrice : styles.itemPriceClearance
            }>
            {item.id}
          </Text>
        </View>
      </View>
    );
  };

  _getItemLayout = (data, index) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.props.screenProps.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          numColumns={numColumns}
        />
      </View>
    );
  }
}


const colors = {
  snow: 'white',
  darkPurple: '#140034',
  placeholder: '#eee',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  listContainer: {
    flex: 1,
    padding: PRODUCT_ITEM_OFFSET,
  },
  item: {
    margin: PRODUCT_ITEM_OFFSET,
    overflow: 'hidden',
    borderRadius: 3,
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: PRODUCT_ITEM_HEIGHT,
    flexDirection: 'column',
    backgroundColor: colors.snow,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  itemImage: {
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: PRODUCT_ITEM_OFFSET * 2,
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.15)',
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  itemPriceClearance: {
    fontWeight: 'bold',
    color: 'red',
  },
});
