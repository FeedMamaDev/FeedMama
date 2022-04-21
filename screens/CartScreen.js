import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import BigButton from '../app/components/BigButton';
import CartItem from '../app/components/CartItem';

function CartScreen(props) {

    const menuItemDetails=props.route.params.menuItemDetails.menuItemDetails
    console.log(menuItemDetails)

    const cartItems=new Array();

    for(const i in menuItemDetails){
        if(menuItemDetails[i].quantity>0){
            cartItems.push(menuItemDetails[i])
        }
    }

    console.log(cartItems)

    const cart=[
        cartItems.map(({ title, subtitle, quantity, id }) => (
          <CartItem foodItem={title} quantity={quantity} key={id}/>
        ))
      ]
      
    const timeEstimate="30-40 min";
    const fee="$2.99 Fee";
    
    const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
    const restaurantTitle="Funky Fresh Spring Rolls";
    const restaurantSubtitle=timeEstimate.concat(" | ",fee);

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
                    {cart}
                </View>
                <TouchableOpacity style={styles.centered} onPress={() => props.navigation.push("Checkout", {cartItems: {cartItems}})}>
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