import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import MenuItem from '../app/components/MenuItem';
import BigButton from '../app/components/BigButton';

function RestaurantScreen(props){
  
    const timeEstimate="30-40 min";
    const fee="$2.99 Fee";

    const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
    const restaurantTitle="Funky Fresh Spring Rolls";
    const restaurantSubtitle=timeEstimate.concat(" | ",fee);

    function printItem() {
      //Should be figured out with backend on what to do with acct info
      console.log('Wooh! Selected a menu item - JC');
    }
  
    return (
      <View>
        <RestaurantAbout
          image={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}
          title={restaurantTitle}
          subtitle={restaurantSubtitle}
        />
        <Divider width={1.8} style={{marginVertical:20}}/>
        <ScrollView style={{
          resizeMode:"repeat"
        }}>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
            width:'100%'
          }}>
              <MenuItem
                restaurantName={restaurantTitle}
                title="Egg Roll"
                subtitle='$3.00'/>
          </View>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
          }}>
              <MenuItem
                restaurantName={restaurantTitle}
                title="Egg Roll"
                subtitle='$3.00'/>
          </View>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
            width:'100%'
          }}>
              <MenuItem
                restaurantName={restaurantTitle}
                title="Egg Roll"
                subtitle='$3.00'/>
          </View>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
            width:'100%'
          }}>
              <MenuItem
                restaurantName={restaurantTitle}
                title="Egg Roll"
                subtitle='$3.00'/>
          </View>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
          }}>
              <MenuItem
                restaurantName={restaurantTitle}
                title="Egg Roll"
                subtitle='$3.00'/>
          </View>
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 10,
            width:'100%'
          }}>
              <MenuItem
                restaurantName={restaurantTitle}
                title="Egg Roll"
                subtitle='$3.00'/>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => props.navigation.push("Cart")}>
          <BigButton text="View Cart"/>
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
        alignItems:"center",
        marginTop: '18%',
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#fff",
      }
  });
  
  export default RestaurantScreen;