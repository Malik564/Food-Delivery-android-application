import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


let name ;
let contact ; 
let createdAt ;
let location ; 
let restaurant;
let image ; 
let city;
let UserEmail;

export const user=async() =>  firestore().collection("users")
            .doc(auth().currentUser.uid)
            .get().then(function(doc){
                documentSnapshot = doc.data();
                name = documentSnapshot.name
                contact = documentSnapshot.contact;
                createdAt = documentSnapshot.createdAt;
                location = documentSnapshot.createdAt;
                restaurant=documentSnapshot.restaurant;
                image = documentSnapshot.userImg;
                city = documentSnapshot.city;
                UserEmail = documentSnapshot.email;
            })

user();

export { name , contact , location , createdAt , restaurant , image , city , UserEmail} 
 