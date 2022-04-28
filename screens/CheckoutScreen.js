import { useState } from 'react';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text, FlatList} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import CartItem from '../app/components/CartItem';
import RestaurantAbout from '../app/components/RestaurantAbout';
import DropDownPicker from 'react-native-dropdown-picker'

const timeEstimate="30-40 min";
const fee="$2.99 Fee";

const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
const restaurantTitle="Funky Fresh Spring Rolls";
const restaurantSubtitle=timeEstimate.concat(" | ",fee);

function CheckoutScreen(props) {
    const dropoff_address=[
        {name:"John Doe", address: "2029 W Wisconsin Ave Apt B, Milwaukee, WI 53233"},
        {name: "Austin Fron", address: "1515 W Wisconsin Ave, Milwaukee, WI 53233"},
        {name:"April Summer", address: "911 N 17th Street Apt 301, Milwaukee, WI 53233"},
    ]

    const card=[
        {name:"First Last", number: "1234 5678 9012 3456", expiration: "01/30", cvv: "123"},
        {name:"John Doe", number: "4147 1234 1231 5123", expiration: "02/30", cvv: "423"},
        {name:"Jane Austin", number: "4147 1251 1562 1034", expiration: "03/26", cvv: "780"},
    ]
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
                <Divider width={1.8} style={{marginVertical:20}}/>
                <Text>pickup_address</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <DropDownPicker
                    items={dropoff_address}
                    defaultIndex={0}
                    containerStyle={{height: 20}}
                    onChangeItem={item => console.log(item.street1)}
                />
                <TouchableOpacity onPress={() => props.navigation.push("NewAddress")}>
                    <Text>+ New Drop Off Address</Text>
                </TouchableOpacity>
                <Divider width={.5} style={{marginVertical:10}}/>
                <Text>pickup_window</Text>
                <Divider width={.5} style={{marginVertical:10}}/>
                <DropDownPicker
                    items={card}
                    defaultIndex={0}
                    containerStyle={{height: 20}}
                    onChangeItem={item => console.log(item.number)}
                />
                <TouchableOpacity onPress={() => props.navigation.push("NewCard")}>
                    <Text>+ New Payment Method</Text>
                </TouchableOpacity>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View style={{
                    padding: 10,
                    width:'100%'
                }}>
                    {cart}
                </View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <View><Text>Subtotal= {subTotal}</Text></View>
                <View style={styles.containerHorz}>
                    <Text>Tip= </Text>
                    <TextInput
                    placeholder='$0.00'
                    keyboardType='number-pad'
                    value={tip}
                    onChangeText={text => setTip(text)}
                    />
                </View>
                <View><Text>Total= {total}</Text></View>
                <Divider width={.5} style={{marginVertical:10}}/>
                <TextInput 
                    style={styles.input} 
                    placeholder="Drop Off Instructions"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    value={dropoff_instructions}
                    onChangeText={text => setDropoff_Intructions(text)}
                />
                <TouchableOpacity onPress={() => signUp()}>
                    <Image
                        style={styles.centered}
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
    centered: {
        marginTop: 5,
      justifyContent: "center",
      alignItems: "center"
    },
});
export default CheckoutScreen;