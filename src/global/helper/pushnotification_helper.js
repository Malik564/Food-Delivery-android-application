import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'


 async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}



function getFCMToken(){
    let fcmtoken =  AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken , ' Old Token')

    if(!fcmtoken){
        try{
        
        let fcmtoken = messaging().getToken();

        if(fcmtoken){
              console.log(fcmtoken , ' New Token')
               AsyncStorage.setItem("fcmtoken" , fcmtoken)
        }else{

        }
        
    }
    catch(error){
        console.log(error)
    }
    }
}


export const notificationListener =()=>{
     // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    
    });



     // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          
        }

      });



    messaging().onMessage(async remoteMessage=>{
        console.log("Notification on ForGround State .. " , remoteMessage);
    })
}