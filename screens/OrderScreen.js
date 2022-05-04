import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import Card from '../app/components/Card';

import Constants from 'expo-constants';
import CartItem from '../app/components/CartItem';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

const OrderScreen = ({navigation}) => {

    const [orders, setOrders] = useState([{
      DateTime: "",
      OrderId: "",
      ResturantImg: "",
      ResturantName: "",
    }]);

    useEffect(() => {
      SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
          axios.get(`${baseUrl}/order/previous`, {
              headers: {
              'Authorization': `JWT ${x}` 
              }
          }).then((resp) => {
              setOrders(resp.data)
          }).catch((err) => {
              Alert.alert('Error', err.response.data.message, [
              { text: 'OK' }
              ]);
          });
      })
    }, []);
        
            return (
              <View
              resizeMode= 'contain'>
                <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                  <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
                </View>

                <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                  <View style={styles.centered}>
                      <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold", marginBottom: "5%"}}>Orders</Text>
                  </View>
                <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>

                <ScrollView style={{resizeMode:"repeat", height: "100%"}}>
                    {orders.map(({DateTime, OrderId, ResturantImg, ResturantName}) => (
                        <View style={{
                          backgroundColor: "#f8f4f4",
                          padding: 20,
                          paddingTop: 20,
                          //flex: 3
                        }} key={OrderId}>
                        <TouchableOpacity onPress={() => navigation.navigate("PrevOrder", { OrderID: OrderId })}>
                          <Card
                            title={ResturantName}
                            subtitle={new Date(DateTime).toLocaleString()}
                            image={{uri: ResturantImg}}/>
                        </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
              </View>
            );
        }
        
        const styles = StyleSheet.create({
            containerVert: {
            flex: 1,
            marginTop: "25%",
            alignItems: "center",
            },
            containerHorz: {
            flex: 1,
            flexDirection: 'row',
            marginTop: "10%",
            marginBottom: "5%",
            alignItems: "center",
            },
            input: {
            width: 265,
            height: 30,
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
            centered: {
              justifyContent: "center",
              alignItems: "center"
            },
        });
export default OrderScreen