import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import { Divider } from 'react-native-elements';

function AddressItem({NameLine, LocalLine, StateLine, primary}){
    return (
        <View>
             <View style={{backgroundColor: "black", height: 1}}/>
                <View style={{flexDirection: "row", width: "100%", height: 60, paddingLeft: 15}}>
                    <Image style={styles.imageSize} source={require("../assets/Static/locationIcon.png")} resizeMode="contain"/>
                    <View style={{flexDirection: "column", marginTop: 10}}>
                        <Text style={styles.title}>{NameLine}</Text>
                        <Text style={styles.subTitle}>{LocalLine}</Text>
                        <Text style={styles.subTitle}>{StateLine}</Text>
                    </View>
                    {primary === true ? <Image style={styles.checkmark} source={require("../assets/Static/checkmark.png")} resizeMode="contain"/> : null }
                </View>
        </View>
    );
}

{/* <Image source={require("../app/assets/Static/locationIcon.png")} style={{width:30, height:30, margin:5, marginTop:15}}/> */}

const styles=StyleSheet.create({
    imageSize: {
        width: 30,
        height: 30,
        marginTop: 15
    },
    detailsContainer:{
        paddingVertical: 10,
        marginLeft: "3%",
    },
    title:{
        fontSize:14,
        marginLeft: 20,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
    },
    subTitle:{
        fontSize:12,
        marginLeft: 20,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
    },
    checkmark: {
        width: 40,
        height: 40,
        marginTop: 10,
        marginLeft: "35%"
    },
});

export default AddressItem;