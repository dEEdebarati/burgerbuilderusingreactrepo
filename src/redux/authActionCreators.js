import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = (token, userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:token,
            userId:userId,
        }
    }
}
export const authLoading = isLoading =>{
    return{
        type:actionTypes.AUTH_LOADING,
        payload:isLoading,
    }
}

export const authFailed = errMsg =>{
    return{
        type:actionTypes.AUTH_FAILED,
        payload:errMsg,
    }
}
export const auth = (email,password,mode)=> dispatch=>{
    dispatch(authLoading(true));
    const authData = {
        email:email,
        password:password,
        returnSecureToken:true,
    }
    let authUrl = null;
    if(mode === "Sign up"){
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="; 
    }else{
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }
    const API_KEY = "AIzaSyA7-MKN9GCwwwjCwFFLcVjaO-q27mRiGkg" ;
    axios.post( authUrl+ API_KEY,authData)
    .then(res =>{
         dispatch(authLoading(false));

        localStorage.setItem("token",res.data.idToken);
        localStorage.setItem("userId",res.data.localId);
        const expirationTime = new Date(new Date().getTime()+res.data.expiresIn*1000);
        localStorage.setItem("expirationTime",expirationTime);
        dispatch(authSuccess(res.data.idToken,res.data.localId))
    })
    .catch(err=>{
        dispatch(authLoading(false));

        //console.log();
        dispatch(authFailed(err.response.data.error.message));
    });
}
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7-MKN9GCwwwjCwFFLcVjaO-q27mRiGkg

// export const authCheck =()=>dispatch=>{
//     const token = localStorage.getItem("token");
//     if(!token){
//         //logout
//     }else{
//         const expirationTime = new Date(localStorage.getItem("Expiration Time"));
//         if(expirationTime<= new Date()){
//             dispatch(logout());
//         }else{
//             const userId = localStorage.getItem("userId");
//             dispatch(authSuccess(token,userId));
//         }
//     }
//     //console.log(dispatch(authSuccess(token,localStorage.userId)));

// }
export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    return{
        type:actionTypes.AUTH_LOGOUT,
    }
}
export const authCheck = () => dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
        // Logout functionality can be implemented here
        // For example, clearing the local storage and redirecting the user
        localStorage.clear();
        //window.location.href = '/login'; 
        dispatch(logout());
        // Redirect to login page
    } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime")); // Corrected typo here
        if (expirationTime <= new Date()) {
            // Token has expired, clear the token and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("expirationTime");
            //window.location.href = '/login'; // Redirect to login page
         dispatch(logout());

        } else {
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess(token, userId));
        }
    }
};