import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import { Button, Divider } from 'react-native-elements';

function NewAddressScreen(props) {
    const [name, setName]= useState();
    const [st1, setSt1]= useState();
    const [st2, setSt2]= useState();
    const [city, setCity]= useState();
    const [state, setState]= useState();
    const [zipcode, setZipcode]= useState();

    function addAddress(name, st1, st2, city, state, zipcode){
        //Add address to the list of stored addresses
    }

    return (
        <KeyboardAvoidingView enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{flexGrow: 1}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <View style={{alignContent: "center", alignItems: "center", margin: 50}}>
                    <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>
            <View style={styles.centered}>
                <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: "10%"}}>Please enter a new address:</Text>
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
                    placeholder="Street Address 1"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={st1}
                    onChangeText={text => setSt1(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Street Address 2 (optional)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={st2}
                    onChangeText={text => setSt2(text)}
                />
                <TextInput
                    style={styles.input} 
                    placeholder="City"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={city}
                    onChangeText={text => setCity(text)}
                />
                <TextInput
                    style={styles.input} 
                    placeholder="State (ex. WI)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    maxLength={2}
                    value={state}
                    onChangeText={text => setState(text)}
                />
                <TextInput
                    style={styles.input} 
                    placeholder="Zipcode"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='number-pad'
                    maxLength={5}
                    value={zipcode}
                    onChangeText={text => setZipcode(text)}
                />
            </View>

            <TouchableOpacity onPress={() => addAddress(name, st1, st2, city, state, zipcode)} style={{alignContent: "center", alignItems: "center"}}>
                <ImageBackground
                    style={styles.primaryButton}
                    source={require("../app/assets/Buttons/AddButton.png")}
                    resizeMode="contain">
                </ImageBackground>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    },
    centered: {
        justifyContent: "center",
        alignItems: "center"
    },
});
export default NewAddressScreen;