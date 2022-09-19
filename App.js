import React,{useEffect} from 'react'
import {View, Text, StyleSheet,StatusBar} from 'react-native'
import  {SignInContextProvider}  from './src/firebase/Context/authContext'
import {colors} from './src/global/styles'
import RootNavigator from './src/navigation/RootNavigator'
import { enableLatestRenderer } from 'react-native-maps';
import {  notificationListener} from './src/global/helper/pushnotification_helper'


enableLatestRenderer();


export default function App(){

  useEffect(() => { 
    notificationListener();
}, [])
  return(
    <SignInContextProvider>
    <View style = {styles.container}>
      <StatusBar 
        barStyle = "light-content"
        backgroundColor = {colors.statusbar}
      />
   
        <RootNavigator />
     
    </View>
    </SignInContextProvider> 
  
  )
}

const styles = StyleSheet.create({
  container: {flex:1}
})