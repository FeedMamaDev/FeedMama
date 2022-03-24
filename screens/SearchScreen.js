import React, {Component}  from 'react';
import{ StyleSheet, Text, View, FlatList, Image } from 'react-native';

import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";

const DATA = [
  {
    id:"1",
    title:"Funky Fresh 1"
  },
  {
    id:"2",
    title:"Funky Fresh 2"
  },
  {
    id:"3",
    title:"Funky Fresh 3"
  },
  {
    id:"4",
    title:"Funky Fresh 4"
  },
];
  
const Item = ({title}) => {
  return( 
    <View style={styles.card}>
    <Image style={styles.image} source={require("../app/assets/Photos/FunkyFreshSpringRolls.jpg")}></Image>
    <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
    </View>
</View>
  );
}

const renderItem = ({item})=>( 
  <View style={{
    marginRight: "3%",
    marginLeft: "3%",
    marginBottom: "5%"
  }}>
    <Item title={item.title}/>
  </View>
  
);

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

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
       <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
        </View>
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
  card:{
    borderRadius: 15,
    backgroundColor: "#ff6c6c",
    marginBottom: "5%",
    overflow: 'hidden'
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
  containerHorz: {
    flex: 1,
    flexDirection: 'row',
    marginTop: "5%",
    marginBottom: "5%",
    alignItems: "center",
  },
});