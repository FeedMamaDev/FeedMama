import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class CalcKeys extends Component{
    render(){
      return(
          <View style={styles.calcKey}>
              <TouchableOpacity onPress={()=>{this.props.onClick()}}>
                  <Text style={styles.textDisplay}>{this.props.displayKey}</Text>
              </TouchableOpacity>
          </View>
      );
    }
}

const styles = StyleSheet.create({
  calcKey:{
    flex:.25
  },
    
  textDisplay:{
    color:"white",
    textAlign:"center",
    fontSize:36,         
  }
    
});