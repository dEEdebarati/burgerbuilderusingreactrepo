import axios from "axios";
import * as actionTypes from "./actionTypes";

export const addIngredient = igtype =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        payload:igtype,
    }
}

export const removeIngredient = igtype =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        payload:igtype,
    }
}

export const updatePurchaseable = igtype =>{
    return{
        type:actionTypes.UPDATE_PURCHASABLE,
        //payload:igtype,
    }
}

export const resetIngredients = igtype =>{
    return{
        type:actionTypes.RESET_INGREDIENTS,
        //payload:igtype,
    }
}

export const loadOrders = orders =>{
    return{
        type:actionTypes.LOAD_ORDERS,
        payload:orders,
    }
}

export const orderLoadFailed = () =>{
    return{
        type:actionTypes.ORDER_LOAD_FAILED,
        
    }
}

export const fetchOrders = (token,userId) =>dispatch =>{
    const queryParams = '&orderBy="userId"&equalTo="'+ userId + '"';
    axios.get('https://burger-builder-513e0-default-rtdb.asia-southeast1.firebasedatabase.app/order.json?auth='+ token + queryParams)
    .then(res =>{
        //console.log(res.data);
        dispatch(loadOrders(res.data));
    })
    .catch((err)=>{
        dispatch(orderLoadFailed());
    })
}