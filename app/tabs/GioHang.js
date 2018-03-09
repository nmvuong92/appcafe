import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  Platform
} from 'react-native';
import GioHangPage from './pages/GioHangPage';
import Loading from './../common/components/Loading';
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
export default class GioHang extends Component {
  
      constructor(props){
            super(props);
            this.state = {
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
      
    
      render() {
        if (this.state.appIsReady) {
          return <GioHangPage screenProps={{ data: this.state.data }} />;
        }
        return <Loading />;
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