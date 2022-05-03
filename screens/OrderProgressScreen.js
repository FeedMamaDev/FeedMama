import { useState } from 'react';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import CartItem from '../app/components/CartItem';
import RestaurantAbout from '../app/components/RestaurantAbout';

const timeEstimate="30-40 min";
const fee="$2.99 Fee";

const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
const restaurantTitle="Funky Fresh Spring Rolls";
const restaurantSubtitle=timeEstimate.concat(" | ",fee);

function OrderProgressScreen(props) {
    const [dropoff_address, setDropoff_address]=useState();
    const pickup_address='funkeyfresh styles, milwaukee, wi 53233'
    const pickup_window='40-50min'
    
    const total = '$20'

    function trackOrder(){
        //provide tracking url here to direct them to a web page that tracks their order
    }

    return (
        <View>
            <RestaurantAbout
                    image={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}
                    title='ORDER IN PROGRESS'
                    subtitle='Tap the button to Track'
                />
            <Text style={styles.checkoutTitle}>{restaurantTitle}</Text>
            <Text style={styles.checkoutSubtitle}>{pickup_address}</Text>
            <Divider width={.5} style={{marginVertical:10}}/>
            <Text style={styles.checkoutTitle}>Delivering To...</Text>
            <Text style={styles.checkoutSubtitle}>{dropoff_address}</Text>
            <Divider width={.5} style={{marginVertical:10}}/>
            <Text style={styles.checkoutTitle}>{pickup_window}</Text>
            <Divider width={.5} style={{marginVertical:10}}/>
            <View><Text style={styles.checkoutTitle}>Total = {total}</Text></View>
            <Divider width={.5} style={{marginVertical:10}}/>
            <TouchableOpacity style={styles.centered} onPress={() => trackOrder()}>
                <Image
                    source={require("../app/assets/Buttons/PlaceOrderButton.png")}
                    resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerVert: {
    flex: 1,
    padding: "5%",
    alignItems: "flex-start",
    resizeMode: "contain"
    },
    containerHorz: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    },
    input: {
    width: 265,
    height: 60,
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
    checkoutTitle:{
        margin:'2%',
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
    },
    checkoutSubtitle:{
        margin:'2%',
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
    },
    centered: {
        marginTop: 5,
      justifyContent: "center",
      alignItems: "center"
    },
});
export default OrderProgressScreen;