import React ,{useState,useEffect}from 'react'
import {View , Text ,Pressable ,StyleSheet ,Dimensions ,ScrollView ,Image , FlatList} from 'react-native'
import {Icon, Badge} from '@rneui/themed'
import {parameters} from '../../global/styles'
import auth from '@react-native-firebase/auth';
import {UserEmail , name ,restaurant , image} from '../../firebase/UserData';
import { Button } from '@rneui/base';
import Header from '../../components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;



export default function SettingsScreen({navigation}) {
  console.log(restaurant)
    return (

    <View style={styles.container}>
    <Header title ="Settings"  type ="arrow-left" navigation ={navigation}/> 
        <View>
          
           <View style={styles.productData}>
          <View style={{marginLeft:10 , position:'absolute' }}>
          <Text style ={{fontSize:18,color:'#222', fontWeight:"bold" }}>Email</Text>
          <Text style ={{fontSize:12,color:'#555',marginTop:5 }}>{UserEmail}</Text>
          </View>
          </View>


          <Pressable style={{}}  onPress = {()=>{navigation.navigate('ChangeUsernameScreen')}}>
           <View style={styles.productData}>
          <View style={{marginLeft:10 , position:'absolute' }}>
          <Text style ={{fontSize:18,color:'#222', fontWeight:"bold" }}>Username</Text>
          <Text style ={{fontSize:12,color:'#555',marginTop:5 }}>{name}</Text>
          </View>
          <View  style = {{marginLeft:SCREEN_WIDTH*.7}} >
           <Icon 
              type = "material-community"
              name = 'pencil'
              color = '#333'
              size ={32}
            />
            </View>
          </View>
          </Pressable>

          <Pressable style={{}}  onPress = {()=>{console.log('=>')}}>
           <View style={styles.productData}>
          <View style={{marginLeft:10 , position:'absolute' }}>
          <Text style ={{fontSize:18,color:'#222', fontWeight:"bold" }}>Profile</Text>
          <Text style ={{fontSize:12,color:'#555',marginTop:5 }}>Change Picture</Text>
          </View>
          </View>
          </Pressable>

          <Pressable style={{}}  onPress = {()=>{navigation.navigate('ChangePasswordScreen')}}>
           <View style={styles.productData}>
          <View style={{marginLeft:10 , position:'absolute' }}>
          <Text style ={{fontSize:18,color:'#222', fontWeight:"bold" }}>Security</Text>
          <Text style ={{fontSize:12,color:'#555',marginTop:5 }}>Change Password</Text>
          </View>
          </View>
          </Pressable>

          <Pressable  onPress = {()=>{navigation.navigate('ChangeAddressScreen')}}>
           <View style={styles.productData}>
          <View style={{marginLeft:10 , position:'absolute' }}>
          <Text style ={{fontSize:18,color:'#222', fontWeight:"bold" }}>Address</Text>
          <Text style ={{fontSize:12,color:'#555',marginTop:5 }}>Change Delivery Address</Text>
          </View>
          </View>
          </Pressable>

          <Pressable  disabled = {!restaurant}  onPress = {()=>{navigation.navigate('DeleteRestaurantScreen')}}>
           <View style={styles.productData}>
          <View style={{marginLeft:10 , position:'absolute' }}>
          <Text style ={{fontSize:18,color:'#222', fontWeight:"bold" }}>Restaurant settings</Text>
          <Text style ={{fontSize:12,color:'#555',marginTop:5 }}>Delete Restaurant</Text>
          </View>
          </View>
          </Pressable>

        </View>    
</View>
)

}


const styles = StyleSheet.create({

container:{
    flex:1,
},
 
productData:{
  width:'100%', 
  height:70, 
  marginTop:10 ,
  borderBottomWidth:.2,
  borderColor:'#555'
  ,color:'#333'
},
 
})