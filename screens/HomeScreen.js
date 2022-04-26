import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView, Alert } from 'react-native';
import Card from '../app/components/Card';
import Constants from 'expo-constants';
import axios from 'axios';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function HomeScreen({route, navigation}){

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get(`${baseUrl}/restaurants/`).then((resp) => {
        setData(resp.data.items);
        console.log(data)
      }).catch((err) => {
        console.log(err);
        Alert.alert('Error', err.response.data.message, [
          { text: 'OK' }
        ]);
      });
    }, []);
  

    function printRestaurant() {
     //Should be figured out with backend on what to do with acct info
     console.log('Wooh! Should switch to restaurant page list view? - JC');
    }

    return (
        <View
      resizeMode= 'contain'>

        <View style={{
          backgroundColor: "#fff",
          paddingTop: 50,
          alignItems: 'center',
        }}>
          <Image
            source={require("../app/assets/Static/FeedMamaSecLogo.png")}
            resizeMode="contain">
          </Image>

          <View
            style={styles.containerHorz}>
            <ImageBackground
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: "10%"
                  }}
                  source={require("../app/assets/Static/DeliveryOn.png")}
                  resizeMode="center">

              </ImageBackground>
              <ImageBackground
                  style={{
                    width: 80,
                    height: 80
                  }}
                  source={require("../app/assets/Static/PickupOff.png")}
                  resizeMode="center">

              </ImageBackground>

          </View>

          <Divider style={{
            width: "100%",
            height: "5%",
            backgroundColor: "#FF6C6C"
          }}/>
        </View>
        
       <ScrollView style={{
          resizeMode:"repeat"
        }}>
          {data.map((rest, index) => {
              return (
                <View style={{
                  backgroundColor: "#f8f4f4",
                  padding: 20,
                  paddingTop: 20,
                  //flex: 3
                }}>
                  <TouchableOpacity onPress={() => navigation.navigate("RestaurantFlow", { RestaurantID: rest.id })}>
                    <Card
                      title={rest.name}
                      subtitle={rest.description}
                      image={{uri: rest.img}}/>
                  </TouchableOpacity>
                </View>
              )
          })}
          
          <View style={{
            backgroundColor: "#f8f4f4",
            padding: 20,
            paddingTop: 20,
            height: 150
            //flex: 3
          }}>
          </View>
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
    marginTop: "5%",
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
    }
});

export default HomeScreen;