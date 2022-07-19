import React,{useContext,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { AuthStack } from './authStack';
import { AppStack } from './appStack';

import { SignInContext } from '../firebase/Context/authContext';



export default function RootNavigator(){

const {signedIn} = useContext(SignInContext)

    return(
    <NavigationContainer>
        {signedIn.userToken === null  ?  <AuthStack />: <AppStack />}
    </NavigationContainer>
    )
}