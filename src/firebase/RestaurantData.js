import React ,{useState}from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export const  addRestaurant=async(restaurantName,Address,Rimage,Menu)=>{
    firestore().collection('users').doc(auth().currentUser.uid).update({
      restaurant:true
    })
  
    firestore().collection('restaurant').doc(auth().currentUser.uid)
              .set({
                restaurantOwner:auth().currentUser.uid,
                  restaurantName:restaurantName,
                //   farAway:"21.2",
                  businessAddress:Address,
                  images:Rimage,
                  averageReview:5.0,
                  numberOfReview:0,
                  coordinates: {lat: -26.1888612, lng: 28.246325} ,
                  discount:0,
                  deliveryTime:30,
                  collectTime:20,
                  productData:Menu,
              }
              ).then(()=>{console.log('added')});
  
}











export const  updateRestaurant=async(restaurantName,Address,Rimage,Menu)=>{
  
    firestore().collection('restaurant').doc(auth().currentUser.uid)
              .update({
                restaurantOwner:auth().currentUser.uid,
                  restaurantName:restaurantName,
                  businessAddress:Address,
                  images:Rimage,
                  averageReview:5.0,
                  numberOfReview:0,
                  coordinates: {lat: -26.1888612, lng: 28.246325} ,
                  discount:0,
                  deliveryTime:30,
                  collectTime:20,
                  productData:Menu,
              }
              ).then(()=>{console.log('updated')});
  
}
