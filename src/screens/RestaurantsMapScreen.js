import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import Loader from '../components/Loader';
import { locationPermission, getCurrentLocation } from '../global/helper/helperFunction';
import AddressPickup from '../components/AddressPickup';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const RestaurantsMapScreen = ({ navigation , route }) => {
    const {RestaurantsData} = route.params;
    
    const mapRef = useRef();
    const markerRef = useRef();
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
            latitude: curLoc.lat,
            longitude:curLoc.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
        
    }, [navigation])

    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude, heading } = await getCurrentLocation()
            console.log("get live location after 4 second",heading)

            firestore().collection("users")
            .doc(auth().currentUser.uid).update({ location:{latitude:latitude , longitude: longitude} });
             
                
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
            })
        }
    }




     const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
        console.log("zip code==>>>",zipCode)
        console.log('city texts',cityText)
        
        setState({
            ...state,
            destinationCords: {
                latitude: lat,
                longitude: lng
            },
            city:cityText
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


    const MapViewDirectionsFunc = (Object)=>{
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
    }







    return (
        <View style={styles.container}>

            {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text>Time left: {time.toFixed(0)} </Text>
                <Text>Distance left: {distance.toFixed(0)}</Text>
            </View>)}
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >

                    
                  <Marker
                    coordinate={curLoc}
                    image={imagePath.icCurLoc}
                  />

                    {RestaurantsData &&
                        RestaurantsData.map(item =>(
                            <Marker 
                            key = {item.id}
                                coordinate= {item.coordinates}
                                image = {imagePath.icGreenMarker}
                            />
                        ))
                    }

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
                <Text>Where are you finding restaurant ..?</Text>
                 <AddressPickup
                    placheholderText="Enter a Location"
                    fetchAddress={fetchDestinationCords}
                />
            </View>
            <Loader isLoading={isLoading} />
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
    }
});

export default RestaurantsMapScreen;