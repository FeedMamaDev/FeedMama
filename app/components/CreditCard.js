import React from 'react';
import { useState, useEffect } from 'react';
import { Platform, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';

function CreditCard({lastFour, exp, primary}) {

    return (
        <View>
            <View style={{backgroundColor: "black", height: 1}}></View>
                <View style={{flexDirection: "row", width: "100%", height: 60, paddingLeft: 15}}>
                    <Image style={styles.imageSize} source={require("../assets/Static/credit-card.png")} resizeMode="contain"/>
                    <View style={{flexDirection: "column"}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.dots}>••••</Text>
                            <Text style={styles.four}>{lastFour}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}> 
                            <Text style={styles.exp}>Exp: </Text>
                            <Text style={styles.date}>{exp}</Text>
                        </View>
                    </View>
                    {primary === true ? <Image style={styles.checkmark} source={require("../assets/Static/checkmark.png")} resizeMode="contain"/> : null }
                </View>
        </View>
        
    );
}

const styles=StyleSheet.create({
    dots:{
        fontSize:24,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        marginLeft: 20,
        fontWeight: "bold",
        marginTop: 5
    },
    four:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        marginTop: 8
    },
    date:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
    },
    exp:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        marginLeft: 20,
    },
    imageSize: {
        width: 30,
        height: 30,
        marginTop: 15
    },
    checkmark: {
        width: 40,
        height: 40,
        marginTop: 10,
        marginLeft: "45%"
    },
})

export default CreditCard;