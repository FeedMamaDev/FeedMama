import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

function WalletPage(props){
    return(
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <View style={styles.centered}>
                <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold"}}>Wallet</Text>
            </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <ScrollView style={{resizeMode:"repeat", height: "100%"}}>
                <Text style={{fontSize: 20, marginTop: 25, marginLeft: 15 ,fontWeight: "bold"}}>Saved Payment Methods</Text>
                <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                    <Text>We will never ask you for your social security number!</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate("AddCard")}>
                <ImageBackground
                                style={styles.primaryButton}
                                source={require("../app/assets/Buttons/LoginButton-White.png")}
                                resizeMode="contain">
                                </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );      
}

const styles = StyleSheet.create({
    centered: {
      justifyContent: "center",
      alignItems: "center"
    },
    primaryButton: {
        width: 200,
        height: 60,
        marginTop: "5%",
    }
});

export default WalletPage