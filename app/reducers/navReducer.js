
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

let navReducer  = (state,action)=>{
    
    let nextState;
    switch (action.type) {
      case 'Home':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'HomeTab' }),
            state
          );
        break;
        NavigationActions

    

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

      //-------home------------
      //home>khuyen mãi
      case 'Home_KhuyenMai_Wrap':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({
             routeName: 'Home_KhuyenMai_Wrap',
             params:{
              cart_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_Wrap",
              thanhtoan_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_ThanhToan_Screen",
             } 
           }),
          state
        );
      break;
      case 'Home_KhuyenMai_ChiTietSanPham_Wap':
      nextState = MainScreenNavigator.router.getStateForAction(
        NavigationActions.navigate({
           routeName: 'Home_KhuyenMai_ChiTietSanPham_Wap',
           params:{
             id:action.id,
             cart_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_Wrap",
             thanhtoan_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_ThanhToan_Screen",
             cart_ctsp_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_ChiTietSanPham_Screen",
           } 
         }),
        state
      );
    break;

    case 'Home_KhuyenMai_ChiTietSanPham_GioHang_Wrap':
    nextState = MainScreenNavigator.router.getStateForAction(
      NavigationActions.navigate({
         routeName: 'Home_KhuyenMai_ChiTietSanPham_GioHang_Wrap',
         params:{
          cart_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_Wrap",
          thanhtoan_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_ThanhToan_Screen",
          cart_ctsp_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_ChiTietSanPham_Screen",
         } 
       }),
      state
    );
  break;

    case 'Home_KhuyenMai_ChiTietSanPham_GioHang_ThanhToan_Screen':
    nextState = MainScreenNavigator.router.getStateForAction(
      NavigationActions.navigate({
        routeName: 'Home_KhuyenMai_ChiTietSanPham_GioHang_ThanhToan_Screen',
        params:{
          cart_ctsp_nav:"Home_KhuyenMai_ChiTietSanPham_GioHang_ChiTietSanPham_Screen",
        }
      }),
      state
    );
    break;


    
    case 'Home_KhuyenMai_ChiTietSanPham_GioHang_ChiTietSanPham_Screen':
    nextState = MainScreenNavigator.router.getStateForAction(
      NavigationActions.navigate(
        { 
          routeName: 'Home_KhuyenMai_ChiTietSanPham_GioHang_ChiTietSanPham_Screen',
          params:{
            id:action.id,
            read_only:true,
          } 
        }),
      state
    );
    break;

     


    //san pham trang chu
     case 'Home_ChitietSanPham_Screen':
     
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate( { 
            routeName: 'Home_ChitietSanPham_Wrap',
            params: {
              id: action.id,
              cart_nav:'Home_ChiTietSanPham_GioHang_Wrap',
              thanhtoan_nav:'Home_ChitietSanPham_GioHang_ThanhToan_Screen',
              cart_ctsp_nav:"Home_ChitietSanPham_GioHang_ChiTietSanPham_Screen",
            }
          }),
          state
        );
        break;

      case 'Home_ChiTietSanPham_GioHang_Wrap':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate( { 
            routeName: 'Home_ChiTietSanPham_GioHang_Wrap',
            params: {
              thanhtoan_nav:'Home_ChitietSanPham_GioHang_ThanhToan_Screen',
              cart_ctsp_nav:"Home_ChitietSanPham_GioHang_ChiTietSanPham_Screen",
            }
          }),
          state
        );
        break;
      case 'Home_ChitietSanPham_GioHang_ThanhToan_Screen':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate( { 
            routeName: 'Home_ChitietSanPham_GioHang_ThanhToan_Screen',
            params: {

            }
          }),
          state
        );
        break;

        
        case 'Home_ChitietSanPham_GioHang_ChiTietSanPham_Screen':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate(
            { 
              routeName: 'Home_ChitietSanPham_GioHang_ChiTietSanPham_Screen',
              params:{
                read_only:true,
                id:action.id,

              } 
            }),
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


      //-------san pham----------
      case 'SanPham_Screen':
      nextState = MainScreenNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'SanPham_Screen',
          params:{
            
          }
         }),
        state
      );
      break;




      case 'SanPham_NganhHang_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({ 
              routeName: 'SanPham_NganhHang_Screen',
              params:{
                page:action.page,
                pageSize:action.pageSize,
              }
             }),
            state
          );
          break;

      //chi tiet san pham
      case 'SanPham_ChitietSanPham_Wrap':
        
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate( { 
              routeName: 'SanPham_ChitietSanPham_Wrap',
              params: {
                id: action.id,
                cart_nav:action.cart_nav,
                ChiTietSanPham:action.thanhtoan_nav,
              }
            }),
            state
          );
        break;

   

        //SAN PHAM->CHI TIET->GIOHANG

      case 'SanPham_ChiTietSanPham_GioHang_ThanhToanForm_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate(
              { 
                routeName: 'SanPham_ChiTietSanPham_GioHang_ThanhToanForm_Screen',
                params:{
                   id:action.id,
                   cart_ctsp_nav:"SanPham_ChiTietSanPham_GioHang_ChiTietSanPham_Screen"
                } 
              }),
            state
          );
          break;


          case 'SanPham_ChiTietSanPham_GioHang_ChiTietSanPham_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate(
              { 
                routeName: 'SanPham_ChiTietSanPham_GioHang_ChiTietSanPham_Screen',
                params:{
                  id:action.id,
                  read_only:true,
                } 
              }),
            state
          );
          break;


          case 'SanPham_ChiTietSanPham_GioHang_Wrap':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate(
              { 
                routeName: 'SanPham_ChiTietSanPham_GioHang_Wrap',
                params:{
                  thanhtoan_nav:'SanPham_ChiTietSanPham_GioHang_ThanhToanForm_Screen',
                  cart_ctsp_nav:"SanPham_ChiTietSanPham_GioHang_ChiTietSanPham_Screen",
                } 
              }),
            state
          );
          break;

   

        //tich diem
        case 'TichDiem_Wrap':
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({
             routeName: 'TichDiem_Wrap',
             params:{
                 detail_nav:"TichDiem_CTDonHang_Screen",
             } 
          }),
          state
        );
        break;
        case 'TichDiem_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({
               routeName: 'TichDiem_Screen',
               params:{
                   detail_nav:"TichDiem_CTDonHang_Screen",
               } 
            }),
            state
          );
          break;
          case 'TichDiem_CTDonHang_Screen':
          nextState = MainScreenNavigator.router.getStateForAction(
            NavigationActions.navigate({
               routeName: 'TichDiem_CTDonHang_Screen',
               params:{
                  DonHang: action.DonHang,
               } 
            }),
            state
          );
          break;
       
    

        case 'GioHang_Screen':
     
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({ 
            routeName: 'GioHang_Screen'           
          }),
          state
        );


  
      //don hang  
      case "GioHang_ThanhToan_DonHang_Screen":
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({
            routeName: 'GioHang_ThanhToan_DonHang_Screen',
            params:{
              show_header:true,
            }
          }),
          state
        );
        break;
      case "DonHang_CTDonHang_Screen":
       
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate( { 
            routeName: 'DonHang_CTDonHang_Screen',
            params: {
              DonHang: action.DonHang,
            }
          }),
          state
        );
        break;
      //gio hang

      case "GioHang_ThanhToanForm_Screen":
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({
            routeName: 'GioHang_ThanhToanForm_Screen',
      
          }),
          state
        );
        break;
      case "GioHang_ChiTietSanPham_Screen":
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({
            routeName: 'GioHang_ChiTietSanPham_Screen',
            params:{
              id:action.id,
              read_only:true,
            }
          }),
          state
        );
        break;

        //tai khoan

    case "CTArticle_Screen":
        nextState = MainScreenNavigator.router.getStateForAction(
          NavigationActions.navigate({
            routeName: 'CTArticle_Screen',
            params:{
              Article:action.Article
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