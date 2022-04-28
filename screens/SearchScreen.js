import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image, Alert } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import Constants from 'expo-constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const { ngrokUrl } = Constants.manifest.extra;
const isLocal = ngrokUrl && __DEV__

const productionUrl = 'https://example.com'

const baseUrl = isLocal ? ngrokUrl : productionUrl

const Item = ({ title, img }) => {
    return( 
        <View style={styles.card}>
        <Image style={styles.image} source={{uri: img}}></Image>
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
      );
};
  
const renderItem = ({ item }) => <Item title={item.name} img={item.img} />;

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      searchValue: "",
      originalData: []
    };
    
    //this.searchFunction = this.searchFunction.bind(this);
  }
  
  searchFunction = (text) => {
    const updatedData = this.state.originalData.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    console.log(updatedData);
    this.setState({ data: updatedData, searchValue: text });
  };

  componentDidMount() {
    SecureStore.getItemAsync("FEEDMAMA_TOKEN").then(x => {
      axios.get(`${baseUrl}/restaurants/items`, {
        headers: {
          'Authorization': `JWT ${x}` 
        }
      }).then((resp) => {
        this.setState({ data: resp.data.items, originalData: resp.data.items });
      }).catch((err) => {
        console.log(err);
        Alert.alert('Error', err.response.data.message, [
          { text: 'OK' }
        ]);
      });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList 
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={{
              width: "100%",
              height: "100%",
              marginTop: 20
          }}
        />
      </View>
    );
  }
}
  
export default SearchScreen;
  
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 5,
      },
      row: {
        flex: 1,
        justifyContent: "space-around"
    },
      card:{
        borderRadius: 15,
        backgroundColor: "#ff6c6c",
        marginBottom: "5%",
        overflow: 'hidden',
        flex: .40,
      },
      detailsContainer:{
          padding: 20,
      },
      image:{
          width:"100%",
          height:150
      },
      title:{
          fontSize:14,
          fontFamily: Platform.OS === "iOS" ? "Proxima Nova" : "Helvetica",
          fontWeight:"bold",
          color: "#fff",
          marginLeft: 5
      },
     item: {
        backgroundColor: "#f5f520",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
  },
});