import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert , Image ,Pressable, Dimensions} from 'react-native';
import {colors} from '../../global/styles';
import Header from '../../components/Header';
import {Icon} from '@rneui/themed';
import { Avatar , Button } from '@rneui/base';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {street , restaurant } from '../../firebase/UserData';

const SCREEN_WIDTH = Dimensions.get('window').width;


const DeleteRestaurantScreen= ({navigation}) => {


    const DeleteRes = async()=>{
         firestore().collection('restaurant').doc(auth().currentUser.uid).delete();
         firestore().collection('users').doc(auth().currentUser.uid).update({
            restaurant:false
         }).then(()=>{
            Alert.alert('Restaurant Delted Successfully !');
            navigation.goBack();
         })
    }





return (
  <View style = {styles.container}>
    <Header title ="Settings"  type ="arrow-left" navigation ={navigation}/>
          
          
               <View style ={styles.view17}>

                  <Button
                   
                    title = "Delete Restaurant"
                    buttonStyle = {styles.button1}
                    titleStyle ={styles.title1}
                    onPress = {()=>{
                            Alert.alert(
                               "Delete Restaurant",
                               "Are you sure you want to delete your restaurant?",
                               [
                                { text: "Yes", onPress: () => {console.log("OK Pressed"); DeleteRes(); } },
                                 {
                                   text: "No",
                                   onPress: () => console.log("Cancel Pressed"),
                                   style: "cancel"
                                 },
                                 
                               ]
                             );
                      }}
                   />
               </View>
              
              
     </View>

   )
}

export default DeleteRestaurantScreen

const styles = StyleSheet.create({

    container:{flex:1,
        backgroundColor:'white'
      },
      view1:{justifyContent:'center',
             alignItems:'center',
             marginTop:10,
             marginBottom:10,
             paddingHorizontal:15
            },
     
      button1: {backgroundColor:colors.buttons,
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:colors.buttons,
        height:50,
        paddingHorizontal:20,
        width:'100%'
                          
      },
      
      title1:{color:"white",
      fontSize:20,  
      fontWeight:"bold" ,
      alignItems:"center",
      justifyContent:"center"  ,
      marginTop:-3
                            
    },

    view17:{marginVertical:10,
            marginTop:30
          },
 
})