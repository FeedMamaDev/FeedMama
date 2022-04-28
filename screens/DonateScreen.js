import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

import CalcKeys from "../app/components/CalcKeys.js";

export default class DonateScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display:"",
      numerator:"",
      denominator:"", 
      operator:"",
      switchFractionSection:false
    }
  }
  
  addNumber(x){
    //show the number clicked on the display. IF this is the first number saved it is save as the denominator If this is the second number enter, it is saved as the numerator.  
    this.setState((state, props) => ({ display: state.display + x }))    
    if(this.state.switchFractionSection ==true){
      this.setState((state, props) =>({denominator:state.denominator + x}))
    }else{
      this.setState((state, props) => ({numerator:state.numerator + x}))
    }
  }

  clear(){
    this.setState((state, props) => ({ display:""}));  
  }

  render() {
    return (
        <View>
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <Image source={require("../app/assets/Static/FeedMamaSecLogo.png")} resizeMode="contain"/>
            </View>

            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>
                <View style={styles.centered}>
                    <Text style={{fontSize: 36, marginTop: "5%", fontWeight: "bold", marginBottom: 10}}>Donate</Text>
                </View>
            <Divider style={{width: "100%", height: 6, backgroundColor: "#FF6C6C", marginTop: "5%"}}/>

            <View style={styles.containerCalc}>
                <View style={styles.display}>
                    <Text style={styles.title}>{this.state.display}</Text>
                </View>
                <View style={styles.calcKeyRow}>
                    <CalcKeys displayKey="1" onClick={()=> this.addNumber("1")} />
                    <CalcKeys displayKey="2" onClick={()=> this.addNumber("2")} />
                    <CalcKeys displayKey="3" onClick={()=> this.addNumber("3")} />
                </View>
                <View style={styles.calcKeyRow}>
                    <CalcKeys displayKey="4" onClick={()=> this.addNumber("4")} />
                    <CalcKeys displayKey="5" onClick={()=> this.addNumber("5")} />
                    <CalcKeys displayKey="6" onClick={()=> this.addNumber("6")} />
                </View>
                <View style={styles.calcKeyRow}>
                    <CalcKeys displayKey="7" onClick={()=> this.addNumber("7")} />
                    <CalcKeys displayKey="8" onClick={()=> this.addNumber("8")} />
                    <CalcKeys displayKey="9" onClick={()=> this.addNumber("9")} />
                </View>
                <View style={styles.calcKeyRow}>
                    <CalcKeys displayKey="." onClick={()=> this.addNumber(".")} />
                    <CalcKeys displayKey="0" onClick={()=> this.addNumber("0")} />
                    <CalcKeys onClick={()=> this.clear()} displayKey="Clear" />
                </View>
            </View>

            <TouchableOpacity style={styles.centered}>
                <Text>[Credit Card]</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.centered}>
                <Image source={require("../app/assets/Buttons/DonateButton.png")} resizeMode="contain"/> 
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCalc: {
    backgroundColor:"#FF6C6C",
    height:"60%",
    alignItems: 'center',
    justifyContent:"space-around",
  },
    
  display:{
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    marginHorizontal:"25%"
  },
    
  calcKeyRow:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    width:"100%",
  },

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
    justifyContent: "center",
    alignItems: "center"
    },
    signUpTitle: {
    marginTop: "20%",
    marginBottom: "5%"
    },
    centered: {
        marginTop: 5,
      justifyContent: "center",
      alignItems: "center"
    },
});