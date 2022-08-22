import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image ,Pressable, Modal, Platform } from 'react-native';
import MapView, { Marker, AnimatedRegion,PROVIDER_GOOGLE ,Callout } from 'react-native-maps';
import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import Loader from '../components/Loader';
import { locationPermission, getCurrentLocation } from '../global/helper/helperFunction';
import AddressPickup from '../components/AddressPickup';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CalloutCard from '../components/CalloutCard';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const RestaurantsMapScreen = ({ navigation , route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const {RestaurantsData} = route.params;
    const mapRef = useRef();
    const markerRef = useRef();
    const [ModalItem , setModalItem] = useState();
    const [state, setState] = useState({
        curLoc: {
            latitude: 31.5204,
            longitude: 74.3587,
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
        city:'',
        marker:[]
    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading , city , marker} = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
 


    useEffect(() => {
        
        getLiveLocation();
         mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })     
        
    }, [])

    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude, heading } = await getCurrentLocation()
            console.log("get live location after 4 second",heading)
                
            animate(latitude, longitude);
            updateState({
                heading: heading,
                curLoc: { latitude: latitude, longitude : longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            })
        }
    }

     const fetchDestinationCords = (lat, lng) => { 
        updateState({
            destinationCords: {
            }
        })
        updateState({
            destinationCords: {
                latitude: lat,
                longitude: lng
            }
        })

        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
        
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation()
        }, 6000);
        return () => clearInterval(interval)
    }, [])


    const fetchValue = (data) => {
        console.log("this is data", data)
        updateState({
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }
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

    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }


    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })
    }

 


    return (
        <View style={styles.container}>

            {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text>Time left: {time.toFixed(0)} </Text>
                <Text>Distance left: {distance.toFixed(0)}</Text>
            </View>)}
            <View style={{ flex: 1 }}>
                <MapView
                    provider = {PROVIDER_GOOGLE}
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >

                  <Marker
                    ref = {markerRef}
                    coordinate={curLoc}
                    image={imagePath.icCurLoc}
                    title = 'Me'
                  />

                    {RestaurantsData &&
                        RestaurantsData.map((item ,index ) =>(
                            <Marker  
                                coordinate= {item.coordinates }
                                image = {imagePath.icGreenMarker}
                                title = {item.restaurantName}
                                description = {item.businessAddress + ' ' + item.city}
                                onCalloutPress ={() =>  {setModalItem(item) ; setModalVisible(!modalVisible)}}
                            >
                            <Callout
                              key={index}
                              tooltip={true}
                              style={{ backgroundColor: "#ffffff" }}
                            >
                                <CalloutCard 
                                Name = {item.restaurantName}
                                Address={item.businessAddress}
                                City={item.city}
                                image={item.images}
                                />
                                
                            </Callout>
                            </Marker>
                        ))
                    }


                  {Object.keys(destinationCords).length > 0 && (<MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={6}
                        strokeColor="red"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            
                            fetchTime(result.distance, result.duration),
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        // right: 30,
                                        // bottom: 300,
                                        // left: 30,
                                        // top: 100,
                                    },
                                });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />)}   


                    {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={imagePath.icGreenMarker}
                        title = {city}
                        onPress={(Object)=>{ console.log('press');  MapViewDirections(Object);}}
                    />)}

                  
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    <Image source={imagePath.greenIndicator} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomCard}>
                <Text>Search the location for restaurant ..?</Text>
                 <AddressPickup
                    placheholderText="Enter a Location"
                    fetchAddress={fetchDestinationCords}
                />
            </View>
            <Loader isLoading={isLoading} />






             <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select</Text>
            <View style={{flexDirection:'row'}}> 
            
            <Pressable
              style={[styles.button,styles.otherButtons]}
              onPress={() =>{navigation.navigate('MenuScreen',{ name:ModalItem.restaurantName,Data:ModalItem.productData ,restaurant:ModalItem.restaurantOwner, image : ModalItem.images , Address :ModalItem.businessAddress }), setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Restaurant</Text>
            </Pressable>
            <TouchableOpacity 
                    style={{marginLeft:-20 ,marginBottom:20 }}
                     onPress = {()=>{fetchDestinationCords(ModalItem.coordinates.latitude , ModalItem.coordinates.longitude) ; setModalVisible(!modalVisible)}}  
                >
                   <Text > <Image source={imagePath.greenIndicator} /></Text>
            </TouchableOpacity>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomCard: {
        top : 0,
        position:'absolute',
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderBottomEndRadius: 24,
        borderBottomStartRadius: 24
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    },
     centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  otherButtons:{
    backgroundColor: "#F08607",
    margin:5 ,
    height:40,
    marginTop:35},

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width:100,
    margin:2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default RestaurantsMapScreen;