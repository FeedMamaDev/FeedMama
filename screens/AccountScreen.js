import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

function AccountScreen(props){
    
    return(
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>

            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
            <View style={styles.centered}>
                <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold", marginBottom: "5%"}}>Account</Text>
            </View>

            <View style={styles.centered}>
                    <Text>Baby on the way? Join our program</Text>
                    <Text>that feeds mothers at no cost!</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("MotherEnrollment")}>
                        <Image style={{height: 70, width: 150}} source={require("../app/assets/Buttons/JoinButton.png")} resizeMode="contain"/>
                    </TouchableOpacity>
            </View>



                <View style={styles.viewBar}>
                    <Text style={{marginLeft: 10, color: "white"}}>Profile</Text>
                </View>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("GeneralSettings")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>General Settings</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("UpdatePassword")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Update Password</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("WalletPage")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Wallet</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("ChangeAddress")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Change Address</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("NotificationSettings")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Notifications</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.viewBar}>
                    <Text style={{marginLeft: 10, color: "white"}}>Verification</Text>
                </View>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("VerificationStatus")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Check Mother Verification Status</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.viewBar}>
                    <Text style={{marginLeft: 10, color: "white"}}>Support</Text>
                </View>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("Privacy")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Privacy Policy</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("ContactUsScreen")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Contact Us</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: "100%"}} onPress={() => props.navigation.navigate("LogOutScreen")}>
                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, flexDirection:'row', justifyContent : 'space-between'}}>
                        <Text>Log Out</Text>
                        <Text style={{marginRight: 10}}>{">"}</Text>
                    </View>
                    <View style={{backgroundColor: "black", height: 1}}></View>
                </TouchableOpacity>

        </View>
  
    );
  }

const styles = StyleSheet.create({
    viewBar: {
        width: "100%", 
        height: 20, 
        backgroundColor: "#FF6C6C", 
    },
    sideBySide: {
        flexDirection:'row',
        justifyContent : 'space-between', 
        marginLeft: "5%", 
        marginRight: "5%"
    },
    containerHorz: {
      flex: 1,
      flexDirection: 'row',
      marginTop: "25%",
      alignItems: "center",
    },
    centered: {
      justifyContent: "center",
      alignItems: "center"
    },
    moreLeft: {
        marginLeft: "7%", 
        marginTop: "5%",
    },
    logo: {
      width: 200,
      height: 200,
      marginTop: "30%",
      marginBottom: "-50%",
    },
    primaryButton: {
      width: 200,
      height: 60,
      marginTop: "5%",
    }
  });
  
  export default AccountScreen;