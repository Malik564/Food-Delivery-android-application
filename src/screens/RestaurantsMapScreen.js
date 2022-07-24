import React,{useState,useEffect} from 'react';
import {View ,Text , StyleSheet,TouchableOpacity,PermissionsAndroid} from 'react-native';
import auth from '@react-native-firebase/auth'
import MapView, { PROVIDER_GOOGLE , Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {Icon} from '@rneui/base';
import {colors} from '../global/styles'
import Geolocation from 'react-native-geolocation-service';

Geocoder.init("AIzaSyAxWI73uFcjSiH-sgiDbx1EwNPpeM5rJtY");


export default function RestaurantsMapScreen(){ 

  
const getLocation=()=>{
  Geocoder.from("Narowal")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));
}

const [lng, setLng]=useState(74.87303);
const [lat , setLat] = useState(32.10197);


useEffect(() => {

  
  const requestLocationPermission = async()=>{
 
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
      tittle: 'Location Access Required',
      message:'This app needs to access your location',
    },
  );
  if(granted == PermissionAndroid.RESULTS.GRANTED){

  navigator.geolocation.getCurrentPosition(position=>{
    setLat(position.coords.latitude);
    setLng(position.coords.longitude)
    
  },
  error=>{console.log(error)},
  {enableHighAccuracy:true, timeout:20000, maximumAge:2000})
}}
}, [])



    return(
      <View style={{flex:1 , alignItems:'center' , justifyContent:'center'}}>

     <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      zoomEnabled={true}
      region={{
        latitude: 32.10197,
        longitude: 74.87303,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >   
      <Marker
        coordinate={{ latitude: lat, longitude: lng }}
        title={"title"}
        description={"test"}
    
      />
    </MapView>



    <View style = {styles.floatButton}>
                <TouchableOpacity  onPress = {()=> {
                    
                }}>
                
                    <Icon
                        name='place'
                        type= 'material'
                        size ={32}
                        color= {colors.buttons}
                    />
                    <Text style = {{color:colors.grey2 , fontSize:12}}>Location</Text>

                </TouchableOpacity>

            </View>
        </View>
    )
}



const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
   
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
});





