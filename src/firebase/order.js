import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'; 




export const  placeOrder=async( CustomerId , restaurantId , order,totalPrice)=>{
    const inv=uuid.v4();

    firestore().collection('users').doc(auth().currentUser.uid).collection('orders').doc(inv).set({
        invoice:inv,
        restaurantId:restaurantId,
        orderStatus:'Pending',
        order:order,
        totalPrice:totalPrice,
        createdAt:new Date().toUTCString(),
        payment:'Pending'
    })

    firestore().collection('restaurant').doc(restaurantId).collection('orders').doc(inv)
              .set({
                invoice:inv,
                CustomerId:CustomerId,
                orderStatus:'Pending',
                order:order,
                totalPrice:totalPrice,
                createdAt:new Date().toUTCString(),
                payment:'Pending'
              }
              ).then(()=>{});
  
}

