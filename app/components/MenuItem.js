import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

function MenuItem({title, subtitle}) {
    return (
        <View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subtitle}</Text>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    detailsContainer:{
        padding: 10,
    },
    title:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
        marginLeft: 5
    },
    subTitle:{
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
        marginLeft:5
    }
});

export default MenuItem;