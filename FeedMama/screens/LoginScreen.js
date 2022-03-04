import React, { Component } from "react";
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";

function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/Static/BG - Light.png")}
        resizeMode="contain"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <Image
          source={require("./assets/Static/FeedMama Logo - Primary White.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
        <TextInput style={styles.rect2} placeholder={"Username"}/>
        <TextInput style={styles.rect3} placeholder={"Password"}/>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUpUserTypeScreen")}
            style={styles.button}
          ></TouchableOpacity>
          <Text style={styles.staySignedIn}>Stay Signed In</Text>
        </View>
        <ImageBackground
          source={require("./assets/Buttons/Login Button - White.png")}
          resizeMode="contain"
          style={styles.image3}
          imageStyle={styles.image3_imageStyle}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
            style={styles.button2}
          ></TouchableOpacity>
        </ImageBackground>
        <Image
          source={require("./assets/Buttons/Sign Up Button - White.png")}
          resizeMode="contain"
          style={styles.image4}
        ></Image>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    zIndex: -1
  },
  image: {
    width: 757,
    height: 812,
    marginLeft: -191
  },
  image_imageStyle: {},
  image2: {
    width: 200,
    height: 200,
    marginTop: 86,
    marginLeft: 279
  },
  rect2: {
    width: 265,
    height: 30,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginTop: 73,
    marginLeft: 246,
    paddingLeft: 10
  },
  rect3: {
    width: 265,
    height: 30,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginTop: 17,
    marginLeft: 246,
    paddingLeft: 10
  },
  button: {
    width: 16,
    height: 16,
    backgroundColor: "rgba(255,255,255,1)"
  },
  staySignedIn: {
    fontFamily: "be-vietnam-pro-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11,
    marginLeft: 14,
    marginTop: 2
  },
  buttonRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 311,
    marginRight: 341
  },
  image3: {
    width: 200,
    height: 58,
    marginTop: 16,
    marginLeft: 279
  },
  image3_imageStyle: {},
  button2: {
    width: 200,
    height: 58,
    backgroundColor: "#E6E6E6",
    opacity: 0
  },
  image4: {
    width: 200,
    height: 56,
    marginTop: 12,
    marginLeft: 279
  }
});

export default LoginScreen;