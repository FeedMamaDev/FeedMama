import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text, FlatList} from 'react-native';
import { Button, Divider } from 'react-native-elements';

function NewAddressScreen(props) {
    const [name, setName]= useState();
    const [number, setNumber]= useState();
    const [expiration, setExpiration]= useState();
    const [cvv, setCVV]= useState();

    const fullAddr={
        name:{name}, 
        number: {number}, 
        expiration: {expiration}, 
        cvv: {cvv}
    }

    function addAddress({fullCard}){
        //Add address to the list of stored cards
    }

    return (
        <View>
            <TouchableOpacity style={{marginTop: "25%", marginLeft: 20, marginBottom: 50}} onPress={() => props.navigation.goBack()}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: "#FF6C6C"}}>{"< Back"}</Text>
            </TouchableOpacity>

            <View style={styles.centered}>
                <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 50}}>Please enter a new payment card:</Text>
            </View>

            <View style={{marginLeft: "10%", marginRight: "10%"}}>

                <TextInput 
                    style={styles.input} 
                    placeholder="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    textContentType='name'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Card Number"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='number-pad'
                    value={number}
                    onChangeText={text => setNumber(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Expiration Date (MM/YY)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={expiration}
                    onChangeText={text => setExpiration(text)}
                />
                <TextInput
                    style={styles.input} 
                    placeholder="CVV"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={cvv}
                    onChangeText={text => setCVV(text)}
                />
            </View>

            <TouchableOpacity onPress={() => addCard(fullCard)} style={{alignContent: "center", alignItems: "center"}}>
                <ImageBackground
                    style={styles.primaryButton}
                    source={require("../app/assets/Buttons/AddButton.png")}
                    resizeMode="contain">
                </ImageBackground>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    containerVert: {
    flex: 1,
    padding: "5%",
    alignItems: "flex-start",
    resizeMode: "contain"
    },
    containerHorz: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    },
    input: {
    width: 265,
    height: 30,
    backgroundColor: "rgba(245,245,245,.8)",
    borderRadius: 12,
    marginBottom: "5%",
    paddingLeft: 10
    },
    primaryButton: {
    width: 200,
    height: 60,
    marginTop: "5%",
    },
    signUpTitle: {
    marginTop: "20%",
    marginBottom: "5%"
    },
    restaurantTitle:{
      alignItems:"center",
      marginTop: '18%',
      fontSize:18,
      fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
      fontWeight:"bold",
      color: "#fff",
    }
});
export default NewAddressScreen;