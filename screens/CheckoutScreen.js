import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView , Text} from 'react-native';

const timeEstimate="30-40 min";
const fee="$2.99 Fee";

const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
const restaurantTitle="Funky Fresh Spring Rolls";
const restaurantSubtitle=timeEstimate.concat(" | ",fee);

function CheckoutScreen(props) {
    return (
        <View>
            <View style={styles.containerHorz}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{restaurantTitle}</Text>
                    <Text style={styles.subTitle}>{restaurantSubtitle}</Text>
                </View>
                <View style={{
                    marginTop:25,
                   marginLeft:"60%",
                   flexDirection: 'row', 
                   alignItems: "center"
                }}>
                    <Text>{restaurantTitle}</Text>
                </View>
            </View>
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
    restaurantTitle:{
      alignItems:"center",
      marginTop: '18%',
      fontSize:18,
      fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
      fontWeight:"bold",
      color: "#fff",
    }
});
export default CheckoutScreen;