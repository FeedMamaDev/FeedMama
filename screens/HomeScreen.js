import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Card from '../app/components/Card';

function HomeScreen(props){

    let timeEstimate="30-40 min";
    let fee="$2.99 Fee";
    let restHomeSubtitle=timeEstimate.concat(" | ",fee);

    function printRestaurant() {
     //Should be figured out with backend on what to do with acct info
     console.log('Wooh! Should switch to restaurant page list view? - JC');
    }

    return (
        <View
      resizeMode= 'contain'
    >
      <View style={{
        backgroundColor: "#fff",
        paddingTop: 50,
        alignItems: 'center',
        //flex: 1
      }}>
        <Image
          source={require("../app/assets/Static/FeedMamaSecLogo.png")}
          resizeMode="contain"
        ></Image>
        <View style={{
          backgroundColor: "#f8f4f4"
        }}/>
      </View>
      <View style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        paddingTop: 20,
        //flex: 3
      }}>
        <TouchableOpacity onPress={() => printRestaurant()}>
          <Card
            title="Funky Fresh Spring Rolls"
            subtitle={restHomeSubtitle}
            image={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}/>
        </TouchableOpacity>
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
    marginTop: "25%",
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