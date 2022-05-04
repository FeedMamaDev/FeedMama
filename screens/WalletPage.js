import React from 'react';
import { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import CreditCard from '../app/components/CreditCard';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__
const productionUrl = 'https://example.com'
const baseUrl = isLocal ? ngrokUrl : productionUrl

function WalletPage(props){

    function updatePrimary(PID){
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/user/${PID}/updateCards`, {
              headers: {
                'Authorization': `JWT ${x}` 
              }
            }).then((resp) => {
                setCards(resp.data.cardList) 
                console.log(cards)
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
            });

    }

    const [cards, setCards] = useState([]);

    const loadDataOnlyOnce = () => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/user/pullCards`, {
              headers: {
                'Authorization': `JWT ${x}` 
              }
            }).then((resp) => {
                try{
                    setCards(resp.data.cardList) 
                    console.log(cards)
                } catch(err){
                    Alert.alert('Add Card', 'Please Add a Card', [
                        { text: 'OK', onPress: () => { props.navigation.navigate("AddCard")}},
                      ]);
                }   
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
                    {cards.map(({lastFour,exp, primary, id, PID}) => (
                        primary === true ? <CreditCard lastFour={lastFour} exp={exp} primary={primary} key ={id}/> : <TouchableOpacity onPress={() => updatePrimary(PID)} key ={id}><CreditCard lastFour={lastFour} exp={exp} primary={primary}/></TouchableOpacity>))}
                </View>
                <View style={{backgroundColor: "black", height: 1}}></View>
                <View style={styles.centered}>
                    <Text style={{fontSize: 20, marginTop: 25, marginLeft: 15 ,fontWeight: "bold"}}>Add Payment Method</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("AddCard")}>
                    <ImageBackground
                                    style={styles.primaryButton}
                                    source={require("../app/assets/Buttons/AddButton.png")}
                                    resizeMode="contain">
                                    </ImageBackground>
                    </TouchableOpacity>
                </View>
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