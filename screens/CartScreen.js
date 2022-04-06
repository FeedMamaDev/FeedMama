import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import MenuItem from '../app/components/MenuItem';
import BigButton from '../app/components/BigButton';
import CartItem from '../app/components/CartItem';

function CartScreen({route}) {

    const menuItemDetails=route.params.menuItemDetails.menuItemDetails
    console.log(menuItemDetails)

    const cartItems=new Array();

    for(const i in menuItemDetails){
        if(menuItemDetails[i].quantity>0){
            cartItems.push(menuItemDetails[i])
        }
    }

    console.log(cartItems)

    const cart=[
        menuItemDetails.map(({ title, subtitle, quantity, id }) => (
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
            </ScrollView>
        </View>
    );
}

export default CartScreen;