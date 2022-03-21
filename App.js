//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpUserTypeScreen from './screens/SignUpUserTypeScreen';
import SignUpAcctInfoScreen from './screens/SignUpAcctInfoScreen';

import Card from './app/components/Card';

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  UserType: SignUpUserTypeScreen,
  AcctInfo: SignUpAcctInfoScreen,
},
{
  headerMode: 'none'
}
);

const Navigator = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Navigator>
      <LoginScreen/>
    </Navigator>
  );
}