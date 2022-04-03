import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import MenuItem from '../app/components/MenuItem';

function RestaurantScreen(props){

    const [restImage, setRestImage] = useState( 
      '../app/assets/Photos/FunkyFreshSpringRolls.jpg'
    );  

    const [titleText, setTitleText] = useState("Funky Fresh Spring Rolls");
  
    function printItem() {
      //Should be figured out with backend on what to do with acct info
      console.log('Wooh! Selected a menu item - JC');
    }
  
    return (
          <ScrollView style={{
          resizeMode:"repeat"
        }}>
          <ImageBackground
            source={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}
            style={{
              width: '100%',
              height: '100%',
            }}>
              <Text style={styles.restaurantTitle}>
                {titleText}
              </Text>
          </ImageBackground>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
            width:'100%'
          }}>
            <TouchableOpacity onPress={() => printItem()}>
              <MenuItem
                title="Egg Roll"
                subtitle='$3.00'/>
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
          }}>
            <TouchableOpacity onPress={() => printItem()}>
              <MenuItem
                title="Egg Roll"
                subtitle='$3.00'/>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
      },
      signUpTitle: {
      marginTop: "20%",
      marginBottom: "5%"
      },
      restaurantTitle:{
        justifyContent:"center",
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#fff",
      }
  });
  
  export default RestaurantScreen;