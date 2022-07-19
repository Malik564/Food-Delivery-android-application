import React from 'react';
import {View , Text ,Pressable ,StyleSheet ,Dimensions,TouchableOpacity ,ScrollView ,Image ,ImageBackground, FlatList} from 'react-native';
import {Icon} from '@rneui/themed'
import {colors} from '../global/styles'

import { StackActions } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;





export default function RestaurantHomeScreenContent({navigation , name , Address ,RestaurantImage,Menu}) {

  
  return ( <ImageBackground
  source={{uri : RestaurantImage}}
  style={{width: '100%', }}
> 
    <View style={{ backgroundColor:'rgba(30, 30, 30,0.4)'}}>
    <View style={{top :5 , position:'absolute'}}> 
                <Icon 
                    type = "material-community"
                    name = 'arrow-left'
                    color = '#eee'
                    size ={32}
                    onPress ={()=>{navigation.dispatch(StackActions.popToTop());}}
                />
      </View>
       <View style={{top :5 , position:'absolute' , right:5}}> 
                <Icon 
                    type = "material-community"
                    name = 'pencil'
                    color = '#eee'
                    size ={32}
                    onPress ={()=>{navigation.navigate('EditRestaurantScreen' ,{name, Address,RestaurantImage , Menu})}}
                />
      </View>

      <View>
        <Text style ={{fontSize:20 , marginTop:40,marginLeft:10 ,color:'#ddd'}}>Restaurant name</Text> 
        <Text style ={{fontSize:24, fontWeight:"bold" , marginTop:10,marginLeft:10 , color:'#eee' }}>{name}</Text> 
        <Text style ={{fontSize:20 , marginTop:10,marginLeft:10 ,color:'#ddd'}}>Address</Text> 
        <Text style ={{fontSize:22, fontWeight:"bold" , marginTop:10,marginLeft:10 , color:'#eee' }}>{Address}</Text> 
      </View>
    
       <View style={styles.menuContainer}>
        <View>
            <Text style ={{fontSize:20, fontWeight:"bold" , marginTop:12,marginLeft:20, color:'#444'}}>Menu</Text> 
      
        <View style={{top :7 , position:'absolute' , right:26}}> 
            <Icon 
                type = "material-community"
                name = 'shopping'
                color = '#999'
                size ={32}
                onPress ={()=>{navigation.navigate('OrderReceivingScreen')}}
            />
           </View> 
      </View>
       
        <View>
            <FlatList
              Vertical={true}
              showVerticalScrollIndicator ={true}
              data = {Menu}
              key={'#'}
              keyExtractor={item => "#" + item.id}
              numColumns={2}
              renderItem = {({ item , index}) => {
              return(
                <Pressable onPress = {()=>{console.log(item,'=>',index)}}>
                  <View key={item.id}>
                  <View style={styles.productData ,{ marginLeft:18,marginBottom: Menu.length-1==index ? 220 : 10 , borderRadius:12,paddingTop:5, paddingBottom:5,elevation: 5,padding:2,backgroundColor:'#fff'}}>
                  <View>
                    <Image style= {styles.Image}  source={{uri:item.image}} />
                  </View>
                  <Text style ={{fontSize:12, fontWeight:"bold" , marginTop:10,marginLeft:10}}>{item.name}</Text>
                  <Text style ={{fontSize:12, fontWeight:"bold" , marginTop:10,marginLeft:10}}>Category : {item.category}</Text>
                  <Text style ={{fontSize:12, fontWeight:"bold" , marginTop:10,marginLeft:10 }}>Rs. {item.price}</Text>
                  </View>
                  </View>
                </Pressable>
                )}}
            />
      </View>
    </View>
    </View>
    </ImageBackground>
  )
}

styles = StyleSheet.create({
 menuContainer:{
    backgroundColor:'#fff',
    marginTop:20,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT-150,
    borderTopRightRadius:30,
    borderTopLeftRadius:30
    
 }
 ,Image:
{
  height:150 , 
  width : (SCREEN_WIDTH/2)-50, 
  borderRadius:10 , 
  margin:10 , 
  backgroundColor:'#fff'
},
productData:{ 
  width:(SCREEN_WIDTH/2)-30 , 
  height:250 , 
 
}, 
})