import React,{useLayoutEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';


const ClientSearch = createNativeStackNavigator();
export  function ClientStack({navigation,route}) {


    return (
       <ClientSearch.Navigator
        screenOptions={{
            header:()=> null
        }}>

            <ClientSearch.Screen 
                name ="SearchScreen"
                component ={SearchScreen}
                options = {
                    ()=>({
                        
                    })
                }
            />

            <ClientSearch.Screen 
                name ="SearchResultScreen"
                component ={SearchResultScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />

            

       </ClientSearch.Navigator>
    )
}