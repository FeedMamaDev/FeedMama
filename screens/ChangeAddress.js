import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import AddressItem from '../app/components/AddressItem';

import Constants from 'expo-constants';
import CreditCard from '../app/components/CreditCard';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__
const productionUrl = 'https://example.com'
const baseUrl = isLocal ? ngrokUrl : productionUrl

function ChangeAddress(props){

    const [addresses, setAddresses] = useState([]);
    const [reload, setReload] = useState(false);
    const [counter, setCounter] = useState(0);

    /* const addresses=[
        {name:"John Doe", st1:"2029 W Wisconsin Ave", st2:"Apt B", city:"Milwaukee", state:"WI", zipcode:"53233", id:"0"},
        {name: "Austin Fron", st1:"1515 W Wisconsin Ave", st2:"", city:"Milwaukee", state:"WI", zipcode:"53233", id:"1"},
        {name:"April Summer", st1:"911 N 17th Street", st2:"Apt 301", city:"Milwaukee", state:"WI", zipcode:"53233", id:"2"},
    ] */

    function updatePrimary(AID){
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/user/${AID}/updateAddress`, {
              headers: {
                'Authorization': `JWT ${x}` 
              }
            }).then((resp) => {
                setAddresses(resp.data.addressList)
                console.log("New Addresses")
                console.log(addresses)
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
            });

    }

    //On page load, grab all addresses and display
    const loadDataOnlyOnce = () => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/user/pullAddress`, {
              headers: {
                'Authorization': `JWT ${x}` 
              }
            }).then((resp) => {
                if(resp.data.addressList === undefined){
                    if(reload === false){
                        setReload(true);
                        setCounter(counter + 1)
                    } else {
                        setReload(false);
                        setCounter(counter + 1)
                    }
                    
                    /* Alert.alert('Add Card', 'Please Add a Card', [
                        { text: 'OK', onPress: () => { props.navigation.navigate("AddCard")}},
                      ]); */
                } else{
                    //setReload(false);
                    setAddresses(resp.data.addressList) 
                }
              }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                  { text: 'OK' }
                ]);
              });
            });
    };

    useEffect(() => {
        if(counter >= 10){
            Alert.alert('Add Address', 'Please Add an Address', [
                { text: 'OK', onPress: () => { props.navigation.navigate("NewAddress")}},
              ]);
        } else {
            loadDataOnlyOnce(); // this will fire only on first render
        }
    }, [reload]);

    

    return(
        <ScrollView>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <View style={styles.centered}>
                <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Change Address</Text>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                <Text style={styles.title}>Saved Addresses:</Text>
                <View style={{paddingTop: 20}}>
                    {addresses.map(({NameLine, LocalLine, StateLine, primary, AID, id}) => (
                        primary === true ? 
                        <AddressItem NameLine={NameLine} LocalLine={LocalLine} StateLine={StateLine} primary={primary} key={id}/> : 
                        <TouchableOpacity onPress={() => updatePrimary(AID)} key ={id}>
                            <AddressItem NameLine={NameLine} LocalLine={LocalLine} StateLine={StateLine} primary={primary}/>
                        </TouchableOpacity>))}
                </View>
                <View style={{backgroundColor: "black", height: 1}}></View>
                <View style={styles.centered}>
                    <Text style={{fontSize: 20, marginTop: 25, marginLeft: 15 ,fontWeight: "bold"}}>Add New Address</Text>
                    <TouchableOpacity style={styles.primaryButton} onPress={()=> props.navigation.push("NewAddress")}>
                        <Image source={require("../app/assets/Buttons/AddButton.png")} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
                
        </ScrollView>
    );      
}

const styles = StyleSheet.create({
    containerHorz: {
        flex: 1,
        flexDirection: 'row',
        },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
    title:{
        marginTop: 25,
        marginLeft: 15,
        fontSize: 20,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
    },
    subtitle:{
        margin:'2%',
        fontSize:12,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
    },
    primaryButton: {
        width: 200,
        height: 60,
        marginTop: "5%",
    },
});

export default ChangeAddress