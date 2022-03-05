//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import LoginScreen from '../FeedMama/screens/LoginScreen';
//import SignUpUserTypeScreen from'.screens/SignUpUserTypeScreen'
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [userType, setEmail] = useState();

  function printUserType() {
    console.log(userType);
  }
  return(
      <View
          style={styles.containerVert}>

          <Image
            source={require("./app/assets/Static/FeedMamaSecLogo.png")}
            resizeMode="contain"
          ></Image>

          <Image
            source={require("./app/assets/Static/Whoareyou.png")}
            resizeMode="contain"
            style={styles.signUpTitle}
          ></Image>

          <TouchableOpacity onPress={() => printUserType()}>

              <ImageBackground
                  style={styles.primaryButton}
                  source={require("./app/assets/Buttons/CustomerButton.png")}
                  resizeMode="contain">

              </ImageBackground>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => printUserType()}>

              <ImageBackground
                  style={styles.primaryButton}
                  source={require("./app/assets/Buttons/MotherButton.png")}
                  resizeMode="contain">

              </ImageBackground>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => printUserType()}>

              <ImageBackground
                  style={styles.primaryButton}
                  source={require("./app/assets/Buttons/RestaurantButton.png")}
                  resizeMode="contain">

              </ImageBackground>

          </TouchableOpacity>

          <View
            style={styles.containerHorz}>
            <TouchableOpacity
              style={{
                marginRight: "15%"
              }}>

              <ImageBackground
                style={{
                  width: 80,
                  height: 80
                }}
                source={require("./app/assets/Buttons/BackButton.png")}
                resizeMode="contain">

              </ImageBackground>

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: "15%",
              }} onPress={() => printUserType()}>
            
              <ImageBackground
                  style={{
                    width: 80,
                    height: 80
                  }}
                  source={require("./app/assets/Buttons/ImaPhysician.png")}
                  resizeMode="contain">

              </ImageBackground>

            </TouchableOpacity>
          </View>

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
