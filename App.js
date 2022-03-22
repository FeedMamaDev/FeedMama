//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpUserTypeScreen from './screens/SignUpUserTypeScreen';
import SignUpAcctInfoScreen from './screens/SignUpAcctInfoScreen';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './app/components/tabs.js'

export default function App() {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  );
}

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Tabs: Tabs,
  UserType: SignUpUserTypeScreen,
  AcctInfo: SignUpAcctInfoScreen,
},
{
  headerMode: 'none'
}
);

const Navigator = createAppContainer(AppNavigator);

/*export default function App() {
  return (
    <Navigator>
      <LoginScreen/>
    </Navigator>
  );
}*/