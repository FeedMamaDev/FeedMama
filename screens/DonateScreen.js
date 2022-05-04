import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import { Divider } from 'react-native-elements';

import CurrencyInput from 'react-native-currency-input';

export default function DonateScreen(props){
  const [donation, setDonation] = useState(0.00);

  return (
    <KeyboardAvoidingView enabled
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={{flexGrow: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>

            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                <View style={styles.centered}>
                    <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold", marginBottom: 10}}>Donate</Text>
                </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>

            <View style={{
              backgroundColor:"#FF6C6C",
              height: "60%",
              alignItems:"center",
            }}>
              <View style={{marginTop:"15%"}}/>
              <Text style={styles.title}>Donate to Mothers in need!</Text>
              <Text style={styles.title}>Enter amount below:</Text>
              <View style={{marginTop:"10%"}}/>
              <CurrencyInput
                value={donation}
                onChangeValue={setDonation}
                prefix="$"
                delimiter=","
                separator="."
                precision={2}
                style={{
                  margin:'2%',
                  fontSize:48,
                  fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
                  fontWeight:"bold",
                  color: "white", 
                }}
                onChangeText={(formattedValue) => {
                console.log(formattedValue);
              }}
              />
              <View style={{marginTop:"10%"}}/>
              <Text style={styles.subtitle}>Donations will aid in the No-Cost Meals Program</Text>
            </View>

            <TouchableOpacity style={styles.centered}>
                <Image source={require("../app/assets/Buttons/DonateButton.png")} resizeMode="contain"/> 
            </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerCalc: {
    backgroundColor:"#FF6C6C",
    height:"60%",
    alignItems: 'center',
    justifyContent:"space-around",
  },
    
  display:{
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    marginHorizontal:"25%"
  },
    
  calcKeyRow:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    width:"100%",
  },

  containerVert: {
    flex: 1,
    marginTop: "25%",
    alignItems: "center",
    },
    containerHorz: {
    flex: 1,
    flexDirection: 'row',
    marginTop: "10%",
    marginBottom: "5%",
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
    justifyContent: "center",
    alignItems: "center"
    },
    title:{
      margin:'2%',
      fontSize:20,
      fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
      fontWeight:"bold",
      color: "white",
    },
    subtitle:{
        margin:'2%',
        fontSize:12,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "white",
    },
    centered: {
        marginTop: "3%",
      justifyContent: "center",
      alignItems: "center"
    },
});