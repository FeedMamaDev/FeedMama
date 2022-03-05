import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';

function SignUpAcctInfoScreen(props){

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

  export default SignUpAcctInfoScreen;