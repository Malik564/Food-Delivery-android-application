import React ,{ useState ,useEffect} from 'react';
import {View , Text , StyleSheet , TouchableOpacity , ScrollView ,RefreshControl, FlatList , Pressable , Image , Dimensions , ActivityIndicator} from 'react-native';
import {Icon} from '@rneui/base';
import HomeHeader from '../components/HomeHeader';
import {colors , parameters } from  '../global/styles';
import FoodCard from '../components/FoodCard';
import firestore from '@react-native-firebase/firestore'



const SCREEN_WIDTH = Dimensions.get('window').width;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



export default function HomeScreen({navigation}){

    const [indexCheck , setIndexCheck] = useState('0');
    const load=true;
    const [loading , setLoading] =useState(load);
    const [Data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false);

const FirebaseData = ()=>{
    Data.length=0;   // to clear old array of data
    const getResTaurantData=async() => {
     await firestore().collection('restaurant').get()
    .then(function(documentSnapshot){
      documentSnapshot.forEach((doc) => {
                Data.push(doc.data());
            });   
        setLoading(false)
    });
    }

    getResTaurantData();
}


const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FirebaseData();
    wait(2000).then(() => setRefreshing(false));
  }, []);



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


    return(
        <View style = {styles.container}>
            <HomeHeader title = 'Go Food' types = 'menu' navigation ={navigation}/>
            
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
                                <Icon 
                                    type = 'material-community'
                                    name = 'map-marker'
                                    color = {colors.grey1}
                                    size = {26}
                                />
                                <Text style = {{marginLeft : 5}}> 22 Bessie Street </Text>
                            </View>
                            <View style = {styles.clockView}>
                                <Icon 
                                    type = 'material-community'
                                    name = 'clock-time-four'
                                    color = {colors.grey1}
                                    size = {26}
                                />
                                <Text style = {{marginLeft : 5}}> Now </Text>
                            </View>
                        </View>
                        <View>
                             <Icon 
                                    type = 'material-community'
                                    name = 'tune'
                                    color = {colors.grey1}
                                    size = {26}
                                />
                        </View>
            </View>

           


            <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                        Top Restaurants
                </Text>
            </View>
                

            <View>
                   
                <FlatList
                    style = {{margin:10 , marginBottom:10}}
                    horizontal={true}
                    data = {Data}
                    keyExtractor = {(item , index) => index.toString()}
                    showHorizontalScrollIndicator = {false}
                    renderItem = {({item , index}) =>(
                            <FoodCard
                                screenWidth = {SCREEN_WIDTH*0.8}
                                images = {item.images}
                                restaurantName = {item.restaurantName}
                                farAway = '{item.farAway}'
                                businessAddress = {item.businessAddress}
                                averageReview = {item.averageReview}
                                numberOfReview = {item.averageReview}
                                OnPressFoodCard={()=>{ navigation.navigate('MenuScreen',{ name:item.restaurantName,Data:item.productData ,restaurant:item.restaurantOwner, image : item.images , Address :item.businessAddress })}}
                            />
                    )}
                />
            </View>


            <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                   Restaurants In Your Area
                </Text>
            </View>
                        
            <View style = {{width:SCREEN_WIDTH , paddingTop:10 }}>
                {
                    Data.map(item => (
                        <View  style = {{paddingBottom:20}}>
                             <FoodCard
                                screenWidth = {SCREEN_WIDTH*0.95}
                                images = {item.images}
                                restaurantName = {item.restaurantName}
                                farAway = '{item.farAway}'
                                businessAddress = {item.businessAddress}
                                averageReview = {item.averageReview}
                                numberOfReview = {item.averageReview}
                                OnPressFoodCard={()=>{ navigation.navigate('MenuScreen',{ name:item.restaurantName,Data:item.productData ,restaurant:item.restaurantOwner, image : item.images , Address :item.businessAddress })}}
                            />
                        </View>
                    ))
                }
            </View>    
            </ScrollView>

              {

            <View style = {styles.floatButton}>
                <TouchableOpacity  onPress = {()=> {
                    navigation.navigate('RestaurantsMapScreen')
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