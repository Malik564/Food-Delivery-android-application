import React ,{useState,useEffect}from 'react'
import {View , Text ,Pressable ,StyleSheet ,Dimensions ,RefreshControl ,ScrollView,ActivityIndicator,Image , FlatList} from 'react-native'
import {Icon, Badge} from '@rneui/themed'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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
    {Data.length==0 ? <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}><Text>No oders yet.</Text></View> : <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}></View>}
        <View >       
         <FlatList
            style={{ width:SCREEN_WIDTH }}
            data = {Data}
             keyExtractor = {(item) => item.id}
            showVerticalScrollIndicator = {true}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
                }
             renderItem = {({ item , index}) => (
                <View key={item.id}>
              
                   <View >
                   <View style={styles.OrderData}>
                  <View style={{ marginTop:10 , marginLeft:10}}>
                 <Text style ={styles.titleText}>Restaurant Name : </Text>
                 <Text style={styles.titleDesc}>{RestaurantData[index]?.restaurantName} </Text>

                  <Text style ={styles.titleText}>Restaurant Contact : </Text>
                  <Text style={styles.titleDesc}>{RestaurantData[index]?.restaurantContact }</Text>

                  <Text style ={styles.titleText}>Restaurant Address : </Text>
                  <Text style = {styles.titleDesc}>{RestaurantData[index]?.businessAddress}</Text>
                  
                  <Text style={styles.titleText}>Date of Order : </Text>
                  <Text style ={styles.titleDesc}> {item.createdAt}</Text>
                  </View>


                <View style={{ borderWidth:0.3 , width:'90%' , marginHorizontal:20 , borderRadius:8 ,marginTop:5, backgroundColor:'#fff'}}  >
                  <View style={{ borderBottomWidth:0.3 , width:'90%' , marginHorizontal:20}} >
                    <Text style ={{fontSize:12,color:'#444', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     name</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#444', fontWeight:"bold" , marginTop:5 , marginLeft:150}}>
                     X</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#444', fontWeight:"bold" , marginTop:5, marginLeft:250}}>
                     Price</Text>


                    {item.order.map((item , index) => <View  key = {item.id}>
                    <View style={{backgroundColor:index%2==0 ?'	#D3D3D3' : '#fff' , borderBottomWidth:0.1} }>  
                     <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     {item.name}</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#555' , marginTop:5 , marginLeft:150}}>
                     x{item.quantity}</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#555' , marginTop:5, marginLeft:250}}>
                     {item.price}</Text>
                   </View>
                   </View> )}

                   </View>    
                   <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:50}}>
                     Total                                                            Rs. {item.totalPrice}</Text>
                     </View>


                    <View style = {{flexDirection:'row-reverse' , bottom:0 , right:0 , marginRight:6 }}>
                    <Text style ={styles.titleText, { margin:4, marginRight:30}}>
                    Order Status : <Text style={styles.titleDesc}>{item.orderStatus}</Text>
                    </Text>
                  </View> 
                  </View>
                  </View>
          
     </View>
     )}
        />

      
    
        </View>
    </View>
)
}}


const styles = StyleSheet.create({

container:{
    flex:1,
},OrderData:{
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
  },titleText:{
    fontSize:12,
    color:'#888',
  },titleDesc:{
fontSize:14,
color:'#777',
fontWeight:'bold',
marginBottom:3
  }
})