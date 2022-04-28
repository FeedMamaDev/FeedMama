import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantAbout from '../app/components/RestaurantAbout';
import BigButton from '../app/components/BigButton';
import { render } from 'react-dom';

function RestaurantScreen(props){

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

  const timeEstimate="30-40 min";
  const fee="$2.99 Fee";

  const restaurantImage="../app/assets/Photos/FunkyFreshSpringRolls.jpg";
  const restaurantTitle="Funky Fresh Spring Rolls";
  const restaurantSubtitle=timeEstimate.concat(" | ",fee);
  const menuItemDetails=[
    {title: 'Spring Roll1', subtitle: '$3.00', quantity: 0, id: 0},
    {title: 'Spring Roll2', subtitle: '$3.00', quantity: 0, id: 1},
    {title: 'Spring Roll3', subtitle: '$3.00', quantity: 0, id: 2},
    {title: 'Spring Roll4', subtitle: '$3.00', quantity: 0, id: 3},
    {title: 'Spring Roll5', subtitle: '$3.00', quantity: 0, id: 4},
  ]
  const menu=[
    menuItemDetails.map(({ title, subtitle, quantity, id }) => (
      <MenuItem title={title} subtitle={subtitle} quantity={quantity} id={id} key={id}/>
    ))
  ]

  function updateQuantity({title, subtitle, quantity, id}){
    for(const i in menuItemDetails){
      if(menuItemDetails[i].id==id){
        menuItemDetails[i].quantity=quantity
        break
      }
    }
    console.log("menuItemDetails")
    console.log(menuItemDetails)
    console.log(" ")
  }

  function MenuItem({title,  subtitle, quantity, id}){
    const [value, setValue]=useState(quantity);

    const incrementValue = () => {
        setValue(value+1)
    }
    const decrementValue = () => {
      setValue(value-1)
  }

      const [titleText, setTitleText] = useState("Funky Fresh Spring Rolls :)");
    
    quantity=value
    updateQuantity({title, id, quantity})

    console.log(props);
    return(
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
    )
  }

  return (
    <View>
      <RestaurantAbout
        image={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}
        title={restaurantTitle}
        subtitle={restaurantSubtitle}
      />
      <Divider style={{
          width: "100%",
          height: 6,
          backgroundColor: "#FF6C6C"
        }}/>
      <ScrollView style={{
        resizeMode:"repeat"
      }}>
        <View style={{
          backgroundColor: "#f8f4f4",
          padding: 10,
          width:'100%'
        }}>
            {menu}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => props.navigation.push("Cart", {menuItemDetails: {menuItemDetails}})}>
        <BigButton text="View Cart"/>
      </TouchableOpacity>
    </View>
  );
}
  
export default RestaurantScreen;