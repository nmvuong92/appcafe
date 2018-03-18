import * as types from './actionTypes';
import Util from './../common/utils';
import * as urls from  './../common/constants_url';
import Toast from 'react-native-root-toast';

export let fetchArticles = ()=> {
   
   
    let URL =urls.api_article+"/layds";
    if(__DEV__){
        console.log(URL);
    }

    return dispatch => {
        dispatch(fetchFood(true));
        Util.get(URL, (response) => {
            dispatch(fetchFood(true));
            dispatch(receive(response));
            console.log(response);
        }, (error) => {
            alert(error);
            console.log(`Fetch food info error: ${error}`);
        })
    }
}
let fetchFood = (isload)=> {
    return { type:types.ARTICLE_FETCH,isFetching:isload}
}
let receive = (food)=> { 
    return {
        type: types.ARTICLER_RECEIVE,
        List: food,
    }
}