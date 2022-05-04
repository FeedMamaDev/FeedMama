import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__
const productionUrl = 'https://example.com'
const baseUrl = isLocal ? ngrokUrl : productionUrl


function LogOutScreen(props){

    function logOut(){
        SecureStore.deleteItemAsync("FEEDMAMA_TOKEN").then(x => {
            props.navigation.navigate("Login");
        });
    }

    return(
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>

            <View style={styles.centered}>
                <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Are you sure?</Text>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Text style={{fontSize: 20}}>We are sad to see you go!</Text>
                <TouchableOpacity onPress={() => logOut()}>
                    <ImageBackground
                    style={styles.primaryButton}
                    source={require("../app/assets/Buttons/LoginButton-White.png")}
                    resizeMode="contain">
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            

        </View>
    );      
}

const styles = StyleSheet.create({
    centered: {
      justifyContent: "center",
      alignItems: "center"
    },
    primaryButton: {
        width: 200,
        height: 60,
        marginTop: 100,
    }
});

export default LogOutScreen