import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView } from 'react-native';
import MenuItem from '../app/components/MenuItem';

function RestaurantScreen(props){

    const [restImage, setRestImage] = useState( 
      '../app/assets/Photos/FunkyFreshSpringRolls.jpg'
    );  
  
      function printItem() {
       //Should be figured out with backend on what to do with acct info
       console.log('Wooh! Selected a menu item - JC');
      }
  
      return (
          <View
        resizeMode= 'contain'>
  
          <View style={{
            alignItems: 'center',
          }}>
            <Image
            style={{
              width: '100%',
              height: '15%'
            }}
              source={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}
              resizeMode="contain">
            </Image>
          </View>
          
          <ScrollView style={{
            resizeMode:"repeat"
          }}>
            <View style={{
              backgroundColor: "#f8f4f4",
              paddingTop: 20,
            }}>
              <TouchableOpacity onPress={() => printRestaurant()}>
                <MenuItem
                  title="Egg Roll"
                  subtitle='$3.00'/>
              </TouchableOpacity>
            </View>
            <View style={{
              backgroundColor: "#f8f4f4",
              padding: 20,
              paddingTop: 20,
              height: 300
            }}>
            </View>
          </ScrollView>
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
      }
  });
  
  export default RestaurantScreen;