import React,{useState,useRef,useContext} from 'react';
import {View, Text, StyleSheet, Dimensions,TextInput, Alert, ActivityIndicator} from 'react-native' ;
import {colors , parameters  , title} from  '../../global/styles';
import { Icon , SocialIcon ,Tooltip} from "@rneui/themed";
import { Button } from '@rneui/base';
import * as Animatable from 'react-native-animatable';
import Header from '../../components/Header';
import {SignInContext} from './../../firebase/Context/authContext'



export default function SignInScreen({navigation}){

    const[loading , setLoading] = useState(false);
    const[textInput2Fossued, setTextInput2Fossued] =useState(false)
    const[visibile, setVisible] =useState(false)

    const textInpput1 = useRef(1)
    const textInput2 = useRef(2)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg , setMsg] = useState();

    const {login} = useContext(SignInContext);


    return(
        <View style ={styles.container}>

           
             <Header title ="MY ACCOUNT"  type ="arrow-left" navigation ={navigation}/>  

             <View style ={{marginLeft:20, marginTop:10}}>
                 <Text style ={title}>Sign-In</Text>
             </View> 

            <View style ={{alignItems:"center",marginTop:10}}>
                <Text style= {styles.text1} >Please enter the email and password</Text>
                <Text style= {styles.text1} >registered with your account</Text> 
            </View>
                   
                <View>
                <View style ={{marginTop:20}}>
                <View>
                    <TextInput 
                      style ={styles.TextInput1}
                      placeholder ="Email"
                      ref ={textInpput1}
                      onChangeText={(userEmail) => setEmail(userEmail)}
                      value = {email}
                    />
                </View>

                <View style ={styles.TextInput2}>
                <Animatable.View animation ={textInput2Fossued?"":"fadeInLeft"} duration={400} >
                    <Icon 
                        name ="lock"
                        iconStyle ={{color:colors.grey3}}
                        type ="material"
                    />
                </Animatable.View>
                     <TextInput 
                      style= {{flex:1}}
                      placeholder ="Password"
                      value= {password}
                      ref ={textInput2}
                      onFocus ={()=>{
                          setTextInput2Fossued(false)
                      }}
                      onBlur ={()=>{
                          setTextInput2Fossued(true)
                      }}
                      onChangeText={(userPassword) => setPassword(userPassword)}
                      secureTextEntry={!visibile}
                    />

                    <Animatable.View animation ={textInput2Fossued?"":"fadeInLeft"} duration={400} >
                        <Icon 
                                name ={  visibile ? "visibility-off":"visibility"}
                                iconStyle ={{color:colors.grey3}}
                                type ="material"
                                style={{marginRight:10}}
                                onPress={()=>{visibile? setVisible(false) : setVisible(true)}} 
                            />

                </Animatable.View>
                </View>
            </View>
             <View><Text style={{color:'red' , margin:5}}>{msg}</Text></View> 

            <View style ={{marginHorizontal:20, marginTop:30}}>
                <Button 
                    title ={loading? <ActivityIndicator /> : "SIGN IN"}
                    buttonStyle = {parameters.styledButton}
                    titleStyle = {parameters.buttonTitle}
                    onPress={() => {
                        if(email=='' || password==''){
                            setMsg('* Please insert all the entries ')
                        }
                        else
                        {
                         
                            setMsg('');
                            setLoading(true);
                            login(email, password);
                            
                            }
                         }}
                   />
            </View>  
            </View>
            
            <View style ={{alignItems:"center",marginTop:15}}>
                <Text style ={{...styles.text1, textDecorationLine:"underline"}}> Forgot Password ?</Text>
            </View> 

            <View style ={{alignItems:"center",marginTop:30, marginBottom:30}}>
                <Text style ={{fontSize:20, fontWeight:"bold",color:'#777'}}>OR</Text>
            </View>    

            

            <View style ={{marginTop:50,marginLeft:20}}>
                <Text style ={{...styles.text1,}}>New on GoFood ?</Text>
            </View>           


            <View style ={{alignItems:"flex-end",marginHorizontal:20}}>
                <Button 
                    title ="Create an account"
                    buttonStyle ={styles.createButton}
                    titleStyle ={styles.createButtonTitle}
                    onPress ={()=>{navigation.navigate("SignUpScreen")}}
                />
            </View>

        </View>
        )
}
const styles = StyleSheet.create({
    container :{
        flex:1
    },

    text1:{
        color:colors.grey3,
        fontSize:16,
    },

    TextInput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15,color:'#333'
        
      },

      TextInput2:{
        borderWidth:1,
         borderRadius:12,
         marginHorizontal:20,
         borderColor:"#86939e",
         flexDirection:"row",
         justifyContent:"space-between",
         alignContent:"center",
         alignItems:"center",
         paddingLeft:15,color:'#333'
  
      },

      SocialIcon :{
        borderRadius :12,
        height:50,
        width : '100%'
        
      },

      createButton:{
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:"#ff8c52",
        height:40,
        paddingHorizontal:20,
      },

      createButtonTitle:{
        color:"#ff8c52",
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
      }  
})