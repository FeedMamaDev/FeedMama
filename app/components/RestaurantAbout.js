import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';

function RestaurantAbout({image, title, subtitle}) {
    return (
        <View>
            <ImageBackground source={{uri: image}} style={styles.restaurantImage}>
                <View style={{marginTop: 75, alignItems: "center"}}>
                    <Text style={styles.restaurantTitle}>{title}</Text>
                    <Text style={styles.restaurantSubtitle}>{subtitle}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles=new StyleSheet.create({
    restaurantImage:{
        width: '100%',
        height: 180,
        alignItems:"center",
    },
    restaurantTitle:{
        fontSize: 18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#fff",
    },
    restaurantSubtitle:{
        fontSize: 15.5, 
        color: "#fff", 
    }
})

export default RestaurantAbout;