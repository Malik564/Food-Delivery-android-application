import React , {useState , useContext , useEffect } from 'react';
import {View , Text , Linking , Pressable , Alert , Switch , StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerContentScrollView , DrawerItemList , DrawerItem} from '@react-navigation/drawer';
import {Avatar , Button , Icon} from '@rneui/themed';
import {colors} from '../global/styles'
import {SignInContext} from '../firebase/Context/authContext'
import {UserEmail , name ,restaurant , image} from '../firebase/UserData';

export default function DrawerContent(props){
        const {logout} = useContext(SignInContext);


        
         return(
             <View style ={styles.container}>
                 <DrawerContentScrollView {...props}>
                 <View style ={{backgroundColor:colors.buttons,}}>
                <View style = {{flexDirection:'row', alignItems:'center',
                                    paddingLeft:20,paddingVertical:10}}>
                    <Avatar 
                        rounded
                        avatarStyle ={styles.avatar}
                        size = {75}
                        source = {{uri: image}}
                    />

                    <View style ={{marginLeft:10}}>
                        <Text style ={{fontWeight:'bold',color:colors.cardbackground,fontSize:18 }} >{name}</Text>
                        <Text style ={{color:colors.cardbackground,fontSize:14}} > {UserEmail}</Text>
                    </View>

                </View>

                <View style ={{flexDirection:'row',justifyContent:"space-evenly",paddingBottom:5}}>

                    <View style ={{flexDirection:'row', marginTop:0,}}>
                        <View style = {{marginLeft:10,alignItems:"center", justifyContent:"center" }}  >
                            <Text  style ={{fontWeight:'bold',color:colors.cardbackground,fontSize:18 }}>1</Text>
                            <Text style ={{color:colors.cardbackground,fontSize:14}} >My Favorites</Text>
                        </View>
                    </View>

                    <View style ={{flexDirection:'row', marginTop:0}}>
                         <View style = {{marginLeft:10,alignItems:"center", justifyContent:"center" }}  >
                             <Icon 
                            type ="material"
                            name = {restaurant ? "done-outline": "cancel"}
                            
                            size ={28}
                                />
                            {restaurant && <Text>Restaurant</Text>}
                        </View>    
                    </View>

                </View>
            </View>


                
                <DrawerItemList {...props} />

             
                <DrawerItem 
                    label = "Promotions"
                    icon = {({color,size})=>(
                        <Icon 
                            type ="material-community"
                            name = "tag-heart"
                            color ={color}
                            size ={size}
                        />
                    )}
                />



            <DrawerItem 
                    label = "Settings"
                    icon = {({color,size})=>(
                        <Icon 
                            type ="material-community"
                            name = "cog-outline"
                            color ={color}
                            size ={size}
                        />
                    )}
                />



        <DrawerItem 
                    label = "Help"
                    icon = {({color,size})=>(
                        <Icon 
                            type ="material-community"
                            name = "lifebuoy"
                            color ={color}
                            size ={size}
                        />
                    )}
                />





       <View style ={{borderTopWidth:1, borderTopColor:colors.grey5}}>
            <Text style ={styles.preferences}>Preferences</Text>

            <View style ={styles.switchText}>
                <Text style ={styles.darkthemeText}>Dark Theme</Text>
                <View style ={{ paddingRight:10}}>
                        <Switch 
                            trackColor = {{false: "#767577",true : "#81b0ff"}}
                            thumbColor = "#f4f3f4"
                        />
                </View>
            </View>

       </View>         



     
                </DrawerContentScrollView>  

                
            
                <DrawerItem 
                    label = "Sign Out"
                    onPress ={()=>{logout() }}
                    icon = {({color,size})=>(
                        <Icon 
                            type ="material-community"
                            name = "logout-variant"
                            color ={color}
                            size ={size}
                             
                        />
                    )}
                />
             </View>
         )
     }
     

const styles = StyleSheet.create({
        container:{
            flex:1
        },

        avatar:{
            borderWidth:4,
            borderColor:colors.pagebackground
            
        },

        preferences:{
            fontSize: 16,
            color:colors.grey2,
             paddingTop:10,
             paddingLeft:20,
        },

        switchText:{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            paddingLeft:20,
            paddingVertical:5,
            paddingRight:10
        },
        darkthemeText:{
            fontSize: 16,
            color:colors.grey2,
             paddingTop:10,
             paddingLeft:0,
             fontWeight:"bold"
        }
        
    })
    