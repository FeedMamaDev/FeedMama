import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function LoginScreen(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function login() {
    axios.post(`${baseUrl}/auth/login`, {
      email: email,
      password: password
    }).then((resp) => {
      SecureStore.setItemAsync("FEEDMAMA_TOKEN", resp.data.token).then(() => {
        props.navigation.navigate("Tabs");
      });
    }).catch((err) => {
      Alert.alert('Error', err.response.data.message, [
        { text: 'OK' }
      ]);
    });
  }

  return(
    <ImageBackground
      source={require("../app/assets/Static/BG-Light.png")}
      resizeMode="cover"
      style={styles.background}>

        <TouchableOpacity /*onPress={() => props.navigation.navigate("Tabs")}*/>
          <Image
            source={require("../app/assets/Static/FeedMamaLogo-PrimaryWhite.png")}
            resizeMode="contain"
            style={styles.logo}
          ></Image>
        </TouchableOpacity>

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
          value={email}
          onChangeText={text => setEmail(text)}
          />

        <TextInput 
          style={styles.input} 
          placeholder={"Password"}
          autoCapitalize="none"
          icon="lock"
          secureTextEntry
          textContentType='password'
          value={password}
          onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity onPress={() => login()}>

            <ImageBackground
              style={styles.primaryButton}
              source={require("../app/assets/Buttons/LoginButton-White.png")}
              resizeMode="contain">

            </ImageBackground>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate("UserType")}>

            <ImageBackground
              style={styles.primaryButton}
              source={require("../app/assets/Buttons/SignUpButton-White.png")}
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
  containerHorz: {
    flex: 1,
    flexDirection: 'row',
    marginTop: "25%",
    alignItems: "center",
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
  primaryButton: {
    width: 200,
    height: 60,
    marginTop: "5%",
  }
});

export default LoginScreen;