import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';

function SignUpAcctInfoScreen(props){
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  function printUserType() {
    //Should be figured out with backend on what to do with acct info
    console.log('Wooh! Just send the acct info to backend stuff? - JC');
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

        <TextInput 
          style={styles.input} 
          placeholder={"Confirm Password"}
          autoCapitalize="none"
          //icon="lock"
          secureTextEntry
          textContentType='password'
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
          onChangeText={text => setPhoneNumber(text)}
        />

        <TouchableOpacity onPress={() => props.navigation.navigate("Tabs")}>

          <ImageBackground
            style={styles.primaryButton}
            source={require("../app/assets/Buttons/SignUpButton-Salmon.png")}
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

  console.log(navData.navigation.getParam("UserType"))
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