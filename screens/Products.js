import { FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { SearchBar } from "@rneui/themed";
import { FAB, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import { Context } from "../context/ContextProvider";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import Product from "../components/Product";
import { Dimensions } from "react-native";

const sortProductos = (array) =>{
  return array.sort()
}
const Products = () => {
  const window = Dimensions.get("screen");
  const { bandera } = useContext(Context);
  const [filter, setFilter] = useState("");
  const [click, setClick] = useState(null);
  const [productos, setProductos] = useState([]);
  const { colors } = useTheme();

  const navigation=useNavigation()

  const traerDatos = async () => {
    const array = [];
    const querySnapshot = await getDocs(collection(db, "Productos"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });

    setProductos(array);
    
  };

  useEffect(() => {
    traerDatos();
    console.log(productos)
  }, [bandera]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setClick(null);
      };
    }, [])
  );

  const renderItem = ({ item, index }) => {
    return (
      <Product
        item={item}
        isPress={() => setClick(index)}
        index={index}
        textColor={index === click ? "#A1D6E2" : colors.text}
        //fontSz={index === click ? 22 : 20}
       
      />
    );
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
        placeholder="Ingrese el nombre del Producto"
        placeholderTextColor={'#BCBABB'}
        round
        value={filter}
        
      />
        <View style={[styles.encabezado,{width: "100%"}  ]}>
          <Text style={styles.title}>Nombre</Text>
          <Text style={styles.title}>Cantidad</Text>
          <Text style={styles.title}>Precio</Text>
        </View>
        
      

      <FlatList
        removeClippedSubviews={true}
        overScrollMode={"never"}
        style={styles.flatlist}
        data={productos          // sortData(productos).filter((producto) =>
          // producto.nombre.toLowerCase().includes(filter.toLocaleLowerCase()))
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,i) => item.codigo}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <ActivityIndicator
            style={{ marginTop: 200 }}
            size="large"
            color={colors.primary}
          />
        )}
      />
      <FAB
        visible={true}
        icon={{ name: "add", color: colors.text }}
        color={colors.primary}
        placement="right"
        onPress={() => navigation.navigate("NewProduct")}
      />
    </View>
  );
};

export default Products;

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
    fontSize: 16,
    
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: "#BCBABB",
    borderWidth: 1,
    borderBottomColor: "#BCBABB",
    borderBottomWidth: 1,
  },
  encabezado: {
    height: 50,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#D4d4d9",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    


  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  }
});
