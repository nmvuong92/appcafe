import React,{Component} from 'react';
import {connect} from 'react-redux';
import CartPage from './../pages/cartPage';

class CartContainer extends Component{
    render(){
        return (
            <CartPage {...this.props}/>
        );
    }
}
export default connect((state)=>{
    return {cartReducer} = state;
})(CartContainer);