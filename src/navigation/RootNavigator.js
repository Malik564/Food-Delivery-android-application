import React,{useContext,useReducer,useEffect , useState} from 'react';
import {View , ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { AuthStack } from './authStack';
import { AppStack } from './appStack';
import { SignInReducer } from '../firebase/Reducer/authReducer'
import { SignInContext } from '../firebase/Context/authContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootNavigator(){


   const load=true;
    const [loading , setLoading] =useState(load);


const {signedIn} = useContext(SignInContext)
const[SignedIn,dispatchSignedIn] = useReducer(SignInReducer,{
    userToken:null,
});


useEffect(()=>{
 setTimeout(async() => {
    let userToken;
    userToken=null;
     try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (error) {
           console.log(error);
        } 
     dispatchSignedIn({type:"UPDATE_SIGN_IN", userToken:userToken})
  
     setLoading(false);

 }, 1000);

 
},[])



   if(loading)
        {
            return(
            <View style={{flex:1,alignItems:'center' , justifyContent:'center'}}>
             <ActivityIndicator size="large" size={80} color = '#DA5004'/>
            </View>
            )
        }
        else{

            return(
            <NavigationContainer>
                { SignedIn.userToken === null   ?  <AuthStack />: <AppStack />}
            </NavigationContainer>
            )
        }
}