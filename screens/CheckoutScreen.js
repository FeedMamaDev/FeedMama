import { useState, useEffect } from 'react';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Alert, Text} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import CurrencyInput from 'react-native-currency-input';

import Constants from 'expo-constants';
import CartItem from '../app/components/CartItem';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

const timeEstimate="30-40 min";
const fee="$2.99 Fee";
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
const restaurantTitle="Funky Fresh Spring Rolls";
const restaurantSubtitle=timeEstimate.concat(" | ",fee);

function CheckoutScreen(props) {
    const [dropoff_address, setDropoff_address]=useState("1313 W Wisconsin Ave, Milwaukee, WI 53233");
    const [card, setCard]=useState("1234567890");
    
    const [subTotal, setSubTotal] = useState(0)
    const [tip, setTip] = useState(0);
    const [total, setTotal] = useState(0);

    const [dropoff_instructions, setDropoff_Intructions]= useState();
    const [restaurant, setRestaurant] = useState({ name: "", description: "", address: "", city: "", state: "", zip: "" });

    const cartItems=props.route.params.cartItems.cartItems
    const id=props.route.params.id

    useEffect(() => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/restaurants/${id}/info`, {
                headers: {
                'Authorization': `JWT ${x}` 
                }
            }).then((resp) => {
                setRestaurant(resp.data)
                console.log(resp.data)
            }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                { text: 'OK' }
                ]);
            });
        })

        let temp_subtotal = 0;
        cartItems.forEach(x => {
            temp_subtotal += x.quantity * parseInt(x.price) 
        })
        setSubTotal(temp_subtotal)
        setTotal(temp_subtotal)
    }, []);

    function updateTip(text) {
        let num = parseFloat(text)
        setTip(num)
        setTotal(subTotal + num)
    }

    function order() {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => { 
            axios.post(`${baseUrl}/order`, {
                restaurant: id,
                cart: cartItems,
                tip: tip,
                dropoff_instructions: dropoff_instructions,
                card: card,
                dropoff_address: dropoff_address
                }, {
                headers: {
                    'Authorization': `JWT ${x}` 
                }
            }).then(() => {
                Alert.alert('Order Created Successfully!', 'You should recieve a text message to track your order.', [
                    { text: 'OK', onPress: () => { props.navigation.push("OrderProgress", {pickup_address:{pickup_address}, pickup_window:{pickup_window}, dropoff_address:{dropoff_address}, total:{total}}) } },
                ]);
            }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                    { text: 'OK' }
                ]);
            });
        })
      }

    const cart=[
        cartItems.map(({ name, price, quantity, id }) => (
            <CartItem foodItem={name} price={price} quantity={quantity} key={id}/>
          ))
      ]

    return (
        <View>
            <ScrollView>
                <RestaurantAbout
                    image={{uri: restaurant.img}}
                    title={restaurant.name}
                    subtitle={restaurant.description}
                />
                <Text style={styles.checkoutTitle}>{'Restaurant Address:'}</Text>
                <Text style={styles.checkoutSubtitle}>{restaurant.address + " " + restaurant.city + ", " + restaurant.state + " " + restaurant.zip}</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>{dropoff_address}</Text>
                <TouchableOpacity onPress={() => props.navigation.push("ChangeAddress")}>
                    <Text style={styles.checkoutSubtitle}>+ Change Drop Off Address</Text>
                </TouchableOpacity>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>{card}</Text>
                <TouchableOpacity onPress={() => props.navigation.push("NewCard")}>
                    <Text style={styles.checkoutSubtitle}>+ Change Payment Method</Text>
                </TouchableOpacity>
                <View style={{
                    padding: 10,
                    width:'100%'
                }}>
                    {cart}
                </View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View><Text style={styles.checkoutSubtitle}>Subtotal = {formatter.format(subTotal)}</Text></View>
                <View style={styles.containerHorz}>
                    <Text style={styles.checkoutSubtitle}>Tip = </Text>
                    <TextInput
                        placeholder='$0.00'
                        maxLength={5}
                        prefix="$"
                        keyboardType='decimal-pad'
                        value={tip}
                        onChangeText={text => updateTip(text)}
                    />
                </View>
                <View><Text style={styles.checkoutTitle}>Total = {formatter.format(total)}</Text></View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <TextInput 
                    style={styles.input} 
                    placeholder="Drop Off Instructions"
                    maxLength={50}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={dropoff_instructions}
                    onChangeText={text => setDropoff_Intructions(text)}
                />
                <TouchableOpacity style={styles.centered} onPress={() => order()}>
                    <Image
                        source={require("../app/assets/Buttons/PlaceOrderButton.png")}
                        resizeMode="contain"/>
                </TouchableOpacity>
            </ScrollView>
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
    restaurantTitle:{
      alignItems:"center",
      marginTop: '18%',
      fontSize:18,
      fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
      fontWeight:"bold",
      color: "#fff",
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
export default CheckoutScreen;