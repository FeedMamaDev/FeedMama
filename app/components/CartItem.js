import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import { Divider } from 'react-native-elements';

function CartItem({foodItem, quantity}){
    return (
        <View>
            <Divider width={.75}/>
            <View style={styles.containerHorz}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{foodItem}</Text>
                    <Text style={styles.subTitle}>{quantity}</Text>
                </View>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    containerVert: {
        flex: 1,
        marginTop: "25%",
        alignItems: "center",
        },
    containerHorz: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
    },
    detailsContainer:{
        paddingVertical: 10,
        marginLeft: 5,
    },
    title:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
    },
    subTitle:{
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
    }
});

export default CartItem;