import { FlatList, StyleSheet, View, Text,RefreshControl } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SearchBar } from "@rneui/themed";
import Client from "../components/Client";
import { FAB } from "@rneui/themed";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import { Context } from "../context/ContextProvider";
import { useTheme } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { sortData } from "../helpers/SortData";

const Clients = ({ navigation }) => {
  const { setSpinner, throwError } = useContext(UserContext);
  const { bandera } = useContext(Context);
  const [filter, setFilter] = useState("");
  const [clientes, setClientes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setSpinner(true);
    traerDatos();
    console.log("clientes");
  }, [bandera]);

  const traerDatos = async () => {
    try {
      const array = [];
      const querySnapshot = await getDocs(collection(db, "Clientes"));
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });

      setClientes(array);
      setSpinner(false);
    } catch (e) {
      setSpinner(false);
      throwError(e);
    }
  };

  const refreshClients=async ()=>{
    setRefresh(true)
        await traerDatos()
        setRefresh(false)
  }

  const renderItem = ({ item, index }) => {
    return <Client item={item} index={index} />;
  };

  return (
    <View
      style={[styles.viewContainer, { backgroundColor: colors.background }]}
    >
      <SearchBar
        platform="default"
        containerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        inputContainerStyle={[
          styles.inputContainer,
          { backgroundColor: colors.background },
        ]}
        inputStyle={[
          styles.searchInput,
          { backgroundColor: colors.background },
        ]}
        onChangeText={(value) => setFilter(value)}
        placeholder="Ingrese el nombre del cliente"
        placeholderTextColor={colors.text}
        round
        value={filter}
      />

      <FlatList
        refreshControl={<RefreshControl
          colors={[ colors.primary]}
          refreshing={refresh}
          onRefresh={()=>refreshClients()} />}
        overScrollMode={"never"}
        style={styles.flatlist}
        data={
          clientes.length !== 0
            ? sortData(clientes).filter(
                (client) =>
                  client.firstName
                    .toLowerCase()
                    .includes(filter.toLocaleLowerCase()) ||
                  client.lastName
                    .toLowerCase()
                    .includes(filter.toLocaleLowerCase())
              )
            : clientes
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text
            style={{ color: colors.text, width: "100%", textAlign: "center" }}
          >
            No se encontraron coincidencias
          </Text>
        )}
      />
      <FAB
        visible={true}
        icon={{ name: "add", color: colors.text }}
        color={colors.primary}
        placement="right"
        onPress={() => navigation.navigate("NewClient")}
      />
    </View>
  );
};

export default Clients;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
  },
  flatlist: {
    width: "100%",
  },
  container: {
    marginVertical: 10,
    width: "95%",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    textAlign: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomWidth: 1,
  },
});
