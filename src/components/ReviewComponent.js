import React,{useState , useEffect} from 'react'
import { StyleSheet, Text, View,Image ,Dimensions , FlatList} from 'react-native'
import StarRating from 'react-native-star-rating';
import  {colors} from '../global/styles'
import firestore from '@react-native-firebase/firestore'


const SCREEN_WIDTH = Dimensions.get('window').width;

function ReviewComponent( {ReviewsData} ) {

const [CustomerDatals , setCustomerDatals] = useState([]);
const getCustomerData=async(id)=>{
    await firestore().collection("users")
            .doc(id)
            .get().then(function(doc){
                documentSnapshot = doc.data();
                CustomerDatals.push(documentSnapshot);
                
            })
}


useEffect(()=>{

    ReviewsData.map( item => getCustomerData(item.CustomerId) )

},[])

  return (
    <View>
         <FlatList
          Vertical={true}
          showVerticalScrollIndicator ={true}
          data = {ReviewsData}
          key={'#'}
          keyExtractor={item => "#" + item.id}
          numColumns={2}
          renderItem = {({ item , index}) => (
              <View  style = {{width:SCREEN_WIDTH}} >
                
              <View style={{ flexDirection:'row', alignItems:'center' }}>
                    <Image style= {styles.userImage}  source = {{ uri : CustomerDatals[index]?.userImg}}  >         
                    </Image>
                <Text style ={{fontSize:18 , fontWeight:'bold'}} >{CustomerDatals[index]?.name}</Text>
                 <StarRating 
                      fullStarColor ='#FFFF00'
                      containerStyle={{marginHorizontal:30 , position:'absolute', right:0 , marginRight:70 }}
                      starSize = {20} 
                      maxStars={5}
                      rating={item.review>0 ? item.review : 0}
                      disabled
                    />
              </View>
              <View style={{margin:10 , borderBottomWidth:0.5 }}>
                <Text style={{fontSize:17 , margin:10, marginLeft:30}} >{item.feedback}</Text>
              </View>
                
              </View>
          )}
           />
    </View>
  )
}

export default ReviewComponent



const styles = StyleSheet.create({
    userImage:{
    
    marginRight:10,
    height:60 ,
    width : 60 , 
    borderRadius:30 ,
},
})