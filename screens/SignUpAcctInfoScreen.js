import { useState } from 'react';
import axios from 'axios';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function SignUpAcctInfoScreen(props){
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  function signUp() {
    // TODO: More validation here for frontend!

    if(password !== confirmPassword) {
      Alert.alert('Password', 'Your passwords do not match.', [
        { text: 'OK', onPress: () => { setPassword(""); setConfirmPassword(""); } },
      ]);
      return
    }

    axios.post(`${baseUrl}/auth/create`, {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      phone: phoneNumber
    }).then(() => {
      Alert.alert('User Created', 'User created successfully!.', [
        { text: 'OK', onPress: () => { props.navigation.navigate("Login")} },
      ]);
    }).catch((err) => {
      Alert.alert('Error', err.response.data.message, [
        { text: 'OK' }
      ]);
    });
  }

  return(
    <View
        style={styles.containerVert}>

        <Image
          source={require("../app/assets/Static/FeedMamaSecLogo.png")}
          resizeMode="contain"
        ></Image>

        <Image
          source={require("../app/assets/Static/Accountinformation.png")}
          resizeMode="contain"
          style={styles.signUpTitle}
        ></Image>

        <TextInput 
          style={styles.input} 
          placeholder="First Name"
          autoCapitalize="none"
          autoCorrect={false}
          //icon="email"
          keyboardType='default'
          textContentType='name'
          onChangeText={text => setFirstName(text)}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Last Name"
          autoCapitalize="none"
          autoCorrect={false}
          //icon="email"
          keyboardType='default'
          textContentType='name'
          onChangeText={text => setLastName(text)}
        />

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

        <TextInput 
          style={styles.input} 
          placeholder={"Confirm Password"}
          autoCapitalize="none"
          //icon="lock"
          secureTextEntry
          textContentType='password'
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Phone Number (e.g., 1234567890)"
          autoCapitalize="none"
          autoCorrect={false}
          //icon="email"
          keyboardType='number-pad'
          textContentType='telephoneNumber'
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />

        <TouchableOpacity onPress={() => signUp()}>

          <ImageBackground
            style={styles.primaryButton}
            source={require("../app/assets/Buttons/SignUpButton-Salmon.png")}
            resizeMode="contain">

          </ImageBackground>

        </TouchableOpacity>

        <View
          style={styles.containerHorz}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}
            style={{
              marginRight: "15%"
            }}>

            <ImageBackground
              style={{
                width: 80,
                height: 80
              }}
              source={require("../app/assets/Buttons/BackButton.png")}
              resizeMode="contain">

            </ImageBackground>

          </TouchableOpacity>

          <View
              style={{
                marginLeft: "15%",
                width: 80,
                height: 80,
                resizeMode: "contain"
              }} onPress={() => props.navigation.navigate("AcctInfo", { UserType: "Physician" })}>
            </View>

        </View>

    </View>
  );
}

SignUpAcctInfoScreen.navigationOptions = (navData) => {
  console.log(navData.navigation.getParam("UserType"));
};

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

export default SignUpAcctInfoScreen;