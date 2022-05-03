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

function CheckoutScreen(props) {
    const pickup_address='funkeyfresh styles, milwaukee, wi 53233'
    const pickup_window='40-50min'
    const [dropoff_address, setDropoff_address]=useState();
    const [card, setCard]=useState();
    
    const [subTotal, setSubTotal]='$'+'15.00'
    const [tip, setTip] = useState();
    const total = '$' + {subTotal} + {tip}

    const [dropoff_instructions, setDropoff_Intructions]= useState();

    const cartItems=props.route.params.cartItems.cartItems
    console.log('-')
    console.log(cartItems)

    const cart=[
        cartItems.map(({ title, subtitle, quantity, id }) => (
          <CartItem foodItem={title} quantity={quantity} key={id}/>
        ))
      ]

    return (
        <View>
            <ScrollView>
                <RestaurantAbout
                    image={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}
                    title={restaurantTitle}
                    subtitle={restaurantSubtitle}
                />
                <Text style={styles.checkoutTitle}>{'Restaurant Address:'}</Text>
                <Text style={styles.checkoutSubtitle}>{pickup_address}</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>{dropoff_address}</Text>
                <TouchableOpacity onPress={() => props.navigation.push("NewAddress")}>
                    <Text style={styles.checkoutSubtitle}>+ New Drop Off Address</Text>
                </TouchableOpacity>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>{card}</Text>
                <TouchableOpacity onPress={() => props.navigation.push("NewCard")}>
                    <Text style={styles.checkoutSubtitle}>+ New Payment Method</Text>
                </TouchableOpacity>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text style={styles.checkoutTitle}>{pickup_window}</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View style={{
                    padding: 10,
                    width:'100%'
                }}>
                    {cart}
                </View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View><Text style={styles.checkoutSubtitle}>Subtotal = {subTotal}</Text></View>
                <View style={styles.containerHorz}>
                    <Text style={styles.checkoutSubtitle}>Tip = </Text>
                    <TextInput
                    placeholder='$0.00'
                    maxLength={5}
                    keyboardType='number-pad'
                    value={tip}
                    onChangeText={text => setTip(text)}
                    />
                </View>
                <View><Text style={styles.checkoutTitle}>Total = {total}</Text></View>
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
                <TouchableOpacity style={styles.centered} onPress={() => props.navigation.push("OrderProgress", {pickup_address:{pickup_address}, pickup_window:{pickup_window}, dropoff_address:{dropoff_address}, total:{total}})}>
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