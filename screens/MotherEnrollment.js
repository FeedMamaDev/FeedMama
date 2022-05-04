import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, Text } from 'react-native';
import email from 'react-native-email'

function MotherEnrollment(props){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [emailAddress, setEmail] = useState();

    function handleEmail(){
        const to = [emailAddress]
        email(to, {
            subject: "Testing out sending emails",
            body: "Dear " + firstName + " " + lastName + ". Please click this link to verify that the sender of this email is pregnant. Thank you"
        }).catch(console.error)
    }

  return(
      <View>
          <TouchableOpacity style={{marginTop: "25%", marginLeft: 20, marginBottom: 50}} onPress={() => props.navigation.goBack()}>
              <Text style={{fontSize: 30, fontWeight: "bold", color: "#FF6C6C"}}>{"< Back"}</Text>
          </TouchableOpacity>

          <View style={styles.centered}>
              <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 50}}>Please enter your physicians information:</Text>
          </View>

          <View style={{marginLeft: "10%", marginRight: "10%"}}>

            <TextInput 
                style={styles.input} 
                placeholder="Physicians First Name"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='default'
                textContentType='name'
                value={firstName}
                onChangeText={text => setFirstName(text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Physicians Last Name"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='default'
                textContentType='name'
                value={lastName}
                onChangeText={text => setLastName(text)}
            />
              <TextInput
                style={styles.input} 
                placeholder="Physicians Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                value={emailAddress}
                onChangeText={text => setEmail(text)}
              />
          </View>

          <View style={styles.centered}>
              <Text style={{fontSize: 16, fontWeight: "bold",marginLeft: "10%", marginRight: "10%", marginTop: 50}}>For security reasons, we must reach</Text>
              <Text style={{fontSize: 16, fontWeight: "bold",marginLeft: "10%", marginRight: "10%"}}>out to your physician to verify</Text>
              <Text style={{fontSize: 16, fontWeight: "bold",marginLeft: "10%", marginRight: "10%", marginBottom: 50}}>you are an expecting mother.</Text>
          </View>

          <TouchableOpacity onPress={() => handleEmail()} style={{alignContent: "center", alignItems: "center"}}>
            <ImageBackground
                style={styles.primaryButton}
                source={require("../app/assets/Buttons/SignUpButton-Salmon.png")}
                resizeMode="contain">
            </ImageBackground>
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
  primaryButton: {
    width: 200,
    height: 60,
    marginTop: "5%",
  },
  input: {
    height: 30,
    backgroundColor: "rgba(245,245,245,.8)",
    borderRadius: 12,
    marginBottom: "5%",
    paddingLeft: 10,
    borderColor: "black",
    borderWidth: 1
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
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

  export default MotherEnrollment;