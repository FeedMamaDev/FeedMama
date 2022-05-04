import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, Button, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import BigButton from '../app/components/BigButton';
import { render } from 'react-dom';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

function RestaurantScreen({route, navigation}){

  const { id } = route.params;
  const [meals, setMeals] = useState([{"description": "", "id": "", "max_quantity": 0, "name": "", "price": "0", "quantity": 0, "vegan": false, "vegetarian": false }]);

  const [restaurant, setRestaurant] = useState({ name: "", description: "" });

  useEffect(() => {
    SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {

      axios.get(`${baseUrl}/restaurants/${id}/info`, {
        headers: {
          'Authorization': `JWT ${x}` 
        }
      }).then((resp) => {
        setRestaurant(resp.data)
      }).catch((err) => {
        Alert.alert('Error', err.response.data.message, [
          { text: 'OK' }
        ]);
      });

      axios.get(`${baseUrl}/restaurants/${id}/items`, {
        headers: {
          'Authorization': `JWT ${x}` 
        }
      }).then((resp) => {
        let items = resp.data

        items.forEach(x => x.quantity = 0);
        setMeals(items);
      }).catch((err) => {
        Alert.alert('Error', err.response.data.message, [
          { text: 'OK' }
        ]);
      });
    })
  }, []);

  const styles = StyleSheet.create({
    containerVert: {
    flex: 1,
    marginTop: "25%",
    alignItems: "center",
    },
    containerHorz: {
    flexDirection: 'row',
    marginTop: "10%",
    marginBottom: "5%",
    width: "100%"
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
    restaurantTitle:{
      alignItems:"center",
      marginTop: '18%',
      fontSize:18,
      fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
      fontWeight:"bold",
      color: "#fff",
    }
  });

  function updateQuantity({title, subtitle, quantity, id}){
    for(const i in meals){
      if(meals[i].id==id){
        meals[i].quantity=quantity
        break
      }
    }
  }

  function MenuItem({title,  subtitle, max_quantity, quantity, id, price}){
    const [value, setValue]=useState(quantity);

    const incrementValue = () => {
        if(max_quantity > quantity) {
          setValue(value+1)
        } 
    }
    const decrementValue = () => {
      if(value > 0) {
        setValue(value-1)
      }
    }
    
    quantity=value
    updateQuantity({title, id, quantity})

    return(
        <View>
              <Divider width={.75}/>
              <View style={styles.containerHorz}>
                  <View style={{
                    width:'50%',
                    alignContent:"flex-start"
                  }}>
                      <Text style={styles.title}>{title}</Text>
                      <Text style={{fontWeight: "bold"}}>{price}</Text>
                      <Text style={styles.subTitle}>{subtitle}</Text>
                  </View>
                  <View style={{
                    flexDirection:"row",
                    width:'50%',
                    alignContent:"flex-end",
                    alignItems: "center"
                  }}>
                      <Button onPress={decrementValue} title="-"/>
                      <Text>{value}</Text>
                      <Button onPress={incrementValue} title="+"/>
                  </View>
              </View>
          </View>
    )
  }

  return (
    <View>
      <RestaurantAbout
        image={{uri: restaurant.img}}
        title={restaurant.name}
        subtitle={restaurant.description}
      />
      <Divider style={{
          width: "100%",
          height: 6,
          backgroundColor: "#FF6C6C"
        }}/>
      <ScrollView style={{
        resizeMode:"repeat"
      }}>
        <View style={{
          backgroundColor: "#f8f4f4",
          padding: 10,
          width:'100%'
        }}>
        {meals.map(({ name, description, max_quantity, quantity, id, price }) => (
          <MenuItem title={name} price={"$" + price} subtitle={description} max_quantity={max_quantity} quantity={quantity} id={id} key={id}/>
        ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.push("Cart", {id: id, menuItemDetails: {meals}})} style={{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,}}>
        <ImageBackground
            style={{
              resizeMode: 'contain',
              width: 50,
              height: 50,
            }}
            source={require("../app/assets/Buttons/CartButton.png")}
            resizeMode="contain">
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
  
export default RestaurantScreen;