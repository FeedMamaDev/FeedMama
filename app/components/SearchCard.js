import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

function Card({title}) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}></Image>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subtitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 15,
        backgroundColor: "#ff6c6c",
        marginBottom: "-5%",
        overflow: 'hidden'
    },
    detailsContainer:{
        padding: 10,
    },
    image:{
        width:"100%",
        height:150
    },
    title:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#fff",
        marginLeft: 5
    },
    subTitle:{
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#fff",
        marginLeft:5
    }
})
export default Card;