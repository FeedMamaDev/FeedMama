import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import MenuItem from '../app/components/MenuItem';
import BigButton from '../app/components/BigButton';
import CartItem from '../app/components/CartItem';

function CartScreen(props) {
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
            <CartItem
                foodItem="Egg Rolls"
                quantity="3"
            />
        </View>
    );
}

export default CartScreen;