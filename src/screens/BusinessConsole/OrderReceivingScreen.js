import React ,{useState,useEffect}from 'react'
import {View , Text ,Pressable ,StyleSheet ,Dimensions  ,ScrollView,ActivityIndicator,Image , FlatList} from 'react-native'
import {Icon, Badge} from '@rneui/themed'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button } from '@rneui/base'; 
 

import SelectDropdown from 'react-native-select-dropdown'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

   
export default function OrderReceivingScreen({navigation}) {
    

    const load=true;
    const [loading , setLoading] =useState(load);
    const [OrderData, setOrderData] = useState([])
    const [CustomerData , setCustomerData]=useState([])
    const OrderStatus = ["Pending", "Cooking","On the Way", "Delivered", "Canceled" ]
    
const getOrdersData=async() => {
        await firestore().collection('restaurant').doc(auth().currentUser.uid)
            .collection("orders").orderBy("createdAt", "desc").get()
            .then(function(documentSnapshot){
                documentSnapshot.forEach((doc) => {
                OrderData.push(doc.data());
                firestore().collection('users').doc(doc.data().CustomerId).get()
                .then(function(documentSnapshot){
                      CustomerData.push(documentSnapshot.data())
                      setCustomerData([...CustomerData])
                })
            });   
        setLoading(false)
    });
}

const updateOrderstatus=async(inv,index)=>{ 
  const invoice = inv;
  try{          
  await firestore().collection('restaurant').doc(auth().currentUser.uid)
          .collection("orders").doc(invoice).update({
            orderStatus : OrderData[index].orderStatus,
          })
    }
  catch(exception){
    console.log(exception)
  }
}



useEffect(() => {
    OrderData.length=0;   // to clear old array of data
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
    {OrderData.length==0 ? <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}><Text>No oders yet.</Text></View> : <View  style={{flex:1 , justifyContent:'center' , alignItems:'center'}}></View>}
        <View >       
         <FlatList
            style={{ width:SCREEN_WIDTH }}
            data = {OrderData}
             keyExtractor = {(item) => item.id}
             renderItem = {({ item , index}) => (
                <View key={item.id}>
                  <Pressable onPress = {()=>{console.log(item,'=>',index);  }}>
                   <View >
                   <View style={styles.OrderData}>
                   
                  <View style={{ marginTop:10 , marginLeft:10}}>
                   <Text style={styles.titleDesc}> INVOICE : {OrderData[index]?.invoice}</Text>
                    <Text style ={styles.titleText}>Name : </Text>
                 <Text style={styles.titleDesc}>{CustomerData[index]?.name }</Text>

                  <Text style ={styles.titleText}>Contact : </Text>
                  <Text style={styles.titleDesc}>{CustomerData[index]?.contact}</Text>

                  <Text style ={styles.titleText}>Address : </Text>
                  <Text style = {styles.titleDesc}>{CustomerData[index]?.location}</Text>
                  
                  <Text style={styles.titleText}>Date of Order : </Text>
                  <Text style ={styles.titleDesc}>  {item.createdAt}</Text>

                    </View>

                  <View style={{ borderWidth:0.3 , width:'90%' , marginHorizontal:20 , borderRadius:8 ,marginTop:5, backgroundColor:'#fff'}} >
                    <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     name</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:150}}>
                     x</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5, marginLeft:250}}>
                     price</Text> 


                    {item.order.map((item , index) => <View  key = {item.id}>
                    <View style={{backgroundColor:index%2==0 ?'	#D3D3D3' : '#fff', borderBottomWidth:0.1} }>  
                     <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     {item.name}</Text>
                     <Text style ={{ position:'absolute',fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:150}}>
                     x{item.quantity}</Text>
                     <Text style ={{position:'absolute' , fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5, marginLeft:250}}>
                     {item.price}</Text>
                   </View>
                   </View> )}

                      
                     <Text style ={{fontSize:12,color:'#555', fontWeight:"bold" , marginTop:5 , marginLeft:30}}>
                     Total                                                            Rs. {item.totalPrice}</Text>
                    </View>  
                     <View style = {{flexDirection:'row-reverse' , bottom:0 , right:0 , marginRight:6 }}>
                    <Text style ={{fontSize:12, fontWeight:"bold" , margin:5, marginTop:20,marginRight:30}}>
                    {item.orderStatus}
                    </Text>


                     <Button title ="Update"
                    buttonStyle = {{marginVertical:10,marginHorizontal:5}}
                    onPress={()=>{updateOrderstatus(item.invoice,index)}}
                    />
                    <SelectDropdown 
	                                data={OrderStatus}
                                  buttonStyle={styles.TextInput1}
                                  defaultButtonText={item.orderStatus}
	                                onSelect={(selectedItem, index) => {
	                                	item.orderStatus=selectedItem;

	                                }}
	                                buttonTextAfterSelection={(selectedItem, index) => {
	                                	// text represented after item is selected
	                                	// if data array is an array of objects then return selectedItem.property to render after item is selected
	                                	return selectedItem
	                                }}
	                                rowTextForSelection={(item, index) => {
	                                	// text represented for each item in dropdown
	                                	// if data array is an array of objects then return item.property to represent item in dropdown
	                                	return item
	                                }}
                           />
                          
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
},OrderData:{width:'100%', 
  marginTop:10 ,
  marginBottom:10
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
  }
  ,TextInput1:{
    height:40,
    borderWidth:1,
    borderColor:"#86939e",
    marginHorizontal:20,
    borderRadius:12,
    marginBottom:10,
    paddingLeft:15,
    marginTop:10
      },
})