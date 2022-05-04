import React from 'react';
import { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import CreditCard from '../app/components/CreditCard';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__
const productionUrl = 'https://example.com'
const baseUrl = isLocal ? ngrokUrl : productionUrl

function WalletPage(props){

    function updatePrimary(){
        console.log("Hello!")
    }

    const loadDataOnlyOnce = () => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/user/pullCards`, {
              headers: {
                'Authorization': `JWT ${x}` 
              }
            }).then((resp) => {
                console.log(resp)
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
            });
    };

    useEffect(() => {
        loadDataOnlyOnce(); // this will fire only on first render
    }, []);

    const [cards, setCards] = useState([
        {lastFour:"0000", exp:"12/1", primary: true, id: "1"},
        {lastFour:"1111", exp:"12/0", primary: false, id: "0"},
        {lastFour:"2222", exp:"12/2", primary: false, id: "2"},
    ]);


    return(
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <View style={styles.centered}>
                <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Wallet</Text>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <ScrollView style={{resizeMode:"repeat", height: "100%"}}>
                <Text style={{fontSize: 20, marginTop: 25, marginLeft: 15 ,fontWeight: "bold"}}>Saved Payment Methods</Text>
                <View style={{paddingTop: 20}}>
                    {cards.map(({lastFour,exp, primary, id}) => (
                        <TouchableOpacity onPress={() => updatePrimary()}>
                            <CreditCard lastFour={lastFour} exp={exp} primary={primary} key={id}/>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{backgroundColor: "black", height: 1}}></View>
                <Text style={{fontSize: 20, marginTop: 25, marginLeft: 15 ,fontWeight: "bold"}}>Add Payment Method</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("AddCard")}>
                <ImageBackground
                                style={styles.primaryButton}
                                source={require("../app/assets/Buttons/AddButton.png")}
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
    primaryButton: {
        width: 200,
        height: 60,
        marginTop: "5%",
    }
});

export default WalletPage