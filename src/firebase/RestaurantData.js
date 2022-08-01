import React ,{useState}from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export const  addRestaurant=async(restaurantName, Address , city , contact, Rimage, Menu , coordinates)=>{
    firestore().collection('users').doc(auth().currentUser.uid).update({
      restaurant:true
    })
  
    firestore().collection('restaurant').doc(auth().currentUser.uid)
              .set({
                restaurantOwner:auth().currentUser.uid,
                  restaurantName:restaurantName,
                  city:city ,
                  businessAddress:Address,
                  contact: contact,
                  images:Rimage,
                  averageReview:5.0,
                  numberOfReview:0,
                  coordinates: coordinates ,
               
                  productData:Menu,
              }
              ).then(()=>{console.log('added')});
  
}











export const  updateRestaurant=async(restaurantName,Address , city , contact,Rimage,Menu , coordinates)=>{
  
    firestore().collection('restaurant').doc(auth().currentUser.uid)
              .update({
                restaurantOwner:auth().currentUser.uid,
                  restaurantName:restaurantName,
                  businessAddress:Address,
                  city:city ,
                  contact: contact,
                  images:Rimage,
                  averageReview:5.0,
                  numberOfReview:0,
                  coordinates: coordinates ,
                  productData:Menu,
              }
              ).then(()=>{console.log('updated')});
  
}
