//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import LoginScreen from '../FeedMama/screens/LoginScreen';
//import SignUpUserTypeScreen from'.screens/SignUpUserTypeScreen'
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Card from './app/components/Card';

function printRestaurant() {
  //Should be figured out with backend on what to do with acct info
  console.log('Wooh! Should switch to restaurant page list view? - JC');
}

export default function App() {
  let timeEstimate="30-40 min";
  let fee="$2.99 Fee";
  let restHomeSubtitle=timeEstimate.concat(" | ",fee);

  return(
      <View style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        paddingTop: 100
      }}>
        <TouchableOpacity onPress={() => printRestaurant()}>
          <Card
            title="Funky Fresh Spring Rolls"
            subtitle={restHomeSubtitle}
            image={require("./app/assets/Photos/FunkyFreshSpringRolls.jpg")}/>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  containerVert: {
    flex: 1,
    marginTop: "25%",
    alignItems: "center",
  },
  containerHorz: {
    flex: 1,
    flexDirection: 'row',
    marginTop: "25%",
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
  }
});
