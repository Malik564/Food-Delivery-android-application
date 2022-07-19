import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';





export const  placeOrder=async( CustomerId , restaurantId , order,totalPrice)=>{

    firestore().collection('users').doc(auth().currentUser.uid).collection('orders').add({
        restaurantId:restaurantId,
        orderStatus:'pending',
        order:order,
        totalPrice:totalPrice,
        createdAt:new Date().toUTCString()
    })

    firestore().collection('restaurant').doc(restaurantId).collection('orders')
              .add({
                CustomerId:CustomerId,
                orderStatus:'pending',
                order:order,
                totalPrice:totalPrice,
                createdAt:new Date().toUTCString()
              }
              ).then(()=>{});
  
}

