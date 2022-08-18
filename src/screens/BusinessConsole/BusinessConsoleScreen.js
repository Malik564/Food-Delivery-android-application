import React ,{ useState,useEffect} from 'react';
import {View , Text , StyleSheet,  Pressable,ActivityIndicator , RefreshControl ,ScrollView} from 'react-native';
import {Icon} from '@rneui/base';
import { Button } from "@rneui/themed";

import Header from '../../components/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RestaurantHomeScreenContent from '../../components/RestaurantHomeScreenContent';

import {restaurant} from '../../firebase/UserData'

    
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function BusinessConsoleScreen({navigation}){
    
    const load=true;
    const [loading , setLoading] =useState(load);
    const [restaurantState , setRestaurantState] = useState(restaurant);
    const [Rimage , setRimage] =useState();
    const [restaurantName , setRestarantName] =useState();
    const [restaurantAddress , setRestarantAddress] =useState();
    const [restaurantMenu , setRestarantMenu] =  useState();
    
    const [City , setCity] = useState();
    const [Contact , setContact ] = useState();
    const [coordinates , setCoordinates] = useState();

    const [refreshing, setRefreshing] = useState(false);

const FirebaseData =()=>{
    const getResTaurantData=async() => { await firestore().collection('restaurant').doc(auth().currentUser.uid).get()
    .then(function(doc){
      documentSnapshot = doc.data();
      setRestarantName(documentSnapshot.restaurantName);
      setRestarantAddress(documentSnapshot.businessAddress);
      setRestarantMenu(documentSnapshot.productData);
      setRimage(documentSnapshot.images);
      setCity(documentSnapshot.city);
      setContact(documentSnapshot.contact);
      setCoordinates(documentSnapshot.coordinates);
      setLoading(false)
    });
    }
    if(restaurant)
    getResTaurantData()
    else setLoading(false)

}



const onRefresh = React.useCallback(() => {
  setRefreshing(true);
   FirebaseData()
    wait(2000).then(() => setRefreshing(false));
  }, []);


useEffect(() => {
  navigation.addListener('focus', () => {
      FirebaseData()
    });
   
}, [restaurant,navigation]);



    if(loading)
        {
          return(
         <View style={{flex:1, alignItems:'center' , justifyContent:'center'}}>
          <ActivityIndicator size="large" size={80} color = '#DA5004'/>
         </View>
         )
        }
    else{
          if(!restaurant){
          return(
            <View >
          <Header title ="BUSINESS CONSOLE"  type ="arrow-left" navigation ={navigation}/>
          <ScrollView
            stickyHeaderIndices= {[0]}
            refreshControl={
               <RefreshControl
                 refreshing={refreshing}
                 onRefresh={onRefresh}
               /> }
               >
            <View style={styles.container}>
            <View style={{flex:1 ,alignItems:'center' , justifyContent:'center' }}>
            <Pressable  onPress = {()=>{navigation.navigate('AddRestaurantScreen')}}>
                 <View >
                   <Icon color="#376F1B" name="add" raised reverse reverseColor="white" solid size={60} type="material"  />
                 </View>
            </Pressable>
            <View>
                <Text style={{margin:20 , color:'#333'}}>Open a Restaurant</Text>
            </View>
            </View>
            </View>
            
             </ScrollView>
          </View>
         )}
        else{
          return(
                <View style={styles.container}>
                  <ScrollView
                  horizontal={true}
                  refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  /> }
                    nestedScrollEnabled={true}
                     >
                    </ScrollView>
                <RestaurantHomeScreenContent navigation={navigation}
                 name={restaurantName} 
                 Address={restaurantAddress} 
                 RestaurantImage={Rimage} 
                 Menu={restaurantMenu} 
                 city={City} 
                 contact={Contact} 
                  coordinates={coordinates}  />
 
                </View>
          )}}}
    
        
    
    

const styles =StyleSheet.create({
    container:{
        flex:1 ,
    },
    Button:{
        borderRadius:100,
        backgroundColor:'#4446',
        height:100,
        width:100,
        paddingVertical: 5,
        alignItems:'center' ,
        justifyContent:'center'
    },
     
})





