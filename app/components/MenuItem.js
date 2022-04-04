import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import CartScreen from '../../screens/CartScreen';
import addFunction from './CartItem'; 
import CartItem from './CartItem';

function MenuItem({restaurantTitle, title, subtitle}){
    const [value, setValue] = useState(0);

    const incrementValue = () => {
        setValue(value + 1)
        console.log(title+" quantity is "+(value))
    }

    const decrementValue = () => {
        if (value>0){
            setValue(value - 1)
        }
        console.log(title+" quantity is "+(value))
    }

    let props={
        foodItem: title,
        quantity: value
    }

    return (
        <View>
            <Divider width={.75}/>
            <View style={styles.containerHorz}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subtitle}</Text>
                </View>
                <View style={{
                   marginLeft:"60%",
                   flexDirection: 'row', 
                   alignItems: "center"
                }}>
                    <Button onPress={decrementValue} title="-"/>
                    <Text>{value}</Text>
                    <Button onPress={incrementValue} title="+"/>
                </View>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    containerVert: {
        flex: 1,
        marginTop: "25%",
        alignItems: "center",
        },
    containerHorz: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
    },
    detailsContainer:{
        paddingVertical: 10,
        marginLeft: 5,
    },
    title:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        fontWeight:"bold",
        color: "#000",
    },
    subTitle:{
        fontSize:14,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
        color: "#000",
    }
});

export default MenuItem;