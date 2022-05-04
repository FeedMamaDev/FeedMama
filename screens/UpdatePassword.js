import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Divider } from 'react-native-elements';

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
        <KeyboardAvoidingView enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{flexGrow: 1}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                <View style={styles.centered}>
                    <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Update Password</Text>
                </View>
                    <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                    <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                        <Text style={styles.textStyle}>Current Password</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder={"Current Password"}
                            autoCapitalize="none"
                            icon="lock"
                            secureTextEntry
                            textContentType='password'
                            value={currentPassword}
                            onChangeText={text => setCurrentPassword(text)}
                        />
                        <Text style={styles.textStyle}>New Password</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder={"New Password"}
                            autoCapitalize="none"
                            icon="lock"
                            secureTextEntry
                            textContentType='password'
                            value={newPassword}
                            onChangeText={text => setNewPassword(text)}
                        />
                        <Text style={styles.textStyle}>Retype New Password</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder={"New Password"}
                            autoCapitalize="none"
                            icon="lock"
                            secureTextEntry
                            textContentType='password'
                            value={verNewPassword}
                            onChangeText={text => setVerNewPassword(text)}
                        />
                        <TouchableOpacity onPress={() => changePassword()}>
                            <ImageBackground
                            style={styles.primaryButton}
                            source={require("../app/assets/Buttons/SubmitButton.png")}
                            resizeMode="contain">
                            </ImageBackground>
                        </TouchableOpacity>
                </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );      
}

const styles = StyleSheet.create({
    centered: {
      justifyContent: "center",
      alignItems: "center"
    },
    input: {
        width: "80%",
        height: 40,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 12,
        marginBottom: "5%",
        paddingLeft: 10,
        borderColor: "black",
        borderWidth: 1
    },
    primaryButton: {
        width: 200,
        height: 60,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 16, 
        fontWeight: "bold",
        marginBottom: 10,
    },
    
});

export default UpdatePassword