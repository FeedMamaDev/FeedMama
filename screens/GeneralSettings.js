import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
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

function GeneralSettings(props){

        const userID = getValueFor("FEEDMAMA_TOKEN");
        const [data, setData] = useState([]);

        const[fName, setFName] = useState();
        const[lName, setLName] = useState();
        const[phone, setPhone] = useState();
        const[email, setEmail] = useState();

        console.log("data: ", data)
        console.log("First Name:", fName)

          useEffect(() => {
            SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/user/${userID}/pullUser`, {
              headers: {
                'Authorization': `JWT ${x}` 
              }
            }).then((resp) => {
                setData(resp.data.userInfo);
                setFName(resp.data.userInfo.FirstName);
                setLName(resp.data.userInfo.LastName);
                setPhone(resp.data.userInfo.Phone);
                setEmail(resp.data.userInfo.Email);
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
            }); 
          },[]);
    
        function updateSettings() {
          SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.post(`${baseUrl}/user/pushUser`, {
                fName: fName,
                lName: lName,
                phone: phone,
                email: email,
              }, { headers: {
                'Authorization': `JWT ${x}`
              }}).then((resp) => {
                  console.log(resp)
                Alert.alert('Account Updated', 'Account updated successfully!.', [
                  { text: 'OK', onPress: () => { props.navigation.navigate("Account")} },
                ]);
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
          });
        }

    return(
        <KeyboardAvoidingView enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{flexGrow: 1}}
        >
            <ScrollView bounces = {false} style={{flex: 2}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                        <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
                    </View>
                    <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                    <View style={styles.centered}>
                        <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Update Info</Text>
                    </View>
                    <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>

                   
                        <View style={{alignContent: "center", alignItems: "center", paddingTop: 30}}>
                            <Text style={styles.textStyle}>First Name</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='default'
                                value={fName}
                                onChangeText={text => setFName(text)}
                            />
                            <Text style={styles.textStyle}>Last Name</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='default'
                                value={lName}
                                onChangeText={text => setLName(text)}
                            />
                            <Text style={styles.textStyle}>Phone Number</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='number-pad'
                                value={phone}
                                onChangeText={text => setPhone(text)}
                            />
                            <Text style={styles.textStyle}>Email</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                            <TouchableOpacity onPress={() => updateSettings()}>

                                <ImageBackground
                                style={styles.primaryButton}
                                source={require("../app/assets/Buttons/SubmitButton.png")}
                                resizeMode="contain">
                                </ImageBackground>

                            </TouchableOpacity>
                        </View>
                </View>
            </TouchableWithoutFeedback>
            </ScrollView>
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
        marginTop: "5%",
    },
    textStyle: {
        fontSize: 16, 
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default GeneralSettings