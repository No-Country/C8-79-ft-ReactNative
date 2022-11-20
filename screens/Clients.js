import {FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState,useCallback} from "react";
import { SearchBar } from "@rneui/themed";
import { clients } from "../helpers/devData";
import Client from "../components/Client";
import { FAB ,Icon} from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native'


const sortData = (arr) => {
  const sortedArray = arr.sort(function (a, b) {
    if (a.Nombre.toLowerCase() < b.Nombre.toLowerCase()) {
      return -1;
    }
    if (a.Nombre.toLowerCase() > b.Nombre.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
}

const Clients = ({navigation}) => {


  const [filter, setFilter] = useState("");
  const [click, setClick] = useState(null);

  useFocusEffect(
    useCallback(() => {
   
      return () => {
        setClick(null)
      
      };
    }, [])
  );
  
const renderItem=({ item, index }) => {
  return (
    <Client
      item={item}
      isPress={() => setClick(index)}
      index={index}
      textColor = {index === click? "#A1D6E2":"#000"}
      fontSz={index === click? 22:20}
    />
  );
}
  return (
    <View style={styles.viewContainer}>
      <SearchBar
        platform="default"
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.searchInput}
        onChangeText={(value) => setFilter(value)}
        placeholder="Ingrese el nombre del cliente"
        placeholderTextColor="#888"
        round
        value={filter}
      />

      <FlatList
       removeClippedSubviews={true} // Unmount components when outside of window 
    
     
        overScrollMode={"never"}
        style={styles.flatlist}
        data={sortData(clients).filter(
          (client) =>
            client.Nombre.toLowerCase().includes(filter.toLocaleLowerCase()) ||
            client.Apellido.toLowerCase().includes(filter.toLocaleLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        
      />
      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        color="#A1D6E2"
        placement="right"
        onPress={()=>navigation.navigate("NewClient")}
        
      />
    </View>
  );
};

export default Clients;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flatlist: {
    width: "100%",
  },
  container: {
    marginVertical: 10,
    width: "95%",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    textAlign: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: "#BCBABB",
    borderWidth: 1,
    borderBottomColor: "#BCBABB",
    borderBottomWidth: 1,
  },

});
