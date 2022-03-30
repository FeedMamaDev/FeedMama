//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpUserTypeScreen from './screens/SignUpUserTypeScreen';
import SignUpAcctInfoScreen from './screens/SignUpAcctInfoScreen';
import RestaurantScreen from './screens/RestaurantScreen';

import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import SearchScreen from './screens/SearchScreen';
import OrderScreen from './screens/OrderScreen';
import DonateScreen from './screens/DonateScreen';

import React from 'react'
import Tabs from './app/components/tabs.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserType" component={SignUpUserTypeScreen} />
        <Stack.Screen name="AcctInfo" component={SignUpAcctInfoScreen} />
        <Stack.Screen name="Tabs" component={Tabs} screenOptions={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};