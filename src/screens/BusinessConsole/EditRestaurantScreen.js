import React ,{ useState} from 'react';

import {Icon , Badge , LinearProgress} from '@rneui/themed';
import Header from '../../components/Header';
import { Button } from '@rneui/base';
import {colors , parameters } from  '../../global/styles';
import uuid from 'react-native-uuid';
import { launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Pressable,ScrollView,TextInput,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import {updateRestaurant} from '../../firebase/RestaurantData';



export default function EditRestaurantScreen({navigation  , route}){

    const {name, Address,RestaurantImage , Menu} = route.params;

    const [restaurantName , setRestarantName]=useState(name);
    const [address , setAddress] =useState(Address);
    const uniqueId=()=>{return uuid.v4()};
    const [Rimage , setRImage] = useState(RestaurantImage);
    const [progress , setProgress] = useState();
    const [itemProgress , setItemProgress] =useState([]);


    const [menu,setMenu] = useState(Menu);
    
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


    return(
          
        <View style={styles.container}>
        <ScrollView
            stickyHeaderIndices= {[0]}
            showVerticalScrollIndicator = {true}
        >
        <Header title="Edit Restaurant"  type="arrow-left" navigation={navigation} />
        
        <View >
        <View style={styles.headerTextView}>
                <Text style ={{...styles.headerText}}>
                   Edit Restaurant
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
                      value={restaurantName}
                      onChangeText={(N) => setRestarantName(N)}
                    />
            </View>
            <View>
                 <TextInput 
                      style ={styles.TextInput1}
                      placeholder ="Address"
                      value={address}
                      onChangeText={(A) => setAddress(A)}
                    />
            </View>
        
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
                              onChangeText={(name) => {menu[index].name=name; setMenu([...menu]);}}
                              value={element.name}
                             />
                        </View>
                        <View>
                             <TextInput 
                              style ={styles.TextInput1}
                              placeholder ='price'
                              value={element.price}
                              onChangeText={(A) => {menu[index].price=A; setMenu([...menu]);}}
                             />
                        </View>
                        <View>
                             <TextInput 
                              style ={styles.TextInput1}
                              placeholder ="category"
                              value={element.category}
                              onChangeText={(A) =>{ menu[index].category=A; setMenu([...menu]);}}
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
                    title ="Update Restaurant"
                    buttonStyle = {styles.addRestaurantButton}
                    titleStyle = {parameters.buttonTitle}
                    onPress={()=>{ updateRestaurant(restaurantName , address , Rimage , menu);
                                    navigation.goBack();} }
             /></View>
        </View>
    )
}










const styles =StyleSheet.create({
    container:{
        flex:1 ,
        backgroundColor:'#EDE7Ed'

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
  },card:{backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 5,
    elevation:5,
    width: '95%',
    marginVertical: 5,
    marginHorizontal:10}
  
})