import React , { useState , useEffect , useContext} from 'react';
import {View ,Text , StyleSheet,ScrollView , Image } from 'react-native';
import {colors} from '../../global/styles'
import {Icon} from '@rneui/base';
import  { UserEmail ,name , contact , image , city}  from '../../firebase/UserData';
export default function MyAccountScreen(){

    
const [username , setUsername] =useState(name);
const [Contact , setContact] =useState(contact);

    return(
        <View style={{flex:1,backgroundColor:'rgba(218, 80, 4, 0.9)'}}>
            <View style ={{}}>
            <ScrollView>
            <View style={{backgroundColor:'#fff' ,borderBottomRightRadius:  40 }}>
            <View style = {{flexDirection:'row' , marginTop:3}}>
              <Image style= {styles.iconImage}  source = {require('../../assets/logo.png')}>         
             </Image>
                <Text style={styles.iconText}>Go Food</Text>
            
            </View>
            <View>
                <Image style= {styles.userImage} source = {{uri:image}}  >         
                </Image>
            </View>
            <View>
                <Text style = {styles.headingText}>Name </Text>
                <Text style={styles.usernameText}>{ username}</Text>
            </View>
            <View>
                <Text style ={styles.headingText}>Contact</Text>
                <Text style={styles.contact}>{Contact}</Text>
            </View>
             <View>
                <Text style ={styles.headingText}>City</Text>
                <Text style={styles.contact}>{city}</Text>
            </View>
            </View>
             
            <View>
                <View style={{flex:1 , flexDirection:'row', margin:20 ,marginTop:20, borderBottomWidth: 0.6, borderBottomColor:'#fff'}}>
                    <Text style={{ fontSize : 24 ,fontWeight:'bold' , marginRight:210,color:'#fff'}}>Favorites</Text>
                    <Icon color="#fff" name="favorite-border" solid size={28} type="material"  />
                </View>
            </View>
            </ScrollView>
        </View>
     </View>
    )
}


const styles = StyleSheet.create({

iconImage:{
    height:30 ,
    width : 30 ,
    borderRadius:5,
    marginHorizontal:5,
    marginLeft:15,
  
},
iconText:{
    fontSize:20 ,
    fontWeight:'bold',
    marginLeft:15, 
     color:'#666'
    
},
userImage:{
    height:100 ,
    width : 100 , 
    borderRadius:20 , 
    marginTop :30,
    marginLeft:15
},
headingText:{

     color:'#333',
    marginVertical:10,
    marginLeft:15
},
usernameText:{
    fontSize:24 , 
    fontWeight:'bold' ,
    marginLeft:15,
     color:'#444'
},
contact:{
    fontSize:20 , 
    fontWeight:'bold',
    marginLeft:15,
     color:'#444',
    marginBottom:20
 }

})