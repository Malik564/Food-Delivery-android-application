import React,{useContext,useReducer,useEffect , useState} from 'react';
import {View , ActivityIndicator , Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { AuthStack } from './authStack';
import { AppStack } from './appStack'; 
import { SignInContext } from '../firebase/Context/authContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootNavigator(){


   const load=true;
    const [loading , setLoading] =useState(load);


const {signedIn , dispatchSignedIn} = useContext(SignInContext)
 

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

 }, 2000);

 
},[])



   if(loading)
        {
            return(
            <View style={{flex:1,alignItems:'center' , justifyContent:'center'}}>
            <Image style= {{height:250 ,width : 250 , borderRadius:5,}}  source = {require('../assets/logo.png')}></Image>
             <ActivityIndicator size="large" size={40} color = '#DA5004'/>
            </View>
            )
        }
        else{

            return(
            <NavigationContainer>
                { signedIn.userToken === null   ?  <AuthStack />: <AppStack />}
            </NavigationContainer>
            )
        }
}