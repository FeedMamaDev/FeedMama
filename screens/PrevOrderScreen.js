import { useState, useEffect } from 'react';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import CartItem from '../app/components/CartItem';
import RestaurantAbout from '../app/components/RestaurantAbout';

import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function PrevOrderScreen(props) {
    const orderID=props.route.params.OrderID
    const [order, setOrder]=useState({Total: 0, Tip: 0});
    const [restaurant, setRestaurant]=useState({img: "", name: "", description: "", address: "", city: "", state: "", zip: ""});
    const [orderMeals, setOrderMeals]=useState([{ name: "", price: "", quantity: "", id: "" }]);

    useEffect(() => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.post(`${baseUrl}/order/single/`, { id: orderID }, {
                headers: {
                'Authorization': `JWT ${x}` 
                }
            }).then((resp) => {
                setOrder(resp.data.order)
                setRestaurant(resp.data.restaurant)
                setOrderMeals(resp.data.ordermeals)
            }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                { text: 'OK' }
                ]);
            });
        })
      }, []);

    return (
        <View>
            <ScrollView>
                <RestaurantAbout
                    image={{uri: restaurant.img}}
                    title={restaurant.name}
                    subtitle={restaurant.description}
                />
                <Divider width={1.8} style={{marginVertical:20}}/>
                <Text style={styles.checkoutTitle}>Pick up</Text>
                <Text style={styles.checkoutSubtitle}>{restaurant.address}</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>Drop Off</Text>
                <Text style={styles.checkoutSubtitle}>1313 W Wisconsin Ave, Milwaukee, WI 53233</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>Items</Text>
                {orderMeals.map(({ name, price, quantity, id }) => (
                    <CartItem foodItem={name} price={price} quantity={quantity} key={id}/>
                ))}
                <Divider width={.5} style={{marginVertical:10}}/>
                <View style={{
                    padding: 10,
                    width:'100%'
                }}>
                    
                </View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View><Text style={styles.checkoutSubtitle}>Subtotal = {order.Total - order.Tip}</Text></View>
                <View style={styles.containerHorz}>
                    <Text style={styles.checkoutSubtitle}>Tip = {order.Tip}</Text>
                </View>
                <View><Text style={styles.checkoutTitle}>Total = {order.Total}</Text></View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View><Text style={styles.checkoutTitle}>Dropoff Instructions</Text></View>
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
export default PrevOrderScreen;