import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert , Image ,Pressable, Dimensions} from 'react-native';
import {colors} from '../../global/styles';
import Header from '../../components/Header';
import {Icon} from '@rneui/themed';
import { Avatar , Button } from '@rneui/base';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';


const SCREEN_WIDTH = Dimensions.get('window').width;


const ChangePasswordScreen= ({navigation}) => {

const[passwordFocussed, setPassordFocussed] = useState(false)
const[passwordBlured,setPasswordBlured] = useState(false)

const[CpasswordFocussed, setCPassordFocussed] = useState(false)
const[CpasswordBlured,setCPasswordBlured] = useState(false)

const[CurrentpasswordFocussed, setCurrentPassordFocussed] = useState(false)
const[CurrentpasswordBlured,setCurrentPasswordBlured] = useState(false)

const [msg , setMsg] = useState('');


const [CurrentPassword, setCurrentPassword] = useState('');


const [password, setPassword] = useState('');
const [confirmpassword, setConfirmpassword] = useState('');


let reauthenticate = (currentPassword) => {
  var user = auth().currentUser;
  var cred = auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
}


const changePassword = (currentPassword, newPassword) => {
  reauthenticate(currentPassword).then(() => {
    var user = auth().currentUser;
    user.updatePassword(newPassword).then(() => {
      console.log("Password updated!");
      Alert.alert('Password Changed Successfully!');
      navigation.goBack();
    }).catch((error) => { console.log('+',error); });
  }).catch((error) => { console.log('=',error); });
}


return (
  <View style = {styles.container}>
    <Header title ="Settings"  type ="arrow-left" navigation ={navigation}/> 
     <ScrollView keyboardShouldPersistTaps = "always">
       <View style = {styles.view1}>
           <Text style ={styles.text1}>Change Password</Text>
       </View>
        <View style ={styles.view2}>
           <View>
               <Text style ={styles.text2}>Enter Current Password</Text>
           </View>
              <View style={{justifyContent:'center' , alignItems:'center' }}>
              
                 <View style = {styles.view14}>
                 <Animatable.View animation = {CurrentpasswordFocussed? "fadeInRight":"fadeInLeft"} duration = {400}>
                    <Icon name ="lock" color ={colors.grey3}  type = "material" />
                 </Animatable.View>
                 <TextInput 
                   placeholder = "Current Password"
                   style = {{flex:1}}
                   autoFocus = {false}
                   onChangeText = {(c) =>{ setCurrentPassword(c); } }
                   onFocus = {()=>{setCurrentPassordFocussed(true)}}
                   onBlur = {()=>{setCurrentPasswordBlured(true)}}
                   secureTextEntry
                  />
                <Animatable.View  animation = {CurrentpasswordBlured?"fadeInLeft":"fadeInRight"} duration ={400}>
                    <Icon name ="visibility-off" color ={colors.grey3}  type = "material" style ={{marginRight:10}}/>
                </Animatable.View>      
               </View>


            <View style={{width:SCREEN_WIDTH-30, marginTop:10 }}>
               <Text style ={styles.text2 }>Enter New Password</Text>
           </View>


               <View style = {styles.view14}>
                 <Animatable.View animation = {passwordFocussed? "fadeInRight":"fadeInLeft"} duration = {400}>
                    <Icon name ="lock" color ={colors.grey3}  type = "material" />
                 </Animatable.View>
                 <TextInput 
                   placeholder = "New Password"
                   style = {{flex:1}}
                   autoFocus = {false}
                   onChangeText = {(password) => setPassword(password)}
                   value={password}
                   onFocus = {()=>{setPassordFocussed(true)}}
                   onBlur = {()=>{setPasswordBlured(true)}}
                   secureTextEntry
                  />
                <Animatable.View  animation = {passwordBlured?"fadeInLeft":"fadeInRight"} duration ={400}>
                    <Icon name ="visibility-off" color ={colors.grey3}  type = "material" style ={{marginRight:10}}/>
                </Animatable.View>      
               </View>
              
              
              <View style = {styles.view14}>
               <Animatable.View animation = {CpasswordFocussed? "fadeInRight":"fadeInLeft"} duration = {400}>
                  <Icon name ="lock" color ={colors.grey3}  type = "material" />
               </Animatable.View>
               <TextInput 
                  placeholder = "Confirm New Password"
                  style = {{flex:1}}
                  autoFocus = {false}
                  onChangeText = {(Cpassword) => setConfirmpassword(Cpassword)}
                  value={confirmpassword}
                  onFocus = {()=>{setCPassordFocussed(true)}}
                  onBlur = {()=>{setCPasswordBlured(true)}}
                  secureTextEntry
                />
              <Animatable.View  animation = {CpasswordBlured?"fadeInLeft":"fadeInRight"} duration ={400}>
                  <Icon name ="visibility-off" color ={colors.grey3}  type = "material" style ={{marginRight:10}}/>
               </Animatable.View>      
              </View>


               {
                 password !== confirmpassword  && confirmpassword !=='' &&
                  <View><Text style={{color:'red' , margin:5}}>* Password not matched</Text></View>
               }

              
               <View style ={styles.view17}>

               <View><Text style={{color:'red' , margin:5}}>{msg}</Text></View> 
                  <Button
                    title = "Save Changes"
                    buttonStyle = {styles.button1}
                    titleStyle ={styles.title1}
                    onPress = {()=>{
                      
                     if(password !== confirmpassword  && confirmpassword !=='') 
                         {
                         setMsg('* Password not matched') 
                         }
                      else{
                             setMsg('');
                             changePassword(CurrentPassword , password);
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

export default ChangePasswordScreen

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