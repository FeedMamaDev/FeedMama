import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import BigButton from '../app/components/BigButton';
import Constants from 'expo-constants';
import CartItem from '../app/components/CartItem';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function CartScreen(props) {

    const meals=props.route.params.menuItemDetails.meals
    const id = props.route.params.id

    const [restaurant, setRestaurant] = useState({ name: "", description: "" });

    useEffect(() => {
        SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
            axios.get(`${baseUrl}/restaurants/${id}/info`, {
                headers: {
                'Authorization': `JWT ${x}` 
                }
            }).then((resp) => {
                setRestaurant(resp.data)
            }).catch((err) => {
                Alert.alert('Error', err.response.data.message, [
                { text: 'OK' }
                ]);
            });
        })
    }, []);


    const cartItems=new Array();

    for(const i in meals){
        if(meals[i].quantity>0){
            cartItems.push(meals[i])
        }
    }

    const cart=[
        cartItems.map(({ name, price, quantity, id }) => (
          <CartItem foodItem={name} price={price} quantity={quantity} key={id}/>
        ))
      ]

    return (
        <View>
            <RestaurantAbout
                image={{uri: restaurant.img}}
                title={restaurant.name}
                subtitle={restaurant.description}
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
                    {cart}
                </View>
                <TouchableOpacity style={styles.centered} onPress={() => props.navigation.push("Checkout", {id: id, cartItems: {cartItems}})}>
                    <Image
                    source={require("../app/assets/Buttons/CheckoutButton.png")}
                    />
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
    centered: {
        marginTop: 5,
      justifyContent: "center",
      alignItems: "center"
    },
});

export default CartScreen;