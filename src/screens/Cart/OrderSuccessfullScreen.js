import React from 'react';
import {View , Text,StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native'
import {parameters} from '../../global/styles'
import {Button} from '@rneui/base'
import { StackActions } from '@react-navigation/native';
export default function OrderSccessfullScreen({navigation})
{
  
    return( 
    <View style={{flex:1}}>
        <View style={{ justifyContent:'center' , alignItems:'center',height:500 , width:'100%'}}>
        <LottieView source={require('../../assets/99705-food-is-ready.json')} autoPlay loop />
        <LottieView source={require('../../assets/41373-confetti-throw.json')} autoPlay loop />
        </View>
        
        <View style={{width:'100%' , justifyContent:'center' , alignItems:'center' }}>
          <Text style={{fontSize: 20,fontWeight: 'bold' , color:'#222'}}>Meal is on the way!</Text>
        </View>
        <View><Button   
              title ="OK"
              buttonStyle = {styles.OrderSccessfullButton}
              titleStyle = {parameters.buttonTitle}
              onPress={()=>{navigation.dispatch(StackActions.popToTop());}}
        /></View>
    </View>
    )
}



const styles = StyleSheet.create({
  OrderSccessfullButton:{
    backgroundColor:"#ff8c52",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:"#ff8c52",
        height:40,
        paddingHorizontal:20,
  }
})