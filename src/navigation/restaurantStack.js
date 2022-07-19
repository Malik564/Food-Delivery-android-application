import React from 'react'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import AddRestaurantScreen from '../screens/BusinessConsole/AddRestaurantScreen';
import BusinessConsoleScreen from './../screens/BusinessConsole/BusinessConsoleScreen';
import EditRestaurantScreen from '../screens/BusinessConsole/EditRestaurantScreen';
import OrderReceivingScreen from '../screens/BusinessConsole/OrderReceivingScreen';

const restaurantStackNavigator = createNativeStackNavigator();

export default function RestaurantStack(){

return(
<restaurantStackNavigator.Navigator>

<restaurantStackNavigator.Screen
    name="BusinessConsoleScreen"
    component= {BusinessConsoleScreen}
    options={{
        headerShown:false,
        title:'Business Console',
    }}
/>

 <restaurantStackNavigator.Screen 
 name ="AddRestaurantScreen"
 component ={AddRestaurantScreen}
 options ={{
     headerShown: false,
 }}
/> 


 <restaurantStackNavigator.Screen 
 name ="EditRestaurantScreen"
 component ={EditRestaurantScreen}
 options ={{
     headerShown: false,
 }}
/> 


 <restaurantStackNavigator.Screen 
 name ="OrderReceivingScreen"
 component ={OrderReceivingScreen}
 options ={{
     headerShown: true,
     title:'Orders'
 }}
/> 


</restaurantStackNavigator.Navigator>
)
}