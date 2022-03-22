import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import AccountScreen from '../../screens/AccountScreen';
import SearchScreen from '../../screens/SearchScreen';
import OrderScreen from '../../screens/OrderScreen';
import DonateScreen from '../../screens/DonateScreen';
import { View, Image, Text } from 'react-native';
   

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
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


            <Tab.Screen name="Search" component={SearchScreen} options={{
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


            <Tab.Screen name="Order" component={OrderScreen}options={{
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