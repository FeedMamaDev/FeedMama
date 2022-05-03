import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__
const productionUrl = 'https://example.com'
const baseUrl = isLocal ? ngrokUrl : productionUrl

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    } else {
      return ""
    }
}
    
function UpdatePassword(props){

    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [verNewPassword, setVerNewPassword] = useState();
    const userID = getValueFor("FEEDMAMA_TOKEN");

    function changePassword() {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.post(`${baseUrl}/changePassword/update`, {
                currentPassword: currentPassword,
                newPassword: newPassword,
                verNewPassword: verNewPassword,
                userID: userID
              }, { headers: {
                'Authorization': `JWT ${x}`
              }}).then((resp) => {
                  console.log(resp)
                Alert.alert('Password Changed', 'Password changed successfully!.', [
                  { text: 'OK', onPress: () => { props.navigation.navigate("Account")} },
                ]);
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
        })
    }

    return(
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>

            <ScrollView style={{resizeMode:"repeat", height: "100%"}}>
                <View style={styles.centered}>
                    <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Update Password</Text>
                </View>
                <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <TextInput 
                    style={styles.input} 
                    placeholder={"Password"}
                    autoCapitalize="none"
                    icon="lock"
                    secureTextEntry
                    textContentType='password'
                    value={currentPassword}
                    onChangeText={text => setCurrentPassword(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder={"Password"}
                    autoCapitalize="none"
                    icon="lock"
                    secureTextEntry
                    textContentType='password'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder={"Password"}
                    autoCapitalize="none"
                    icon="lock"
                    secureTextEntry
                    textContentType='password'
                    value={verNewPassword}
                    onChangeText={text => setVerNewPassword(text)}
                />
                </View>
                <TouchableOpacity onPress={() => changePassword()}>

                    <ImageBackground
                    style={styles.primaryButton}
                    source={require("../app/assets/Buttons/LoginButton-White.png")}
                    resizeMode="contain">

                    </ImageBackground>

                </TouchableOpacity>
            </ScrollView>
        </View>
    );      
}

const styles = StyleSheet.create({
    centered: {
      justifyContent: "center",
      alignItems: "center"
    },
    input: {
        width: 265,
        height: 30,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 12,
        marginBottom: "5%",
        paddingLeft: 10
    },
    primaryButton: {
        width: 200,
        height: 60,
        marginTop: "5%",
    }
    
});

export default UpdatePassword