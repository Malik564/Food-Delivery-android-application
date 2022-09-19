import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert , Image ,Pressable, Dimensions} from 'react-native';
import {colors} from '../../global/styles';
import Header from '../../components/Header';
import {Icon} from '@rneui/themed';
import { Avatar , Button } from '@rneui/base';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {name } from '../../firebase/UserData';

const SCREEN_WIDTH = Dimensions.get('window').width;


const ChangeUsernameScreen= ({navigation}) => {

  const[Username, setUsername] = useState(name)
  
  const [msg , setMsg] = useState('');
  
  
  
  const[UsernameFocussed, setUsernameFocussed] = useState(false)
  const[UsernameBlured,setUsernameBlured] = useState(false)
  
  
  const ChangeUsername=async() =>{  
    firestore().collection("users").doc(auth().currentUser.uid)
              .update({
                  name:Username,
              }).then(()=>{console.log('updated')});
          Alert.alert('Username is Updated Successfully!');
          navigation.goBack();
  }





return (
  <View style = {styles.container}>
    <Header title ="Settings"  type ="arrow-left" navigation ={navigation}/> 
     <ScrollView keyboardShouldPersistTaps = "always">
       <View style = {styles.view1}>
           <Text style ={styles.text1}>Change Username</Text>
       </View>
        <View style ={styles.view2}>
           <View>
               <Text style ={styles.text2}>Enter New Username</Text>
           </View>

              <View style={{justifyContent:'center' , alignItems:'center' }}>
              <View style = {styles.view14}>
                 <Animatable.View animation = {UsernameFocussed? "fadeInRight":"fadeInLeft"} duration = {400}>
                    <Icon name ="person" color ={colors.grey3}  type = "material" />
                 </Animatable.View>
              <TextInput 
                   placeholder = "Username"
                   style = {{flex:1}}
                   autoFocus = {false}
                   onChangeText = {(c) =>{ setUsername(c); } }
                   value = {Username}
                  />

              </View>
          
              {Username==''
                 &&
                  <View><Text style={{color:'red' , margin:5}}>* Username cannot be null.</Text></View>
               }
          
          
               <View style ={styles.view17}>

               <View><Text style={{color:'red' , margin:5}}>{msg}</Text></View> 
                  <Button
                    title = "Save Changes"
                    buttonStyle = {styles.button1}
                    titleStyle ={styles.title1}
                    onPress = {()=>{
                      
                     if(Username=='') 
                         {
                         setMsg('* Username cannot be null.') 
                         }
                      else{
                             setMsg('');
                             ChangeUsername();
                          }
                      }                   
                      }
                   />
               </View>
               </View>
               
               </View>
          </ScrollView>
       </View>
   )
}

export default ChangeUsernameScreen

const styles = StyleSheet.create({

    container:{flex:1,
        backgroundColor:'white'
      },
      view1:{justifyContent:'center',
             alignItems:'flex-start',
             marginTop:10,
             marginBottom:10,
             paddingHorizontal:15
            },
      text1:{fontSize:22,
        color:colors.buttons,
        fontWeight:'bold'
      },

      view2:{justifyContent:'flex-start',
             backgroundColor:'white',
             paddingHorizontal:15
            },

     

      text2:{fontSize:15,
            color:colors.grey2
          },


    view14:{
        borderWidth:1,
        borderRadius:12,
        borderColor:colors.grey4,
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        paddingLeft:5,
        marginTop:20,
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