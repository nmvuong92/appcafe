
import * as types from './../actions/actionTypes';

import { NavigationActions } from 'react-navigation';
import { MainScreenNavigator } from './../Router';


// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = MainScreenNavigator.router.getActionForPathAndParams('ScreenNotOnTabbar');

const tempNavState = MainScreenNavigator.router.getStateForAction(firstAction);
const secondAction = MainScreenNavigator.router.getActionForPathAndParams('Tabxxx');


const initialState = MainScreenNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

let navReducer  = (state=initialState,action)=>{
    
    let nextState;
    switch (action.type) {
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
      default:
        nextState = MainScreenNavigator.router.getStateForAction(action, state);
        break;
    }
  
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;


};
export default navReducer;