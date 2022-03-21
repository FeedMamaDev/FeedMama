import React from 'react';
import { Platform, Text, StyleSheet} from 'react-native';

function AppText({children, style}) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    );
}

const styles=StyleSheet.create({
    text:{
        fontSize:18,
        fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica"
    }
})

export default AppText;