import React,{useState , useContext} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert , Image ,Pressable} from 'react-native';
import {colors} from '../../global/styles';
import Header from '../../components/Header';
import {Icon , Badge , LinearProgress} from '@rneui/themed';
import { Avatar , Button } from '@rneui/base';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import {SignInContext} from '../../firebase/Context/authContext';
import { launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import uuid from 'react-native-uuid'; 
import {data} from '../../global/Data';

import SelectDropdown from 'react-native-select-dropdown'


const SignUpScreen = ({navigation}) => {

const[passwordFocussed, setPassordFocussed] = useState(false)
const[passwordBlured,setPasswordBlured] = useState(false)

const[CpasswordFocussed, setCPassordFocussed] = useState(false)
const[CpasswordBlured,setCPasswordBlured] = useState(false)

const [msg , setMsg] = useState('');

const[CNIC , setCNIC] = useState('');
const [contact, setContact] = useState('');
const [username , setUsername] =useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmpassword, setConfirmpassword] = useState('');
const [image , setImage] = useState('');
const [progress , setProgress] = useState(0)
const [City , setCity] = useState('Select City');
const [Street , setStreet] = useState('');



const {register} = useContext(SignInContext);

let Cities =data;

Cities = Cities.filter((item) => item.country == 'PK').map((item) => (item.name));


const pickImgAndUpload=()=>{
  launchImageLibrary({quality:0.5},(fileobj)=>{
    if(!fileobj.didCancel){
    const uploadTask =  storage().ref().child( `/userProfiles/${uuid.v4()}`).putFile(fileobj.assets[0].uri);
                  uploadTask.on('state_changed', 
                  (snapshot) => {
                  setProgress(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                   }
                   , 
                  (error) => {
                    console.log('error uploading image')
                  }, 
                  () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      console.log(downloadURL)
                     setImage(downloadURL);  
                  });
                  }
                );

  } })
}





return (
  <View style = {styles.container}>
    <Header title ="MY ACCOUNT"  type ="arrow-left" navigation ={navigation}/> 
     <ScrollView keyboardShouldPersistTaps = "always">
       <View style = {styles.view1}>
           <Text style ={styles.text1}>Sign-Up</Text>
       </View>
        <View style ={styles.view2}>
           <View>
               <Text style ={styles.text2}>New on GoFood ?</Text>
           </View>
              <View style={{justifyContent:'center' , alignItems:'center' }}>
              
              <Image style= {styles.userImage}  source = {image ? {uri: image}: require('../../assets/profile.png') } ></Image>        
               <Badge
               onPress={()=>{pickImgAndUpload()}}
                  value ={<Image  source = {require('./../../assets/camera.png')}/>}
                   containerStyle={{ position: 'absolute', top:-4 , right:120}}
                   badgeStyle = {{backgroundColor:'#dff' , height:45, width:45 , borderRadius:20}}
                  />
              </View>
              <LinearProgress
     color='#376F1B'
              style={{ marginVertical: 10 }}
        value={progress}
        variant="determinate"
      />     
            <View style ={styles.view6}>
                <TextInput 
                  placeholder = "Name"
                  style = {styles.input1}
                  autoFocus = {true}
                  onChangeText = {(name) => setUsername(name)}
                  value={username}
                />
              </View>
              <View style ={styles.view6}>
               <TextInput 
                 placeholder = "Mobile Number"
                 style = {styles.input1}
                 keyboardType ="number-pad"
                 autoFocus = {false}
                 onChangeText = {(mobileNumber) => setContact(mobileNumber)}
                 value ={contact}
               />
              </View>
              <View style ={styles.view6}>
               <TextInput 
                 placeholder = "CNIC"
                 style = {styles.input1}
                 keyboardType ="number-pad"
               autoFocus = {false}
                 onChangeText = {(C) => setCNIC(C)}
                 value ={CNIC}
               />
              </View>
             
              <View style ={styles.view10}>
                 <View>
                     <Icon 
                       name ='email'
                       style ={styles.email}
                       color ={colors.grey3}
                       type ="material"
                     />
                 </View>
                 <View style ={styles.view11}>
                     <TextInput 
                       placeholder = "Email"
                       style = {styles.input4}
                       autoFocus = {false}
                       onChangeText = {(email)=>setEmail(email)}
                       value={email}
                     />
                </View>
                 </View>
               <View style = {styles.view14}>
                 <Animatable.View animation = {passwordFocussed? "fadeInRight":"fadeInLeft"} duration = {400}>
                    <Icon name ="lock" color ={colors.grey3}  type = "material" />
                 </Animatable.View>
                 <TextInput 
                   placeholder = "Password"
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
                  placeholder = "Confirm Password"
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

               <View>
                        <Text style={{marginLeft:10 , marginTop:10}}>City :</Text>
                               <SelectDropdown
	                                data={Cities}
                                  buttonStyle={styles.TextInput1}
                                  defaultButtonText={City}
	                                onSelect={(selectedItem, index) => {
	                                	setCity(selectedItem)
	                                }}
	                                buttonTextAfterSelection={(selectedItem, index) => {
	                                	// text represented after item is selected
	                                	// if data array is an array of objects then return selectedItem.property to render after item is selected
	                                	return selectedItem
	                                }}
	                                rowTextForSelection={(item, index) => {
	                                	// text represented for each item in dropdown
	                                	// if data array is an array of objects then return item.property to represent item in dropdown
	                                	return item
	                                }}
                                />
                        </View>

                <View style ={styles.view6}>
               <TextInput 
                 placeholder = "Street"
                 style = {styles.input1}
                 autoFocus = {false}
                 onChangeText = {(C) => setStreet(C)}
                 value ={Street}
               />
              </View>
               <View style ={styles.view15}>
                  <Text style ={styles.text3}>By creating or logging into an account you are</Text>
                  <View style ={styles.view16}>
                      <Text style ={styles.text3}>agreeing with our  </Text>
                      <Text style ={styles.text4}> Terms & Conditions</Text>
                      <Text style = {styles.text3}> and </Text>
                  </View>
                  <Text style ={styles.text4}> Privacy Statement</Text>
               </View>
               <View style ={styles.view17}>

               <View><Text style={{color:'red' , margin:5}}>{msg}</Text></View> 
                  <Button
                    title = "Create my account"
                    buttonStyle = {styles.button1}
                    titleStyle ={styles.title1}
                    onPress = {()=>{
                      
                      if(image=='' || !image )
                      {
                          setMsg('* Please select an image');

                      }else if( name = ''  || contact=='' || CNIC =='' || email=='' || password=='' || confirmpassword =='' || City =='Select City' ||Street =='' ){
                        
                         setMsg('* Please insert all the entries ')
                      } else if(password !== confirmpassword  && confirmpassword !=='') 
                         {
                         setMsg('* Password not matched') 
                         }
                      else{
                             setMsg('');
                             register(email,password , username , contact , CNIC , image , City, Street)
                          }
                      }                   
                      }
                   />
               </View>
                       </View>
               <View style = {styles.view18}>
                  <Text style ={styles.text5}>OR</Text>
               </View>
               <View style ={styles.view19}>
                 <View style ={styles.view20}>
                     <Text style ={styles.text6}>Already have an account with GoFood ?</Text>
                 </View>
                 <View style ={styles.view21}>
                 <Button 
                   title = "Sign-In"
                   buttonStyle ={styles.button2}
                   titleStyle = {styles.title2}
                   onPress ={()=>{ navigation.navigate('SignInScreen')}}
                 />
                 </View>
               </View>
          </ScrollView>
       </View>
   )
}

export default SignUpScreen

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

      view3:{marginTop:5,
            marginBottom:10
          },

      text2:{fontSize:15,
            color:colors.grey2
          },

      view4:{flexDirection:'row',
              borderWidth:1,
              borderColor: colors.grey4,
              borderRadius:12,
              paddingLeft:5
          
            },

      view5:{ marginLeft:30,
              marginTop:20      
               },

      input1:{fontSize:16, },

      view6:{flexDirection:'row',
              borderWidth:1,
              borderColor: colors.grey4,
              borderRadius:12,
              paddingLeft:5,
              marginTop:20,
              height:48
          },

       view7:   {marginLeft:0,
                 maxWidth:"65%",         
               },

      input2:{fontSize:16,
              marginLeft: 0,
              marginBottom:0
                  },         

      view8:{flexDirection:'row',
            borderWidth:1,
            borderColor: colors.grey4,
            borderRadius:12,
            paddingLeft:5,
            marginTop:20,
            height:48
          },

      view9:{marginLeft:0,
             maxWidth:"65%",    
           },

      input3:{fontSize:16,
        marginLeft: 0,
        marginBottom:0
       },

      view10: {flexDirection:'row',
              borderWidth:1,
              borderColor:colors.grey4,
              borderRadius:12,
              paddingLeft:5,
              marginTop:20,
              height:48
       },

       email:{fontSize:24,
              padding:0,
              marginBottom:0 ,
              marginTop:11,
              marginLeft:2
              },

       view11 : { marginLeft:30,
                  maxWidth:"65%",    
                },

       input4:{fontSize:16,
              marginLeft: -20,
              marginBottom:-10
              },      

     view13:  {flexDirection:"row",
              height:40,
            } ,

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
      
    view15:{alignItems:'center',
            justifyContent:'center',
            marginTop:10
          },

    text3: {fontSize:13
              },
              
      view16:{flexDirection:'row'},

      text4:{textDecorationLine:'underline',
            color:'green',
            fontSize:13
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

    view18:{flex:1,
            justifyContent:'flex-start',
            alignItems:'center',
            paddingTop:15,
          },

    text5:   {fontSize:15,
              fontWeight:'bold',
              },
              
      view19:{ backgroundColor:'white',
              paddingHorizontal:15,
              
              },

      view20:{marginTop:5
            },
      
      view21:{marginTop:5,
        alignItems:'flex-end',
      },

      button2:{backgroundColor:colors.background3,
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:colors.background2,
        height:40,
        paddingHorizontal:20,
        // width:'100%'
                          
      },

      title2:{color:colors.buttons,
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
                        
    },
 avatar:{
            borderWidth:4,
            borderColor:colors.pagebackground
        },
userImage:{
    height:100 ,
    width : 100 , 
    borderRadius:50 , 
    margin :10,
    marginLeft:15
},TextInput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:10,
        paddingLeft:15,
        marginTop:10
      },

})