//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import LoginScreen from '../FeedMama/screens/LoginScreen';
//import SignUpUserTypeScreen from'.screens/SignUpUserTypeScreen'
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  return <LoginScreen/>

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function PrintEP() {
      console.log(email);
      console.log(password);
    }

  return(
    <ImageBackground
      source={require("../FeedMama/app/assets/Static/BG-Light.png")}
      resizeMode="cover"
      style={styles.background}>

        <Image
          source={require("../FeedMama/app/assets/Static/FeedMamaLogo-PrimaryWhite.png")}
          resizeMode="contain"
          style={styles.logo}
        ></Image>

        <View
          style={styles.container}>

        <TextInput 
          style={styles.input} 
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText={text => setEmail(text)}
          />

        <TextInput 
          style={styles.input} 
          placeholder={"Password"}
          autoCapitalize="none"
          icon="lock"
          secureTextEntry
          textContentType='password'
          onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity onPress={() => PrintEP()}>

            <ImageBackground
              style={{
                width: 200,
                height: 58,
                marginTop: "5%"
              }}
              source={require("../FeedMama/app/assets/Buttons/LoginButton-White.png")}
              resizeMode="contain">

            </ImageBackground>

          </TouchableOpacity>

          <TouchableOpacity>

            <ImageBackground
              style={{
                width: 200,
                height: 58,
                marginTop: "2%",
              }}
              source={require("../FeedMama/app/assets/Buttons/SignUpButton-White.png")}
              resizeMode="contain">

            </ImageBackground>

          </TouchableOpacity>

        </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E6E6E6",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 265,
    height: 30,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginBottom: "5%",
    paddingLeft: 10
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: "30%",
    marginBottom: "-50%",
  },
});
