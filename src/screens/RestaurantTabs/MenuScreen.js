import React,{ useEffect ,useState} from 'react';
import {View , Text ,Pressable ,StyleSheet ,Dimensions ,ScrollView ,Image ,ImageBackground , FlatList , ActivityIndicator } from 'react-native';
import {Icon, Badge} from '@rneui/themed'

import { StackActions } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;


export default function MenuScreen({navigation ,route}) {
 
    const{ name , Data ,restaurant, image , Address }= route.params;
    const [order,setOrder] = useState(Data);
    const load=true;
    const [loading , setLoading] =useState(load);

    useEffect(() => {
      order.forEach(order => {
        if(!order.quantity)
          order.quantity=0
      });
      setLoading(false)
    }, [])

    const [cartCounter, setCartCounter]  = useState(0);

    const onPressAddIconHandler=(index)=>{
        order[index].quantity +=1
        setOrder([...order])
        setCartCounter(cartCounter+1)
    }
 

    const onPressRemoveIconHandler=(index)=>{
      if(order[index].quantity > 0)
        order[index].quantity -=1

        setOrder([...order])
        setCartCounter(cartCounter-1)
          }


    
     if(loading)
        {
            return(
            <View style={{flex:1,alignItems:'center' , justifyContent:'center'}}>
             <ActivityIndicator size="large" size={80} color = '#DA5004'/>
            </View>
            )
        }
        else{

    return (
        <ImageBackground
  source={{uri : image}}
  style={{width: '100%', height: 250 ,}}
> 
    <View style={{ backgroundColor:'rgba(30, 30, 30,0.4)'}}>

      <View style={{top :5 , position:'absolute', marginLeft:5}}> 
      <Icon 
          type = "material-community"
          name = 'arrow-left'
          color = '#eee'
          size ={32}
          onPress ={
            ()=>{Data.forEach(order => {
               order.quantity=0
                }); 
                setOrder([...order]);
               navigation.goBack()}}
      />
      </View>
      <View style={{top :5 , position:'absolute', marginRight:5 , right:5}}> 
      <Icon 
          type = "material-community"
          name = 'cart'
          color = '#eee'
          size ={32}
          onPress ={()=>{navigation.navigate('CartScreen' , {order:order ,restaurant:restaurant})}}
      />
      <Badge
    value={cartCounter}
    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
    />
      </View>

      <View>
        <Text style ={{fontSize:20 , marginTop:40,marginLeft:10 , color:'#ddd'}}>Restaurant name</Text> 
        <Text style ={{fontSize:24, fontWeight:"bold" , marginTop:10,marginLeft:10, color:'#eee' }}>{name}</Text>
        <Text style ={{fontSize:20,  marginTop:20,marginLeft:10, color:'#ddd'}}>Restaurant Address</Text> 
        <Text style ={{fontSize:24, fontWeight:"bold" , marginTop:10,marginLeft:10 , marginBottom:10, color:'#eee'}}>{Address}</Text> 
     
      </View>
 
       <View style={styles.menuContainer}>
        <View>
            <Text style ={{fontSize:20, fontWeight:"bold" , marginTop:12,marginLeft:20, marginBottom:10,color:'#999' , borderBottomWidth:0.19 , width:350, borderColor:'#888'}}>Menu</Text> 
       </View>

      

        <View>
        <FlatList
          Vertical={true}
          showVerticalScrollIndicator ={true}
          data = {order}
          key={'#'}
          keyExtractor={item => "#" + item.id}
          numColumns={2}
          renderItem = {({ item , index}) => (
                 <Pressable onPress = {()=>{console.log(item,'=>',index)}}>
                   <View key={item.id}>
                   <View style={styles.productData ,{marginLeft:18,marginBottom: order.length-1==index ? 220 : 10 , borderRadius:12,paddingTop:5, paddingBottom:5,elevation: 5,padding:2,backgroundColor:'#fff'}}>
                  <View>
                    <Image style= {styles.Image}  source={{uri:item.image}} />
                  </View>
                  <View>
                  <Text style ={{fontSize:18, fontWeight:"bold" ,marginLeft:10}}>{item.name}</Text>
                  <Text style ={{fontSize:12, fontWeight:"bold",marginTop:3 ,marginLeft:10}}>Category : {item.category}</Text>
                   <Text style ={{fontSize:12, fontWeight:"bold" , marginTop:4,marginLeft:10 , marginBottom:5}}>Rs. {item.price}</Text>
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
                  </View>
                 </Pressable>
            )}
        />
        </View>

       </View>
            


    </View></ImageBackground>
  )
}
}
const styles = StyleSheet.create({
 menuContainer:{
    backgroundColor:'#fff',
    height:SCREEN_HEIGHT-100,
    width:SCREEN_WIDTH,
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
  marginTop:20 ,
 }
})