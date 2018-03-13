
import * as types from './../actions/actionTypes';

import { NavigationActions } from 'react-navigation';
import { MainScreenNavigator } from './../Router';





// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = MainScreenNavigator.router.getActionForPathAndParams('Home');

const tempNavState = MainScreenNavigator.router.getStateForAction(firstAction);
const secondAction = MainScreenNavigator.router.getActionForPathAndParams('Home');


const initialState = MainScreenNavigator.router.getStateForAction(
  //secondAction,
  tempNavState
);
initialState.dataBack = null;

let navReducer  = (state=initialState,action)=>{
    
    let nextState;
    switch (action.type) {
      case 'Home':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Home' }),
            state
          );
        break;
      case 'goBack':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
          );
          nextState = {...nextState,dataBack:action.dataBack}
          //console.log(nextState);
        break;
    
      case 'Login':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.back(),
          state
        );
       
        break;
      case 'Logout':
        
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'ScreenNotOnTabbar' }),
          state
        );
        break;

      case 'KhuyenMaiScreen':
        
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'KhuyenMaiScreen' }),
          state
        );
          break;
      case 'RegisterScreen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'RegisterScreen' }),
            state
          );
          break;
      case 'LoginScreen':
           
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'LoginScreen' }),
            state
          );
          break;

      case 'SanPham_NganhHang_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'SanPham_NganhHang_Screen' }),
            state
          );
          break;
      //chi tiet san pham

      case 'SanPham_ChitietSanPham_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate( { 
              routeName: 'SanPham_ChitietSanPham_Screen',
              params: {
                id: action.id
              }
            }),
            NavigationActions.navigate({ routeName: 'Home' }),
          );
        break;

        //SAN PHAM->CHI TIET->GIOHANG

      case 'ChiTietSanPham_GioHang_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'ChiTietSanPham_GioHang_Screen' }),
            state
          );
          break;

     case 'TichDiemScreen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'TichDiemScreen' }),
            state
          );
          break;
      case 'Home_ChitietSanPham_Screen':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate( { 
            routeName: 'Home_ChitietSanPham_Screen',
            params: {
              id: action.id
            }
          }),
          state
        );
        break;
      default:
          nextState = MainScreenNavigator.router.getStateForAction(action, state);
          break;
    }
  
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;


};
export default navReducer;