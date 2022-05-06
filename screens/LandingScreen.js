import React, {useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Constants from 'expo-constants';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function LandingScreen({route, navigation}){

    useEffect(() => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
          if(!x) {
            navigation.navigate("Login");
            return
          } else {
            axios.get(`${baseUrl}/auth/check`, {
                headers: {
                  'Authorization': `JWT ${x}` 
                }
              }).then((resp) => {
                navigation.navigate("Login");
              }).catch((err) => {
                SecureStore.deleteItemAsync("FEEDMAMA_TOKEN").then(x => {
                    navigation.navigate("Login");
                })
              });   
          }
        })
      }, []);
    

    return(
        <>
        </>
    );      
}

export default LandingScreen