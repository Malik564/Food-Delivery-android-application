import React ,{useState,useEffect}from 'react'
import {View , Text ,Pressable ,StyleSheet ,Dimensions ,RefreshControl,TextInput,TouchableOpacity ,ScrollView,ActivityIndicator,Image , FlatList} from 'react-native'
import {Icon, Badge} from '@rneui/themed'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RadioButtonRN from 'radio-buttons-react-native';
import StarRating from 'react-native-star-rating';

import{ reviewUpdate  ,UpdateAverageReview }from '../firebase/order'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

   const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function MyOrderScreen({navigation}) {
    

    const load=true;
    const [loading , setLoading] =useState(load);
    const [Data, setData] = useState([]) 
    const [RestaurantData , setRestaurantData] =useState([]);
    const [refreshing, setRefreshing] = useState(false); 
    const [filteredStatus , setFilteredStatus] = useState('All');
    let filteredData ;
    const [Reviews , setReviews] =useState([])


    if (filteredStatus == 'All'){
       filteredData = Data ;
       Reviews.length = 0;
       Reviews.push(filteredData.map(item=>(item.review)))
   
    }else{
      filteredData =  Data.filter(item => item.orderStatus == filteredStatus)
      Reviews.length=0;
      Reviews.push(filteredData.map(item=>(item.review))) 
    } 


const radioData = [
{
  label: 'All'
 },
 {
  label: 'Pending'
 },
 {
  label: 'Cooking'
 },
 {
  label: 'On the Way'
 },
 {
  label: 'Delivered'
 },
 {
  label: 'Canceled'
 }, 

]; 


const getOrdersData=async() => {
        await firestore().collection('users').doc(auth().currentUser.uid)
            .collection('orders').orderBy('createdAt', 'desc').get()
            .then(function(documentSnapshot){
                documentSnapshot.forEach((doc) => {
                Data.push(doc.data()); 
                
                firestore().collection('restaurant').doc(doc.data().restaurantId).get()
                .then(function(documentSnapshot){
                      RestaurantData.push(documentSnapshot.data())
                      setRestaurantData([...RestaurantData])
                })
            });    
        setLoading(false)
       });

}


useEffect(() => {
    Data.length=0;   // to clear old array of data
    getOrdersData();
 
     }, [])


const onRefresh = React.useCallback(() => {
   
    setRefreshing(true);
    setLoading(true);
    Data.length=0; 
    getOrdersData();
     
    wait(2000).then(() => setRefreshing(false));
  }, []);



     

    if(loading)
        {
          return(
         <View style={{flex:1, alignItems:'center' , justifyContent:'center'}}>
          <ActivityIndicator size="large" size={80} color = '#DA5004'/>
         </View>
         )
        }
    else{ 
        return (
          
    <View style={styles.container}>
    
    <ScrollView 
      horizontal={true}
    >
    <RadioButtonRN
        data={radioData}
        style={{flexDirection:'row' ,height:60,marginLeft:10 }}
        boxStyle={{width:100 ,  height:20 }}
        textStyle={{color:'#444' }}
        selectedBtn={(e) => {  setFilteredStatus(e.label)  }}
        box={false}
        initial={1}
        circleSize ={10}
    />
    </ScrollView>

    <ScrollView 
      horizontal={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      
      
    
    {filteredData.length==0 ? <View  style={{flex:1 , justifyContent:'center' , alignItems:'center', height:SCREEN_HEIGHT , marginLeft:SCREEN_WIDTH/2-30}}><Text>No oders yet.</Text></View> : <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}></View>}
        <View style={{}}  >       
         <FlatList
            style={{ width:SCREEN_WIDTH ,height : SCREEN_HEIGHT }}
            data = {filteredData}
            keyExtractor = {(item) => item.id}
            showVerticalScrollIndicator = {true}
            
             renderItem = {({ item , index}) => (
                <View key={item.id}>
              
                   <View >
                   <View  style={{marginLeft:SCREEN_WIDTH-170  , position:'absolute'}}>
                     <Image style= {{height:150, width:150 }} source = {require('../assets/chef.png') } ></Image>   
                  </View>
                  <View style={styles.OrderData}>
                  <View style={{ marginTop:10 , marginLeft:10}}>
                 <Text style ={styles.titleText}>Restaurant Name : </Text>
                 <Text style={styles.titleDesc,{fontSize:16 , fontWeight:'bold'}}>{RestaurantData[index]?.restaurantName} </Text>

                  <Text style ={styles.titleText}>Restaurant Contact : </Text>
                  <Text style={styles.titleDesc}>{RestaurantData[index]?.restaurantContact }</Text>

                  <Text style ={styles.titleText}>Restaurant Address : </Text>
                  <Text style = {styles.titleDesc}>{RestaurantData[index]?.businessAddress}</Text>
                  
                  <Text style={styles.titleText}>Date of Order : </Text>
                  <Text style ={styles.titleDesc}>{item.createdAt}</Text>
                  </View>

                  

                <View style={{ borderWidth:0.3 , width:'90%' , marginHorizontal:20 , borderRadius:8 ,marginTop:10, backgroundColor:'#fff'}}  >
                  <View style={{ borderBottomWidth:0.3 , width:'90%' , marginHorizontal:20}} >
                    <Text style ={{fontSize:12,color:'#444', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     name</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#444', fontWeight:"bold" , marginTop:5 , marginLeft:150}}>
                     X</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#444', fontWeight:"bold" , marginTop:5, marginLeft:250}}>
                     Price</Text>


                    {item.order.map((item , index) => <View  key = {item.id}>
                    <View style={{backgroundColor:index%2==0 ?'	#D3D3D3' : '#fff' , borderBottomWidth:0.1} }>  
                     <Text style ={{fontSize:14,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     {item.name}</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#555' , marginTop:5 , marginLeft:150}}>
                     x{item.quantity}</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#555' , marginTop:5, marginLeft:250}}>
                     {item.price}</Text>
                   </View>
                   </View> )}

                   </View>    
                   <View >
                    <Text style ={{fontSize:14,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:50}}>
                     Total</Text>
                    <Text style ={{ position:'absolute', fontSize:16,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:SCREEN_WIDTH-143}}>
                      Rs. {item.totalPrice}</Text>
                     
                   </View>
                   
                     </View>


                    <View style = {{ marginLeft:10 , marginTop:5 }}>
                    <Text style ={styles.titleText, { margin:4, marginRight:30}}>
                    Order Status : <Text style={styles.titleDesc  , item.orderStatus =="Delivered" && {color:  '#29F780' ,fontSize:16 , fontWeight:'bold' } }  >{item.orderStatus}</Text>
                    </Text>
                  </View> 
                    <View style = {{ marginLeft:10 , marginTop: 5 }}>
                    <Text style ={styles.titleText, { margin:4, marginRight:30}}>
                    Payment : <Text style={styles.titleDesc  , item.payment !="Pending" && {color:  '#29F780' ,fontSize:16 , fontWeight:'bold' } }  >{item.payment}</Text>
                    </Text>
                  </View> 
                
                  { item.orderStatus == "Delivered" &&  
                  
                  <View>
                    <View style = {{ width:SCREEN_WIDTH , alignItems:'center' , marginVertical:5}}><Text style = {{ fontSize:20, color:'#FF0000'}}>Review</Text></View>
                    <StarRating
                      fullStarColor ='#FFFF00'
                      containerStyle={{marginHorizontal:30}}
                      starSize = {30} 
                      maxStars={5}
                      rating={Reviews[0][index] >0 ? Reviews[0][index]  : 0}
                      selectedStar={(rating) =>{  Reviews[0][index]= rating ; item.review = rating; setReviews( [...Reviews ]); }}
                    />

                    
                  {item.feedback && 
                  <View style = {{margin:10}}><Text style = {styles.titleDesc}>Feedback : </Text>
                  <Text style = {styles.titleText}>{ item.feedback }</Text></View>
                   }


                  <View style = {{flexDirection:'row' , marginHorizontal:10}} >
                  <TextInput
                    style={styles.input}
                    onChangeText={(t)=>{item.feedback = t}}
                    
                    placeholder ="Feedback"
                  />
                    <TouchableOpacity  style ={{marginTop:10 }}
                    onPress={()=>{reviewUpdate(item.restaurantId , item.invoice ,item.review , item.feedback); UpdateAverageReview(item.restaurantId) }}
                    >
                     <Icon 
                        size={24}
                        name ="send"
                        type ="material"
                    />
                    <Text>Submit</Text>
                  </TouchableOpacity>
                  </View>
                  </View>
                  }
                  
                  </View>
                  </View>
          
     </View>
     )}
        />

      
    
        </View></ScrollView>


    </View>
)
}}


const styles = StyleSheet.create({

container:{
    flex:1,
},
OrderData:{
  width:'100%', 
  marginTop:10 ,
  marginBottom:10,
  borderBottom:4
  ,color:'#000',
  borderBottomWidth:0.2
},

centeredView:{
   flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText:{
    fontSize:12,
    color:'#888',
  },
  
titleDesc:{
fontSize:14,
color:'#777',
fontWeight:'bold',
marginBottom:3
  },
  
  input: {
    height: 40,
    margin: 12,
    width:SCREEN_WIDTH-80,
    borderWidth: 1,
    padding: 10,
  },
})