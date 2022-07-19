import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


let name ;
let contact ; 
let createdAt ;
let location ; 
let restaurant;
let image ; 



export const user =  firestore().collection("users")
            .doc(auth().currentUser.uid)
            .get().then(function(doc){
                documentSnapshot = doc.data();
                name = documentSnapshot.name
                contact = documentSnapshot.contact;
                createdAt = documentSnapshot.createdAt;
                location = documentSnapshot.createdAt;
                restaurant=documentSnapshot.restaurant;
                image = documentSnapshot.userImg;
            })


export { name , contact , location , createdAt , restaurant , image} 
export const UserEmail = auth().currentUser.email;