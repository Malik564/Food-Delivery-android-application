import React from 'react'

import {View, Text, StyleSheet} from 'react-native';
import {Icon, withBadge} from '@rneui/themed'
import {colors,parameters} from '../global/styles'

export default function HomeHeader({navigation}){

 const BadgeIcon = withBadge(0)(Icon)

    return(
    <View style ={styles.header}>

        <View style ={{alignItems:"center",justifyContent:'center', marginLeft:15}}>
            <Icon 
                type = "material-community"
                name = "menu"
                color = {colors.cardbackground}
                size = {32}
                onPress ={()=>{
                    navigation.toggleDrawer()
                }}
            />
        </View>

        <View style ={{alignItems:"center", justifyContent:"center" , flex:1 , marginLeft:-40}}>
            <Text style ={{color:colors.cardbackground, fontSize:25,fontWeight:'bold'}}>GoFood</Text>
        </View>

    </View>
    )
}

const styles = StyleSheet.create({

    header:{
        flexDirection:'row',
        backgroundColor:colors.buttons,
        height:parameters.headerHeight,
        justifyContent:'space-between'
    }
})