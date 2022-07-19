import React ,{useState,useEffect}from 'react'
import {View , Text ,Pressable ,StyleSheet ,Dimensions  ,ScrollView,ActivityIndicator,Image , FlatList} from 'react-native'
import {Icon, Badge} from '@rneui/themed'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button } from '@rneui/base'; 
 

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

   
export default function OrderReceivingScreen({navigation}) {
    

    const load=true;
    const [loading , setLoading] =useState(load);
    const [Data, setData] = useState([])
    const [CustomerData , setCustomerData]=useState([])

const getOrdersData=async() => {
        await firestore().collection('restaurant').doc(auth().currentUser.uid)
            .collection('orders').orderBy('createdAt', 'desc').get()
            .then(function(documentSnapshot){
                documentSnapshot.forEach((doc) => {
                Data.push(doc.data());
                firestore().collection('users').doc(doc.data().CustomerId).get()
                .then(function(documentSnapshot){
                      CustomerData.push(documentSnapshot.data())
                      setCustomerData([...CustomerData])
                })
            });   
        setLoading(false)
    });
}



useEffect(() => {
    Data.length=0;   // to clear old array of data
    getOrdersData();
 
     }, [])


     

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
    {!Data ? <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}><Text>No oders yet.</Text></View> : <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}></View>}
        <View >       
         <FlatList
            style={{ width:SCREEN_WIDTH }}
            data = {Data}
             keyExtractor = {(item) => item.id}
             renderItem = {({ item , index}) => (
                <View key={item.id}>
                  <Pressable onPress = {()=>{console.log(item,'=>',index);  }}>
                   <View >
                   <View style={styles.OrderData}>
                  <View style={{ marginTop:20}}>
                  <Text style ={{fontSize:16,color:'#000',  }}>name: {CustomerData[index]?.name} </Text>
                  <Text style ={{fontSize:13,color:'#000',  }}>{CustomerData[index]?.contact}</Text>
                  <Text style ={{fontSize:13,color:'#000',  }}>{CustomerData[index]?.location}></Text>
                  <Text style ={{fontSize:12,color:'#555' ,fontWeight:"bold",marginTop:5 }}> {item.createdAt}</Text>
                  </View>

                  <View style={{ borderBottomWidth:0.3 , width:'90%' , marginHorizontal:20}} >

                    {item.order.map((item , index) => <View  key = {item.id}>
                    <View style={{backgroundColor:index%2==0 ?'	#D3D3D3' : '#fff'} }>  
                     <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     {item.name}</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:150}}>
                     x{item.quantity}</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5, marginLeft:250}}>
                     {item.price}</Text>
                   </View>
                   </View> )}

                     </View>    
                     <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:50}}>
                     Total                                                            Rs. {item.totalPrice}</Text>
                    <View style = {{flexDirection:'row' , bottom:0 , right:0 , marginRight:6 }}>
                    <Text style ={{fontSize:12, fontWeight:"bold" , margin:4,marginLeft:320}}>
                    {item.orderStatus}
                    </Text>
                  </View> 
                  </View>
                  </View>
                 </Pressable>

          
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
  }
})