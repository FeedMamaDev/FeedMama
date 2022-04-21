import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text, FlatList} from 'react-native';
import { Button, Divider } from 'react-native-elements';

function NewAddressScreen(props) {
    const [name, setName]= useState();
    const [st1, setSt1]= useState();
    const [st2, setSt2]= useState();
    const [city, setCity]= useState();
    const [state, setState]= useState();
    const [zipcode, setZipcode]= useState();

    const fullAddr={
        name: {name},
        address: st1+" "+st2+", "+city+", "+state+" "+zipcode
    }

    function addAddress({fullAddr}){
        //Add address to the list of stored addresses
    }

    return (
        <View>
            <TouchableOpacity style={{marginTop: "25%", marginLeft: 20, marginBottom: 50}} onPress={() => props.navigation.goBack()}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: "#FF6C6C"}}>{"< Back"}</Text>
            </TouchableOpacity>

            <View style={styles.centered}>
                <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 50}}>Please enter a new address:</Text>
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
                    value={state}
                    onChangeText={text => setState(text)}
                />
                <TextInput
                    style={styles.input} 
                    placeholder="Zipcode"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='number-pad'
                    value={zipcode}
                    onChangeText={text => setZipcode(text)}
                />
            </View>

            <TouchableOpacity onPress={() => addAddress(fullAddr)} style={{alignContent: "center", alignItems: "center"}}>
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