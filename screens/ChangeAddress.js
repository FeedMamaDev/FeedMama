import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import AddressItem from '../app/components/AddressItem';

function ChangeAddress(props){
    const addresses=[
        {name:"John Doe", st1:"2029 W Wisconsin Ave", st2:"Apt B", city:"Milwaukee", state:"WI", zipcode:"53233", id:"0"},
        {name: "Austin Fron", st1:"1515 W Wisconsin Ave", st2:"", city:"Milwaukee", state:"WI", zipcode:"53233", id:"1"},
        {name:"April Summer", st1:"911 N 17th Street", st2:"Apt 301", city:"Milwaukee", state:"WI", zipcode:"53233", id:"2"},
    ]
    const [primaryAddr, setPrimaryAddr]=useState(addresses[0]);
    console.log(primaryAddr)

    function changePrimaryAddr(id){
        setPrimaryAddr(addresses[id])
        console.log(primaryAddr)
    }
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
                <Text style={styles.title}>Selected Address:</Text>
                <Divider width={.75}/>
                <View style={styles.containerHorz}>
                    <Image source={require("../app/assets/Static/locationIcon.png")} style={{width:30, height:30, margin:5, marginTop:15}}/>
                    <AddressItem name={primaryAddr.name} st1={primaryAddr.st1} st2={primaryAddr.st2} city={primaryAddr.city} state={primaryAddr.state} zipcode={primaryAddr.zipcode} id={primaryAddr.id} key={primaryAddr.id}/>
                </View>
                <Text style={styles.subtitle}>(Change by selecting or adding one of the addresses below)</Text>
                <Text style={styles.title}>Stored Addresses:</Text>
                <Divider width={.75}/>
                {addresses.map(({ name, st1, st2, city, state, zipcode, id}) => (
                    <TouchableOpacity onPress={() => changePrimaryAddr(id)}>
                        <AddressItem name={name} st1={st1} st2={st2} city={city} state={state} zipcode={zipcode} id={id} key={id}/>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.centered} onPress={()=> props.navigation.push("NewAddress")}>
                    <Image
                        source={require("../app/assets/Buttons/AddButton.png")}
                        resizeMode="contain"/>
                </TouchableOpacity>
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
      margin:"5%"
    },
    title:{
        margin:'2%',
        fontSize:14,
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
});

export default ChangeAddress