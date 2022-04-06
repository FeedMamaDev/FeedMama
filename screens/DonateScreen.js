import React, {useState} from 'react'
import { View, Text, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';





const DonateScreen = ({navigation}) => {

    function updateDonation(input, current) {
        console.log(input);
        if(input === "0" & current === "0"){ //Initial value
            return "0";
        }
        else if(input === "delete"){
            return "delete";
        }
        else{
            return current + input;
        }
    }

    var Donation = updateDonation("0","0")
    return (
        <View style={{backgroundColor: "#fff", paddingTop: 50, alignItems: 'center'}}>
            <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            <Text style= {{fontSize: 40, marginTop: "5%", marginBottom: "2%"}}>Donate</Text>
            <View style={{backgroundColor: "#FF6C6C", height: "80%", width: "100%"}}> 
                <Text style={{color: "white", fontSize:80, marginTop: 10}}>${Donation}</Text>
                <View style={styles.containerHorz}>
                    <TouchableOpacity style={{marginRight: "7.5%"}} onPress={() => Donation = updateDonation("1", {Donation})}>
                        <Text style={styles.dimmer}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: "7.5%", marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>2</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{marginLeft: "7.5%"}}>
                        <Text style={styles.dimmer}>3</Text>
                    </TouchableOpacity>     
                </View>
                <View style={styles.containerHorz}>
                    <TouchableOpacity style={{marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: "7.5%", marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>5</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{marginLeft: "7.5%"}}>
                        <Text style={styles.dimmer}>6</Text>
                    </TouchableOpacity>     
                </View>
                <View style={styles.containerHorz}>
                    <TouchableOpacity style={{marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: "7.5%", marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>8</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{marginLeft: "7.5%"}}>
                        <Text style={styles.dimmer}>9</Text>
                    </TouchableOpacity>     
                </View>
                <View style={styles.containerHorz}>
                    <TouchableOpacity style={{marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: "7.5%", marginRight: "7.5%"}}>
                        <Text style={styles.dimmer}>0</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{marginLeft: "7.5%"}}>
                    <Image source={require("../app/assets/Buttons/DeleteButton.png")} resizeMode="contain"/>
                    </TouchableOpacity>     
                </View>
            </View>
        </View>
    )
}

export default DonateScreen

const styles = StyleSheet.create({
    containerHorz: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: "15%",
        marginRight: "15%",
        alignItems: "center",
    },
    dimmer: {
        opacity: 75,
        color: "white",
        fontSize: 50,
    }
});