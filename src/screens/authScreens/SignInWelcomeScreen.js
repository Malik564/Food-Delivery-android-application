import React,{useState,useRef,useEffect,useContext} from 'react';
import {View, Text, StyleSheet, Dimensions,Image,ScrollView} from 'react-native'
import {colors, parameters,title} from "../../global/styles"
import Swiper from 'react-native-swiper'
import {Icon, SocialIcon} from '@rneui/themed'
import { Button } from '@rneui/base';

import auth from '@react-native-firebase/auth';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export default function SignInWelcomeScreen({navigation}){



    return(
    <ScrollView scrollEnabled={false} contentContainerStyle = {{flexGrow: 1,justifyContent: 'space-between' ,}}>

        <View style ={{ }}>
         
            <Swiper autoplay ={true} style ={{height:windowHeight }}>
              <View style ={styles.slide1}>
                <Image 
                        source ={{uri:"https://kaboompics.com/cache/6/8/a/5/e/68a5e1bd85a77bc59e6710b49cc616676d865df7.jpeg"}}
                        style ={{height:windowHeight, width:windowWidth}}
                />
              </View>  

              <View style ={styles.slide2}>
                <Image 
                        source ={{uri:"https://kaboompics.com/cache/7/7/7/6/8/77768d525fa2c4b7fa5d74389c23cd1c285b08d4.jpeg"}}
                        style ={{height:"100%", width:"100%"}}
                />
              </View>    


              <View style ={styles.slide3}>
                <Image 
                        source ={{uri:"https://kaboompics.com/cache/b/6/e/e/8/b6ee87fc16366317e505bab88f6ecbac08dc235a.jpeg"}}
                        style ={{height:"100%", width:"100%"}}
                />
              </View>

              <View style ={styles.slide3}>
                <Image 
                        source ={{uri:"https://kaboompics.com/cache/4/9/c/6/2/49c6226b4a68812b49ad33c8fca51d596fba3546.jpeg"}}
                        style ={{height:"100%", width:"100%"}}
                />
              </View>

            </Swiper>
        </View>


        <View style ={styles.titleTextView}>    
            <Text style={{fontSize:26,color:colors.buttons,fontWeight:'bold' ,top:50}}>DISCOVER RESTAURANTS</Text>
            <Text style={{fontSize:26,color:colors.buttons,fontWeight:'bold',top:50}}>IN YOUR AREA</Text>     
         </View> 

        <View style ={{marginBottom:20 ,position: 'absolute',width : windowWidth , bottom:100}}>
        <View style ={{marginHorizontal:20, marginTop:30}}>
                <Button 
                    title ="SIGN IN"
                    buttonStyle = {parameters.styledButton}
                    titleStyle = {parameters.buttonTitle}
                      onPress ={()=>{
                        navigation.navigate("SignInScreen")
                      }}
                   />
        </View>
        <View style ={{marginHorizontal:20, marginTop:30}}>
                <Button 
                    title ="Create an account"
                    buttonStyle ={styles.createButton}
                    titleStyle ={styles.createButtonTitle}
                    onPress ={()=>{navigation.navigate("SignUpScreen")}}
                />
            </View>
        </View>
    </ScrollView>   
    )
}


const styles = StyleSheet.create({

    slide1: {
      height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9Df563'
      },
      slide2: {
        height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
      },
      slide3: {
        height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9243f9'
      },

      createButton:{
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:colors.buttons,
        height:50,
        paddingHorizontal:20,
        borderColor:colors.buttons,
      },

      createButtonTitle:{
        color:colors.grey1,
        fontSize:20,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
      },
      titleTextView:{
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:20,
        position: 'absolute' ,
        backgroundColor:'rgba(30, 30, 30,0.4)',
        width:windowWidth,
        height:windowHeight
      }

})