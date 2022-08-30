import React  from 'react';
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
        payment:'Pending',
        review:0,
        feedback: ''
    })

    firestore().collection('restaurant').doc(restaurantId).collection('orders').doc(inv)
              .set({
                invoice:inv,
                CustomerId:CustomerId,
                orderStatus:'Pending',
                order:order,
                totalPrice:totalPrice,
                createdAt:new Date().toUTCString(),
                payment:'Pending',
                review:0,
                feedback: ''
              }
              ).then(()=>{});
  
}




export const  reviewUpdate = async( restaurantId, inv , review , feedback)=>{

    firestore().collection('users').doc(auth().currentUser.uid).collection('orders').doc(inv).update({
      review: review,
      feedback : feedback
      
    })

    firestore().collection('restaurant').doc(restaurantId).collection('orders').doc(inv)
     .update({
       review : review,
       feedback : feedback
     }
     ).then(()=>{});
  
}


//Average Review

let ReviewsData =[];

let totalReviews=0;
let averageReview=0;
let Total=0;

export const UpdateAverageReview = (restaurantId)=>{
    ReviewsData.length=0;   // to clear old array of data
    const getReviewData=async() => {
     await firestore().collection('restaurant').doc(restaurantId).collection('orders').where('orderStatus','==','Delivered').get()
    .then(function(documentSnapshot){
      documentSnapshot.forEach((doc) => {
            ReviewsData.push(doc.data());
          });

      for (var i=0; i < ReviewsData.length; i++) { 
        Total += ReviewsData[i].review ;
        totalReviews = i+1  ;
        }
      averageReview = Total / totalReviews;

      firestore().collection('restaurant').doc(restaurantId).update({
        averageReview:averageReview,
        numberOfReview: totalReviews
      });

   
   });
    }   
    getReviewData();
}
