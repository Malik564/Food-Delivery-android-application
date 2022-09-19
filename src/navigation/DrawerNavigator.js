import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';   
import RootClientTabs from './ClientTabs';
import {Icon} from '@rneui/themed';
import {colors} from '../global/styles';
import RestaurantStack from './restaurantStack';
import DrawerContent from '../components/DrawerContent'
import MyAccountScreen from '../screens/Account/MyAccountScreen'
import settingsScreen from '../screens/settings/settingsScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){

    return(
        <Drawer.Navigator drawerContent  = {props =><DrawerContent {...props} /> } >
        
     
            <Drawer.Screen 
                name = "RootClientTabs"
                component ={RootClientTabs}

                options = {{
                    headerShown: false,
                    title:'Home',
                    drawerIcon: ({focussed,size}) =>(
                        <Icon 
                            type = "material-community"
                            name = "home"
                            color = {focussed ? '#7cc' :colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />


        <Drawer.Screen 
                name = "restaurantStack"
                component ={RestaurantStack}
                options = {{
                    headerShown: false,
                    title:'Business Console',
                    drawerIcon: ({focussed,size}) =>(
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' :colors.grey2}
                            size = {size}

                        />
                    )
                }}
            />
            <Drawer.Screen 
                name = "My Account"
                component ={MyAccountScreen}
                options = {{
                    headerShown: false, 
                    drawerIcon: ({focussed,size}) =>(
                        <Icon 
                            type = "material"
                            name = "person"
                            color = {focussed ? '#7cc' :colors.grey2}
                            size = {size}

                        />
                    )
                }}
            />



            <Drawer.Screen 
                name = "Settings"
                component ={settingsScreen}
                options = {{
                    headerShown: false, 
                    drawerIcon: ({focussed,size}) =>(
                        <Icon 
                            type = "material-community"
                            name = "cog-outline"
                            color = {focussed ? '#7cc' :colors.grey2}
                            size = {size}

                        />
                    )
                }}
            />
           
           


        </Drawer.Navigator>
    )

}