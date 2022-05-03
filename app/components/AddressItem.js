import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import { Divider } from 'react-native-elements';

function AddressItem({name, st1, st2, city, state, zipcode}){
    return (
        <View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subTitle}>{st1+", "+st2}</Text>
                    <Text style={styles.subTitle}>{city+", "+state+" "+zipcode}</Text>
                </View>
            <Divider width={.75}/>
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
        marginLeft: "3%",
    },
    title:{
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
    },
    subTitle:{
        fontSize:12,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
    }
});

export default AddressItem;