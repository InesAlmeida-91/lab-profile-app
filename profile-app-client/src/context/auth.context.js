import React, { useState, useEffect } from "react";
//import axios from "axios";
//const API_URL = "http://localhost:5005";
import authService from '../services/auth.service';
 
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {     
        localStorage.setItem('authToken', token);
      }//get the token from the backend and store it in localStorage
     
      const authenticateUser = () => {//check if the user is logged in - if the token is valid
        const storedToken = localStorage.getItem('authToken');
        
        if (storedToken) {
          authService.verifyToken(storedToken)
          .then((userPayload) => {    
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(userPayload);        
          })
          .catch((error) => {      
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);        
          });      
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);      
        }   
      }
     
      const removeToken = () => {//delete the token from the localstorage
        localStorage.removeItem("authToken");
      }
     
     
      const logOutUser = () => {  
        removeToken();   
        authenticateUser();
      }  
     
    
      useEffect(() => {                                            
        authenticateUser(); //refresh the page and update the state variables after the user login or logout
      }, []);

    return(
        <AuthContext.Provider value={{isLoggedIn, isLoading, user, setUser, storeToken, authenticateUser, logOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper}