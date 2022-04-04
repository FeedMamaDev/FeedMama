import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView, Button, LogoTitle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Divider } from 'react-native-elements';
import RestaurantScreen from '../../screens/RestaurantScreen';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';

import HomeScreen from '../../screens/HomeScreen';
import AccountScreen from '../../screens/AccountScreen';
import SearchScreen from '../../screens/SearchScreen';
import OrderScreen from '../../screens/OrderScreen';
import DonateScreen from '../../screens/DonateScreen';

const RestaurantStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const OrderStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function RestaurantFlow(){
  return(
      <RestaurantStack.Navigator>
        <RestaurantStack.Screen 
            name="Restaurant" 
            component={RestaurantScreen} />
        <RestaurantStack.Screen name="Cart" component={CartScreen}/>
        <RestaurantStack.Screen name="Checkout" component={CheckoutScreen}/>
      </RestaurantStack.Navigator>
  );
}

function OrderFlow(){
  return(
      <OrderStack.Navigator screenOptions={{ headerShown: false }}>
        <OrderStack.Screen name="Order" component={OrderScreen}/>
        <OrderStack.Screen name="RestaurantFlow" component={RestaurantFlow}/>
      </OrderStack.Navigator>
  ); 
}

function SearchFlow(){
  return(
      <SearchStack.Navigator screenOptions={{ headerShown: false }}>
        <SearchStack.Screen name="Search" component={SearchScreen}/>
        <SearchStack.Screen name="RestaurantFlow" component={RestaurantFlow}/>
      </SearchStack.Navigator>
  );
}

function HomeFlow(){
  return(
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={HomeScreen}/>
        <HomeStack.Screen name="RestaurantFlow" component={RestaurantFlow}/>
      </HomeStack.Navigator>
  );
}

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, gestureEnabled: false }}>
            <Tab.Screen name="HomeFlow" component={HomeFlow} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image source={require('../assets/Buttons/HomeIconActive.png')}
                        resizeMode='contain'
                        style={{
                            marginTop: 10,
                            width: 40,
                            height: 40,
                            tintColor: focused ? '#FF6C6C' : '#748c94'
                        }}/>
                    </View>
                )
            }}/>


            <Tab.Screen name="SearchFlow" component={SearchFlow} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image source={require('../assets/Buttons/SearchIcon.png')}
                        resizeMode='contain'
                        style={{
                            marginTop: 10,
                            width: 40,
                            height: 40,
                            tintColor: focused ? '#FF6C6C' : '#748c94'
                        }}/>
                    </View>
                )
            }}/>


            <Tab.Screen name="OrderFlow" component={OrderFlow}options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image source={require('../assets/Buttons/DonateIcon.png')}
                        resizeMode='contain'
                        style={{
                            marginTop: 10,
                            width: 40,
                            height: 40,
                            tintColor: focused ? '#FF6C6C' : '#748c94'
                        }}/>
                    </View>
                )
            }}/>


            <Tab.Screen name="Account" component={AccountScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image source={require('../assets/Buttons/OrdersIcon.png')}
                        resizeMode='contain'
                        style={{
                            marginTop: 10,
                            width: 40,
                            height: 40,
                            tintColor: focused ? '#FF6C6C' : '#748c94'
                        }}/>
                    </View>
                )
            }}/>


            <Tab.Screen name="Donate" component={DonateScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image source={require('../assets/Buttons/AccountIcon.png')}
                        resizeMode='contain'
                        style={{
                            marginTop: 10,
                            width: 40,
                            height: 40,
                            tintColor: focused ? '#FF6C6C' : '#748c94'
                        }}/>
                    </View>
                )
            }}/>


        </Tab.Navigator>
    );
}

export default Tabs;