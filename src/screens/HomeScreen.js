import React ,{ useState ,useEffect,useRef} from 'react';
import {View , Text , StyleSheet , Alert , TouchableOpacity , ScrollView ,RefreshControl, FlatList , Pressable , Image , Dimensions , ActivityIndicator} from 'react-native';
import {Icon} from '@rneui/base';
import HomeHeader from '../components/HomeHeader';
import {colors , parameters } from  '../global/styles';
import FoodCard from '../components/FoodCard';
import firestore from '@react-native-firebase/firestore'
import SelectDropdown from 'react-native-select-dropdown'
import { useIsFocused } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import  {city , user}  from '../firebase/UserData';
import {data}  from '../global/Data';

const SCREEN_WIDTH = Dimensions.get('window').width;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



export default function HomeScreen({navigation}){

    const load=true;
    const [loading , setLoading] =useState(load);
    const [Data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [City , setCity] = useState([city]);
    const dropdownRef = useRef({});
    const isFocused = useIsFocused();

    let Cities =data;
    Cities = Cities.filter((item) => item.country == 'PK').map((item) => (item.name));
    
    let filteredData = Data.filter(item=>item.businessAddress==City);


const FetchData = ()=>{
    Data.length=0;   // to clear old array of data
    const getResTaurantData=async() => {
     await firestore().collection('restaurant').get()
    .then(function(documentSnapshot){
      documentSnapshot.forEach((doc) => {
                Data.push(doc.data());
            });
        user();
        setLoading(false)
    });
    }   

    getResTaurantData();
}




const onRefresh = React.useCallback(() => {
   
    setRefreshing(true);
    setLoading(true);
    FetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);



useEffect(() => {
    if(isFocused){ 
        FetchData();
        }

}, [isFocused]);


const handle=(item)=>{
    City.length=0;
    City[0]=item;
    setCity([...City]);
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


    return(
        <View style = {styles.container}>
            
            <HomeHeader title = 'Go Food' types = 'menu' navigation ={navigation}/>
        { !auth().currentUser.emailVerified && 
        <Pressable
        style= {{width:SCREEN_WIDTH  , backgroundColor:'#ffff' , height:45 , flexDirection:'row'}} 
        onPress={()=>{ auth().currentUser.sendEmailVerification(); Alert.alert('An Verifaction Link has been sent to Your Email!');}} >
            <Text style={{color:'#CC3A38' , marginLeft:10,marginRight:130 , marginTop:10 , fontWeight:'bold'}}>Verify Your Email Now!</Text>
            <Text style = {{borderWidth:1 , width:85 , height:30, paddingLeft:7 ,padding:5 , color:'#CC3A38' ,fontWeight:'bold', borderColor:'#CC3A38', marginTop:8 }} >Verify Now</Text>
            
        </Pressable>
        }
        
        <ScrollView
            stickyHeaderIndices= {[0]}
            showVerticalScrollIndicator = {true}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
                }
        >
         <View style = {styles.filterView}>
            <View style = {styles.addressView}>
            
                <View style = {{  flexDirection:'row'  , alignItems:'center', paddingLeft:10}}>
                    <Text style = {{marginLeft : 5}}>Location</Text>
                    <Icon 
                        type = 'material-community'
                        name = 'map-marker'
                        color = {colors.grey1}
                        size = {26}
                        onPress={()=>{  City.length=0;
                                        City[0]=city;
                                        setCity([...City]);}}
                    />
                    <Text style = {{marginLeft : 5}}>{City[0]} </Text>
                
                </View>
                <Pressable  onPress={()=>{dropdownRef.current.openDropdown()}}>
                <View style = {styles.clockView}>
                    <Icon 
                        type = 'material-community'
                        name = 'tune'
                        color = {colors.grey1}
                        size = {26}
                    />
                    <Text style = {{marginLeft : 5}}> Filter  </Text>
                </View></Pressable>
            </View>
            <View>
            
             <SelectDropdown
	           data={Cities}
               buttonStyle={{height:0 , width:'100%'}}
               defaultButtonText={City[0]}
               ref={dropdownRef} 
	           onSelect={(selectedItem )=> {
                     const Item = selectedItem;
                    
	             	handle(Item);
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

           
 

         {  filteredData.length>0 && <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                        Restaurants In Your Area
                </Text>
            </View>
           }

            <View>
                <FlatList
                    style = {{margin:10 , marginBottom:10}}
                    horizontal={true}
                    data = {filteredData}
                    keyExtractor = {(item , index) => index.toString()}
                    showHorizontalScrollIndicator = {false}
                    renderItem = {({item , index}) =>(
                        <View key={index}>
                        <FoodCard
                            screenWidth = {SCREEN_WIDTH*0.8}
                            images = {item.images}
                            restaurantName = {item.restaurantName}
                            businessAddress = {item.businessAddress}
                            averageReview = {item.averageReview}
                            numberOfReview = {item.numberOfReview}
                            OnPressFoodCard={()=>{ navigation.navigate('MenuScreen',{ name:item.restaurantName,Data:item.productData ,restaurant:item.restaurantOwner, image : item.images , Address :item.businessAddress })}}
                        /></View>
                    )}
                />
            </View>


            <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                   Suggestions
                </Text>
            </View>
                        
            <View style = {{width:SCREEN_WIDTH , paddingTop:10 }}>
                {
                    Data.map(item => (
                        <View key={item.id}>
                        <View  style = {{paddingBottom:20}}>
                             <FoodCard
                                screenWidth = {SCREEN_WIDTH*0.95}
                                images = {item.images}
                                restaurantName = {item.restaurantName}
                                businessAddress = {item.businessAddress}
                                averageReview = {item.averageReview}
                                numberOfReview = {item.numberOfReview}
                                OnPressFoodCard={()=>{  navigation.navigate('MenuScreen',{ name:item.restaurantName,Data:item.productData ,restaurant:item.restaurantOwner, image : item.images , Address :item.businessAddress , restaurantId:item.restaurantOwner })}}
                            />
                        </View>
                        </View>
                    ))
                }
            </View>    
            </ScrollView>

              {

            <View style = {styles.floatButton}>
                <TouchableOpacity  onPress = {()=> {
                    navigation.navigate('RestaurantsMapScreen' , {RestaurantsData:Data })
                }}>
                
                    <Icon
                        name='place'
                        type= 'material'
                        size ={32}
                        color= {colors.buttons}
                    />
                    <Text style = {{color:colors.grey2}}>Map</Text>

                </TouchableOpacity>

            </View>
            }
        </View>
    )
}}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    
    filterView:{
        flexDirection : 'row' ,
        alignItems:'center' ,
        marginVertical:10,
        justifyContent:'space-evenly',
        backgroundColor:colors.grey5,
    },
    clockView:{ 
        flexDirection:'row'   ,
        marginLeft:20,
        alignItems:'center' ,
        backgroundColor:colors.CardBackgroud ,
        borderRadius:15,
        paddingHorizontal:5,
        marginRight:20
        },
    addressView:{
        flexDirection:'row' ,
        backgroundColor : colors.grey4 ,
        borderRadius :15  ,
        paddingVertical:3,
        justifyContent:'space-between',
        paddingHorizontal:20
    },

        headerText:{
            color:colors.grey1,
            fontSize:22,
            fontWeight:'bold',
            paddingLeft:10
        },

        headerTextView:{
            backgroundColor:colors.grey5,
            paddingVertical:3
        },
        smallCard:{
            borderRadius:30,
            backgroundColor:colors.grey5,
            justifyContent:'center',
            alignItems:'center' , 
            padding:5,
            width:80,
            margin:10,
            height:100
        },
        smallCardSelected:{
            borderRadius:30,
            backgroundColor:colors.buttons,
            justifyContent:'center',
            alignItems:'center' , 
            padding:5,
            width:80,
            margin:10,
            height:100
        },
        smallCardText:{
            fontWeight:'bold',
            color:colors.grey2
        },
        smallCardTextSelected:{
            fontWeight:'bold',
            color:colors.CardBackgroud
        },
        floatButton:{
            position:'absolute',
            bottom:10 , right:15,
            backgroundColor:'white',
            elevation:10,
            width:60 , height:60,
            borderRadius:30,
            alignItems:'center'
        },
       

    
})