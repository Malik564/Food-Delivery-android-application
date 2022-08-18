import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View,Dimensions,FlatList,ActivityIndicator } from 'react-native';
import SearchResultCard from '../components/SearchResultCard';
import {colors} from "../global/styles";
import firestore from '@react-native-firebase/firestore';

import  {  city}  from '../../firebase/UserData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchResultScreen({navigation,route}) {

    const {item} = route.params;
    const [search , setSearch] = useState(item);
    const [city , setCity] = useState(city);
    const [data , setData] = useState([]);
    const load=true;
    const [loading , setLoading] =useState(load);
    
    let Fdata =  data;
    
    Fdata = Fdata.filter((item1 ) => {return item1.productData.length !=0  && item1.productData.filter((item2)=>item2.category==item).length != 0 });
 
const FirebaseData = ()=>{
    data.length=0;   // to clear old array of data
    const getResTaurantData=async() => {
     await firestore().collection('restaurant').get()
    .then(function(documentSnapshot){
        
      documentSnapshot.forEach((doc,i) => { 
             data.push(doc.data());
            });   
            setLoading(false)
            setData([...data])

    });
    }
    getResTaurantData();
}


useEffect(() => {
    FirebaseData();
   
}, [navigation]);


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
        <View style ={styles.container}>
            <View>
                <FlatList 
                     style ={{backgroundColor:colors.cardbackground}}
                    data = {Fdata}
                    keyExtractor ={(item,index)=>index.toString()}
                    renderItem ={({item,index})=> (
                        <SearchResultCard
                            screenWidth = {SCREEN_WIDTH}
                            images = {item.images}
                            averageReview ={item.averageReview}
                            numberOfReview ={item.numberOfReview}
                            restaurantName ={item.restaurantName}
                            businessAddress ={item.businessAddress}
                            productData ={item.productData}
                            searchedCategory = {search}
                            OnPressRestaurantCard ={()=>{navigation.navigate('MenuScreen',{ name:item.restaurantName,Data:item.productData ,restaurant:item.restaurantOwner, image : item.images , Address :item.businessAddress })}}
                        />
                          )}
                     ListHeaderComponent ={
                        <View>
                            <Text style ={styles.listHeader}>{Fdata.length} Result for {route.params.item}</Text>
                        </View>
                     }  
                     showsVerticalScrollIndicator ={false}
                />
            </View>
           
        </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
      paddingTop:20
    },

    listHeader:{color :colors.grey1,
        fontSize:20,
        paddingHorizontal:10,
        paddingVertical:10,
        fontWeight:"bold"
}
})