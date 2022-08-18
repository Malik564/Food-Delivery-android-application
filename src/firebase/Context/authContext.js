import React, {createContext,useReducer, useState} from 'react'
import {Alert  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignInReducer } from '../Reducer/authReducer'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
 
export const SignInContext = createContext()

 export const SignInContextProvider = (props)=>{

const[signedIn,dispatchSignedIn] = useReducer(SignInReducer,{
    userToken:null,
});


return(
    <SignInContext.Provider value = {{signedIn,dispatchSignedIn,
    
     login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password).then(()=>{
                  let userToken;
            try {
              userToken='fefefefefe';
                AsyncStorage.setItem('userToken',userToken );
                   } catch (error) {
                      console.log(error);
                   }
                dispatchSignedIn({type:"UPDATE_SIGN_IN", userToken:userToken})
            });
             
                    
          }  catch(error){
        Alert.alert(
            error.name='Network Error',
            error.message=error.message
        )
    }

        },
        register: async (email,password ,name , contact ,CNIC, image, city , street) => {
          try {
            const user = await auth().createUserWithEmailAndPassword(email, password )
            .then(() => {
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              firestore().collection('users').doc(auth().currentUser.uid)
              .set({
                  id: auth().currentUser.uid,
                  name:name ,
                  email: email,
                  contact:contact,
                  CNIC:CNIC,
                  location:'NA',
                  createdAt: firestore.Timestamp.fromDate(new Date()),
                  userImg: image,
                  restaurant: false , 
                  city:city,
                  street: street
              }
              )  


              
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch(error => {
                 Alert.alert(
             error.name='Network Error',
            error.message='Check internet connection')
              })
              
            })


            let userToken;
            try {
              userToken='fefefefefe';
               await AsyncStorage.setItem('userToken',userToken );
                   } catch (error) {
                      console.log(error);
                   }
                dispatchSignedIn({type:"UPDATE_SIGN_IN", userToken:userToken})
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                Alert.alert(
            error.name,
            error.message)
            });
          
          } catch (error) {
             console.log(error)
          }
        },
        logout: async () => {
          try{
        auth().signOut()
        .then(
            ()=>{console.log("USER SUCCESSFULLY SIGNED OUT")
             
        }
        )
        try{
            await AsyncStorage.removeItem('userToken');
        }catch(error){
          console.log(error);
        }
        dispatchSignedIn({type:'SIGN_OUT',userToken:null }) ;
         
    }catch(error){
       Alert.alert(
             error.name='Network Error',
            error.message='Check internet connection')
    }
        }
    }}>
        {props.children}
    </SignInContext.Provider>
)

}