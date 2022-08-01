import React ,{ useState , useRef , useEffect} from 'react';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import {Icon , Badge , LinearProgress} from '@rneui/themed';
import Header from '../../components/Header';
import { Button } from '@rneui/base';
import {colors , parameters } from  '../../global/styles';
import uuid from 'react-native-uuid';
import { launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import SelectDropdown from 'react-native-select-dropdown'
import { locationPermission, getCurrentLocation } from '../../global/helper/helperFunction';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import imagePath from '../../constants/imagePath'; 
import {data} from '../../global/Data';

import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Pressable,ScrollView,TextInput,
  StyleSheet,
  Platform,
  Alert,
  Image,Dimensions
} from 'react-native';
import {addRestaurant} from '../../firebase/RestaurantData';


import { GOOGLE_MAP_KEY } from '../../constants/googleMapKey';



const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function AddRestaurantScreen({navigation}){
    const [restaurantName , setRestarantName]=useState();
    const [Address , setAddress] =useState();
    const [City , setCity]  = useState();
    const [Rcontact , setRcontact] = useState();
    const uniqueId=()=>{return uuid.v4()};
    const [Rimage , setRImage] = useState();
    const [progress , setProgress] = useState();
    const [itemProgress , setItemProgress] =useState([]);
    const categories = ["🍔 Fast Food", "🍜 Chinese","🥘 Arabian", "🥩 Grill", "🥧 Desert" , "🥗 Salads", "🐟 Sea Food", "🍾 Bar" ]
                           


let Cities =data;

Cities = Cities.filter((item) => item.country == 'PK').map((item) => (item.name));

    const [menu,setMenu] = useState([]);

    const onPressAddIconHandler=()=>{
      setMenu([...menu ,{id:uniqueId(),
                     name:"",
                     price:'0.0',
                     category:'',
                     image:""}]  )
    }
    
    const onPressRemoveIconHandler=(element)=>{
        const values = [...menu];
        values.splice(values.indexOf(element) , 1);
        setMenu(values);
    }


const pickImgAndUpload=(id)=>{
  launchImageLibrary({quality:0.5},(fileobj)=>{
        if(!fileobj.didCancel){
   const uploadTask =  storage().ref().child( `/restaurant/${uuid.v4()}`).putFile(fileobj.assets[0].uri);
                  uploadTask.on('state_changed', 
                  (snapshot) => {
                    if(id=='main')
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    else {itemProgress[id]=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setItemProgress([...itemProgress])}
                    console.log('Upload is ' + progress + '% done');
                   }
                   , 
                  (error) => {
                    console.log('error uploading image')
                  }, 
                  () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      console.log(downloadURL)
                      if(id=='main')
                     setRImage(downloadURL);  
                     else{menu[id].image=downloadURL ; setMenu([...menu])
                 }
                  });
                  }
                );

  } })
}




    const mapRef = useRef()
    const markerRef = useRef()

    const [state, setState] = useState({
        curLoc: {
            latitude:  31.5204,
            longitude:   74.3587,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: 31.5204,
            longitude:  74.3587,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0,
        
        marker:null

    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading  , marker } = state

 const updateState = (data) => setState((state) => ({ ...state, ...data }));


    
const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude, heading } = await getCurrentLocation()
            console.log("get live location after 4 second",heading)
             
             
          animate(latitude, longitude);
            updateState({
                heading: heading,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            });
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })

        }
    }

      const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })
    }

const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }

useEffect(()=>{
    getLiveLocation();
       mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
},[])





    return(
          
        <View style={styles.container}>
        <ScrollView
            stickyHeaderIndices= {[0]}
            showVerticalScrollIndicator = {true}
        >
        <Header title="Add Restaurant"  type="arrow-left" navigation={navigation} />
        
        <View >
        <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                   Add Restaurant
                </Text>
            </View>
            <View style={{justifyContent:'center' , alignItems:'center' }}>
              <Pressable  onPress={()=>{pickImgAndUpload('main')}}> 
              <Image style= {styles.imgPicker} source = {Rimage ? {uri: Rimage}: require('../../assets/camerapick.png') } ></Image>        
              </Pressable>
              <LinearProgress
                color='#376F1B'
                style={{ marginVertical: 10 , width:100 }}
                value={progress}
                variant="determinate"
                />    
            </View>
               
           
            <View>
                 <TextInput 
                      style ={styles.TextInput1}
                      placeholder ="Restaurant Name"
                      onChangeText={(N) => setRestarantName(N)}
                      value = {restaurantName}
                    />
            </View>
            <View>
                 <TextInput 
                      style ={styles.TextInput1}
                      placeholder ="Street"
                      onChangeText={(A) => setAddress(A)}
                      value = {Address}
                    />
            </View>
             
                  <View>
                        <Text style={{marginLeft:10 , marginTop:10}}>City :</Text>
                               <SelectDropdown
	                                data={Cities}
                                  buttonStyle={styles.TextInput1}
                                  defaultButtonText={City}
	                                onSelect={(selectedItem, index) => {
	                                	setCity(selectedItem)
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
                    <View>
                 <TextInput 
                      style ={styles.TextInput1}
                      placeholder ="Contact"
                      onChangeText={(A) => setRcontact(A)}
                      value ={Rcontact}
                    />
            </View>


                <MapView
                    ref={mapRef}
                    style={{height:200 , margin:20}}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    onPress = {(e)=>{console.log(e.nativeEvent.coordinate);  updateState({marker :e.nativeEvent.coordinate})}}
                >

                    
                  <Marker
                    coordinate={curLoc}
                    image={imagePath.icCurLoc}
                />
                {
                    marker && <Marker
                    coordinate={marker}
                    image={imagePath.greenMarker}
                />
                }

                  
                </MapView>




            <TouchableOpacity
                    style={{
                      flexDirection:'row'  
                    }}
                    onPress={()=>{getLiveLocation()}}
                >
                    <Text style={{marginTop:20, marginLeft:20}} >Get Live Location</Text>
                    <Image source={imagePath.greenIndicator} />
                </TouchableOpacity>
        
            <View>
        </View>
                
                
            
            <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                    Add Menu
                </Text>
            </View>
           
            <View>
            {menu.map((element ,index )=>{
                return(
                    <View key={element.id} style={styles.card}>
                    <View >
              <Pressable style={styles.imgPicker} onPress={()=>{pickImgAndUpload(index)}}> 
              <Image style= {styles.imgPickerItem} source = {element.image ? {uri: element.image}: require('../../assets/camerapick.png') } ></Image>        
              
              <LinearProgress
                color='#376F1B'
                style={{ marginVertical: 7 , width:70 }}
                value={itemProgress[index]}
                variant="determinate"
                />    
                 
                </Pressable>
              </View>
                        <View style ={{ padding:20 , position:'absolute', right:0}}>
                            <Pressable onPress={()=>{onPressRemoveIconHandler(element)}} 
                            style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(210, 230, 255)' : colors.grey4 , borderRadius:10 ,padding:3
                                })}>
                                <Icon 
                                    type = 'material'
                                    name = 'remove'
                                    color = {colors.grey1}
                                    size = {26}
                                />
                            </Pressable>
                            
                            
                        </View>
                        <View>
                             <TextInput 
                              style ={styles.TextInput1}
                              placeholder ="name"
                              onChangeText={(A) => {element.name=A}}
                             />
                        </View>
                        <View>
                             <TextInput 
                              style ={styles.TextInput1}
                              placeholder ={element.price}
                              onChangeText={(A) => {element.price=A}}
                             />
                        </View>
                        <View>
                        <Text style={{marginLeft:20}}>categories :</Text>
                               <SelectDropdown
	                                data={categories}
                                     buttonStyle={styles.TextInput1}
	                                onSelect={(selectedItem, index) => {
	                                	element.category=selectedItem
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
                )
            })}
            <View><Button   
                    title ="Add More.."
                    buttonStyle = {styles.addButton}
                    titleStyle = {parameters.buttonTitle}
                    onPress={() => onPressAddIconHandler()}
             /></View>
            
            </View>
            
             
        </View>

        </ScrollView>
        <View><Button   
                    title ="Add Restaurant"
                    buttonStyle = {styles.addRestaurantButton}
                    titleStyle = {parameters.buttonTitle}
                    onPress={()=>{
                        if(!Rimage){
                            Alert.alert('* Required' , 'Slect an image')
                        } 
                        else if(!restaurantName){
                            Alert.alert('* Required' , 'Name cannot be null')
                        } else 
                        if(!Address){
                            Alert.alert('* Required' , 'City cannot be null')
                        } else if(!marker){
                            Alert.alert('* Required' , 'Must add restaurant location')
                        } 
                        else {
                        addRestaurant(restaurantName , Address,City , Rcontact  , Rimage , menu , marker);
                                    navigation.goBack();} }}
             /></View>
        </View>
    )
}










const styles =StyleSheet.create({
    container:{
        flex:1 ,

    }, headerText:{
            color:colors.grey1,
            fontSize:22,
            fontWeight:'bold',
            paddingLeft:10
        },

        headerTextView:{
            backgroundColor:colors.grey5,
            paddingVertical:3
        }
    ,TextInput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:10,
        paddingLeft:15,
        marginTop:10
      },
    addButton:{
         backgroundColor:'#DA5004',
        alignContent : 'center' ,
        justifyContent : 'center' ,
        borderRadius : 12,
        borderWidth : 1,
        borderColor : '#DA5004',
        height: 50,
        paddingHorizontal : 10,
        width : '60%',
        margin:10,
        marginLeft:80
    },
    addRestaurantButton:{
        backgroundColor:'#376F1B',
        alignContent : 'center' ,
        justifyContent : 'center' ,
        borderRadius : 12,
        borderWidth : 1,
        borderColor : '#376F1B',
        height: 50,
        paddingHorizontal : 10,
        width : '80%',
        margin:10,
        marginLeft:40,
       
        
    },
    imgPicker:{
    height:100 ,
    width : 100 , 
    borderRadius:50 , 
    margin :10,
    justifyContent:'center',
    alignItems:'center'
    }
    , 
    imgPickerItem:{
    height:70 ,
    width : 70 , 
    borderRadius:50 , 
    margin :10,
    },shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card:{backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 25,
    width: '90%',
    marginVertical: 10,
    marginHorizontal:20},

     pickerStyle:{  
        height: 150,  
        width: "80%",  
        color: '#344953',  
        justifyContent: 'center',  
    }  
  
})