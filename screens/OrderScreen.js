import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text} from 'react-native';
import { Divider } from 'react-native-elements';
import Card from '../app/components/Card';


const OrderScreen = ({navigation}) => {

        const [restImage, setRestImage] = useState( 
            '../app/assets/Photos/FunkyFreshSpringRolls.jpg'
        );  

        const restHomeSubtitle='04/02/22';
      
        function printItem() {
          //Should be figured out with backend on what to do with acct info
          console.log('Wooh! Selected a menu item - JC');
        }
        
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
                  <View style={{
                    backgroundColor: "#f8f4f4",
                    padding: 20,
                    paddingTop: 20,
                    //flex: 3
                  }}>
                    <TouchableOpacity onPress={() => props.navigation.push("PrevOrder")}>
                      <Card
                        title="Funky Fresh Spring Rolls"
                        subtitle={restHomeSubtitle}
                        image={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}/>
                    </TouchableOpacity>
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