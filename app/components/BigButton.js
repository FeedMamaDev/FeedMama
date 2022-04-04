import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';

function BigButton({text}) {
    return (
        <View style={{
            flex:1,
            alignItems:"center",
            flexDirection: "row",
            position: "absolute",
            bottom:30,
            zIndex: 999
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%"
            }}>
                <View style={{
                    marginTop:20,
                    backgroundColor: "#FF6C6C",
                    alignItems:"center",
                    padding:13,
                    borderRadius:30,
                    width:250,
                    position:"relative"
                }}>
                    <Text style={{color: "#fff", fontSize: 20}}>{text}</Text>
                </View>
            </View>
        </View>
    );
}

export default BigButton;