import React from 'react'
import { StyleSheet, Text, View,Image , TouchableOpacity} from 'react-native'
import imagePath from '../constants/imagePath';
import  {colors} from '../global/styles'

const CalloutCard = ({Name, Address ,City,image , onPressDirection}) => {
    
    return (
        <View style = {styles.view1}>
            <View style ={styles.view2}>
            <View style ={styles.view4}>
            <Text style={{ fontSize:95}}><Image style ={styles.image}  source ={{uri :image}}/></Text>
                    
                </View>
                <View style ={styles.view3}>
                    <Text style ={styles.text1}>{Name}</Text>
                    <Text style ={styles.text2}>{Address}</Text>
                    <Text style ={styles.text2}>{City}</Text>
 
                </View>
               <TouchableOpacity 
               style={{marginLeft:-20}}
                    onPress={onPressDirection}
                >
                   <Text > <Image source={imagePath.greenIndicator} /></Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default CalloutCard

const styles = StyleSheet.create({

                view1: {backgroundColor:"white",
                      elevation:4,
                      shadowOpacity:0.4,
                      shadowColor:"black",
                      margin:5,
                      width:250,
                      padding:10, 
                    },

                view2: {flexDirection:"row",
                        padding:0,
                        justifyContent:"space-between"
                    },

                view3 : {justifyContent:"space-between",
                          width:110,
                          marginLeft:10,
                        },

                text1: {
                    fontSize:15,
                    color:colors.grey1,
                    }, 
                 text2: {
                    fontSize:15,
                    color:colors.grey3,
                    },    

                view4: {width:75,
                          height:65 
                        },

                image: {height:65,
                        width:75,
                        
                    }


})