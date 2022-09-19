import React ,{useState,useEffect}from 'react'
import {View , Text ,Pressable ,StyleSheet ,Dimensions ,ScrollView ,Image , FlatList} from 'react-native'
import {Icon, Badge} from '@rneui/themed'
import {parameters} from '../../global/styles'
import {placeOrder} from '../../firebase/order'
import auth from '@react-native-firebase/auth';


import { Button } from '@rneui/base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

export default function CartScreen({navigation,route}) {

    const{ order , restaurant}= route.params;
    const [orderData , setOrderData] =useState(order.filter(({quantity})=> quantity>0));
    const [viibility , setVisibility] = useState(false);
   const [totalPrice, setTotalPrice]=useState(orderData.reduce((total, item)=>total+(item.price*item.quantity),0))
  

    const onPressAddIconHandler=(index)=>{
        orderData[index].quantity +=1;
        setOrderData([...orderData]);
        
        setTotalPrice(orderData.reduce((total, item)=>total+(item.price*item.quantity),0));
    }
 
    const onPressRemoveIconHandler=(index)=>{
      if(orderData[index].quantity > 0)
        orderData[index].quantity -=1;
        setOrderData([...orderData]);
        setTotalPrice(orderData.reduce((total, item)=>total+(item.price*item.quantity),0));
          }



    return (
    <View style={styles.container}>
    {orderData.length==0 ? <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}><Text>Cart is empty.</Text></View>: <View></View>}
    
    <FlatList
            style={{ width:SCREEN_WIDTH }}
            data = {orderData}
             keyExtractor = {(item) => item.id}
             renderItem = {({ item , index}) => (
                <View>
                
                {item.quantity>0 ? 
                  <Pressable onPress = {()=>{console.log(item,'=>',index)}}>
                   <View key={item.id}>
                   <View style={styles.productData}>
                  <View>
                    <Image style= {styles.Image}  source={{uri:item.image}} />
                  </View>
                  <View style={{marginLeft:150 , position:'absolute' , marginTop:20}}>
                  <Text style ={{fontSize:18,color:'#000', fontWeight:"bold" }}>{item.name}</Text>
                  <Text style ={{fontSize:12,color:'#555' ,fontWeight:"bold",marginTop:5 }}>Category : {item.category}</Text>
                  <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5}}>Rs. {item.price}</Text>
                  </View>
                  <View style = {{flexDirection:'row', position:'absolute' , bottom:0 , right:0 , marginRight:6 }}>
                    <Icon
                      type = "material"
                      color = '#555'
                      name = 'remove'
                      size ={26}
                      onPress ={()=>{onPressRemoveIconHandler(index)}}
                    /> 
                    <View>
                    <Text style ={{fontSize:12, fontWeight:"bold" , marginTop:4,marginLeft:7 , marginRight:7 }}>
                    {item.quantity}
                    </Text>
                    </View>
                    <Icon
                      type = "material"
                      color = '#555'
                      name = 'add'
                      size ={26}
                      onPress ={()=>{onPressAddIconHandler(index);}}
                    />
                  </View> 
                  </View>
                  </View>
                 </Pressable>
                  
                 :<View style={{width:0 , height:0}}></View>}
                 </View>
            )}
        />
    
        <View >
        <View style={{flexDirection:'row', borderBottomWidth:0.1 , marginBottom:10 , marginHorizontal:10}}>
          <Text style={{marginLeft:10,fontSize:18 , marginRight:10}}>Cash On Delivery</Text> 
          <Icon
                      type = "material-community"
                      color = '#555'
                      name = 'cart'
                      size ={26}
                    /> 
        
        </View>

        <View style={{flexDirection:'row' ,marginLeft:10}}>
          <Text style={{marginLeft:10,fontSize:18}}>Total Price</Text>
          <Text style={{   marginLeft:SCREEN_WIDTH-190 , fontSize:18  }} >Rs. {totalPrice}</Text>
        </View>

        <Button   
          title ="Proceed"
          disabled={orderData.length==0? true : false}
          
          buttonStyle={styles.proceedButton}
          onPress={
            ()=>{
                placeOrder(auth().currentUser.uid , restaurant , orderData,totalPrice); 
                navigation.navigate('OrderSccessfullScreen'); } }
        />
        </View>
</View>
)

}


const styles = StyleSheet.create({

container:{
    flex:1,
},
 Image:{
  height:100 , 
  width :100, 
  borderRadius:10 , 
  margin:10 , 
  backgroundColor:'#fff'
},
productData:{
  width:'100%', 
  height:120 , 
  marginTop:10 ,
  marginBottom:10,
  borderBottom:4
  ,color:'#000'
},
proceedButton:{
  margin:20,
  backgroundColor:'#376F1B',
  alignContent : 'center' ,
  borderRadius : 12,
  borderWidth : 1,
  borderColor :'#376F1B',
  height: 50,
  paddingHorizontal : 10,
  width : '80%',
  margin:10,
  marginLeft:40,
    }
})