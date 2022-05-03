import {KeyboardAvoidingView, Platform, StyleSheet, View, TouchableOpacity, ImageBackground, Image, Text, Switch, Alert} from 'react-native';
import {CardNumberTextInput, CardDateTextInput, CardCVVTextInput, CardZIPTextInput} from "../node_modules/rn-credit-card-textinput/src/index";
import {useState} from "react";
import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__
const productionUrl = 'https://example.com'
const baseUrl = isLocal ? ngrokUrl : productionUrl

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    } else {
      return ""
    }
}
function AddCard(props){

    const userID = "0d174b64-211f-44e7-bf1a-6bc6c871fa48"; //getValueFor("FEEDMAMA_TOKEN");
    const [cardValue, setCardValue] = useState('');
    const [focusCardNum, setFocusCardNum] = useState(false);

    const [cardDateValue, setCardDateValue] = useState('');
    const [focusCardDateNum, setFocusCardDateNum] = useState(false);

    const [cardCVVValue, setCardCVVValue] = useState('');
    const [focusCardCVVNum, setFocusCardCVVNum] = useState(false);

    const [cardZIPValue, setCardZIPValue] = useState('');
    const [focusCardZIPNum, setFocusCardZIPNum] = useState(false);

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function updateText(cardNum){
      setCardValue(cardNum)
    }

    function updateCardDate(cardNum){
      setCardDateValue(cardNum)
    }

    function updateCardCVV(cardNum){
      setCardCVVValue(cardNum)
    }

    function updateCardZIP(cardNum){
      setCardZIPValue(cardNum)
    }


    function insertCard(){
      axios.post(`${baseUrl}/user/insertCard`, {
          Value: cardValue,
          Date: cardDateValue,
          CVV: cardCVVValue,
          ZIP: cardZIPValue,
          Primary: isEnabled,
          userID: userID
        }).then((resp) => {
            console.log(resp)
          Alert.alert('Card Added', 'Card added successfully!.', [
            { text: 'OK', onPress: () => { props.navigation.navigate("Account")} },
          ]);
        }).catch((err) => {
          Alert.alert('Error', err.response.data.message, [
            { text: 'OK' }
          ]);
        });
    }

    function printOutput(){
      console.log("Card Value: ", cardValue.length)
      console.log("Focus Card Num: ", focusCardNum)
      console.log("Card Date Value: ", cardDateValue)
      console.log("Focus Card Date Num: ", focusCardDateNum)
      console.log("Card CVV Value: ", cardCVVValue)
      console.log("Focus Card Date Num: ", focusCardCVVNum)
      console.log("Card ZIP Value: ", cardZIPValue)
      console.log("Focus Card ZIP Num: ", focusCardZIPNum)
      console.log(isEnabled)
      let today = new Date();
      console.log('0', today.getMonth() + 1, '/', today.getFullYear())

    }

  return(
    
    <View style={styles.container}>
      <KeyboardAvoidingView    behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
          width: '90%',
      }}>
                <CardNumberTextInput errorColor={"red"}
                                 labelColor={"#ddd"}
                                 focusColor={"#1c32a0"}
                                 defaultBorderColor={"#ddd"}
                                 placeholder={"Card number"}
                                 label={"Card Number"}
                                 focus={focusCardNum}
                                 touched={true}
                                 updateTextVal={(t) => {
                                     updateText(t)
                                 }}

                                 onFocus={() => setFocusCardNum(true)}
                                 labelStyle={{
                                     color: '#333',
                                     fontWeight: '400'
                                 }}
                                 inputWrapStyle={{
                                     borderRadius: 10,
                                     borderWidth: 1,

                                 }}
                                 placeholderTextColor={"#ccc"}
                                 value={cardValue}
                                 defaultValue={cardValue}
                                 inputStyle={{
                                     color: '#333',
                                     fontWeight: 'bold',
                                 }} />
                <View style={{flexDirection:"row"}}>
                  <View>
                    <CardDateTextInput errorColor={"red"}
                                    labelColor={"#ddd"}
                                    focusColor={"#1c32a0"}
                                    defaultBorderColor={"#ddd"}
                                    placeholder={"MM/YY"}
                                    label={"Expiry date"}
                                    focus={focusCardDateNum}
                                  updateCardDateText={(t) => {
                                        updateCardDate(t)
                                    }}
                                    onFocus={() => setFocusCardDateNum(true)}
                                    labelStyle={{
                                        color: '#333',
                                        fontWeight: '400'
                                    }}
                                    inputWrapStyle={{
                                        borderRadius: 10,
                                        borderWidth: 1,
                                    }}
                                    placeholderTextColor={"#ccc"}
                                    value={cardDateValue}
                                    defaultValue={cardDateValue}
                                    inputStyle={{
                                        color: '#333',
                                        fontWeight: 'bold',
                                    }} />
                  </View>
                  
                  <View style={{marginLeft: "20%"}}>
                    <CardCVVTextInput errorColor={"red"}
                                      labelColor={"#ddd"}
                                      focusColor={"#1c32a0"}
                                      defaultBorderColor={"#ddd"}
                                      placeholder={"123"}
                                      label={"CVV"}
                                      focus={focusCardCVVNum}
                                      updateCardCVVText={(t) => {
                                            updateCardCVV(t)
                                      }}
                                      onFocus={() => setFocusCardCVVNum(true)}
                                      labelStyle={{
                                          color: '#333',
                                          fontWeight: '400'
                                      }}
                                      inputWrapStyle={{
                                          borderRadius: 10,
                                          borderWidth: 1,

                                      }}
                                      placeholderTextColor={"#ccc"}
                                      value={cardCVVValue}
                                      defaultValue={cardCVVValue}
                                      inputStyle={{
                                        color: '#333',
                                        fontWeight: 'bold',
                                      }} />
                </View>
              </View>
              <View style={{flexDirection:"row"}}>
                <View>
                  <CardZIPTextInput errorColor={"red"}
                                  labelColor={"#ddd"}
                                  focusColor={"#1c32a0"}
                                  defaultBorderColor={"#ddd"}
                                  placeholder={"12345"}
                                  label={"ZIP Code"}
                                  focus={focusCardZIPNum}
                                  updateCardZIPText={(t) => {
                                      updateCardZIP(t)
                                  }}
                                  onFocus={() => setFocusCardZIPNum(true)}
                                  labelStyle={{
                                      color: '#333',
                                      fontWeight: '400'
                                  }}
                                  inputWrapStyle={{
                                      borderRadius: 10,
                                      borderWidth: 1,

                                  }}
                                  placeholderTextColor={"#ccc"}
                                  value={cardZIPValue}
                                  defaultValue={cardZIPValue}
                                  inputStyle={{
                                    color: '#333',
                                    fontWeight: 'bold',
                                  }} />
                </View>
                <View style={{marginLeft: "20%"}}>
                    <Text style={{marginBottom: 20}}>Set as Main Card?</Text>          
                    <Switch style={{marginLeft: "20%"}}
                      trackColor={{ false: "#767577", true: "#FF6C6C" }}
                      thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                </View>
              </View>
              
                
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => insertCard()}>
            <ImageBackground
              style={styles.primaryButton}
              source={require("../app/assets/Buttons/LoginButton-White.png")}
              resizeMode="contain">
            </ImageBackground>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width:'100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  primaryButton: {
    width: 200,
    height: 60,
    marginTop: "5%",
}
});

export default AddCard