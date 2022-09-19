import React from 'react'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import RestaurantsMapScreen from '../screens/RestaurantsMapScreen';
import DrawerNavigator from './DrawerNavigator';
import MenuScreen from './../screens/RestaurantTabs/MenuScreen';

import CartScreen from './../screens/Cart/CartScreen';
import OrderSccessfullScreen from './../screens/Cart/OrderSuccessfullScreen';
import SettingsScreen from './../screens/settings/settingsScreen';
import ChangePasswordScreen from './../screens/settings/ChangePasswordScreen';
import ChangeUsernameScreen from './../screens/settings/ChangeUsernameScreen';
import ChangeAddressScreen from './../screens/settings/ChangeAddressScreen';
import DeleteRestaurantScreen from './../screens/settings/DeleteRestaurantScreen';


const App = createNativeStackNavigator();

export function AppStack(){

return(
<App.Navigator>
 <App.Screen 
 name ="App"
 component ={DrawerNavigator}
 options ={{
     headerShown: false,
 }}
/> 

<App.Screen 
 name ="RestaurantsMapScreen"
 component = {RestaurantsMapScreen}
 options ={{
     headerShown: false,
 }}
/> 
<App.Screen
      name="MenuScreen"
    component={MenuScreen}
    options={{
        headerShown:false,
    }}
/>


<App.Screen
    name="CartScreen"
    component={CartScreen}
    options={{
        headerShown:true,
        title:'Cart'
    }}
/>

<App.Screen
    name="OrderSccessfullScreen"
    component={OrderSccessfullScreen}
    options={{
        headerShown:false,
    }}
/>




<App.Screen
    name="SettingsScreen"
    component={SettingsScreen}
    options={{
        headerShown:false,
    }}
/>



<App.Screen
    name="ChangePasswordScreen"
    component={ChangePasswordScreen}
    options={{
        headerShown:false,
    }}
/>



<App.Screen
    name="ChangeUsernameScreen"
    component={ChangeUsernameScreen}
    options={{
        headerShown:false,
    }}
/>


<App.Screen
    name="ChangeAddressScreen"
    component={ChangeAddressScreen}
    options={{
        headerShown:false,
    }}
/>

<App.Screen
    name="DeleteRestaurantScreen"
    component={DeleteRestaurantScreen}
    options={{
        headerShown:false,
    }}
/>
</App.Navigator>
)
}