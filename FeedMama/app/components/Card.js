import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import AppText from './AppText';

function Card({title, fee, timeEstimate, image}) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image}></Image>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{timeEstimate + ' | ' + fee}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 15,
        backgroundColor: "#ff6c6c",
        marginBottom: 20,
        overflow: 'hidden'
    },
    detailsContainer:{
        padding: 10,
    },
    image:{
        width:"100%",
        height:200
    },
    title:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        marginLeft: 5
    },
    subTitle:{
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        marginLeft:5
    }
})
export default Card;