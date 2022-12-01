import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { SearchBar } from "@rneui/themed";
import ItemDeInventario from "../components/ItemDeInventario";
import { Icon, Button } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { products } from "../helpers/devProcuctsData";
import PrintPDF from "../components/PrintPDF";
import ExcelExport from "../components/ExcelExport";

const windowWidth = Dimensions.get("window").width;

const Inventario = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [prod, setProd] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setProd(products.slice(0, 9));
      setTotalPage(Math.ceil(products.length / 9));
    }, [])
  );

  const increment = (p) => {
    setPage(p + 1);
    setProd(products.slice((p + 1) * 10 - 10, (p + 1) * 9));
  };
  const decrement = (p) => {
    setPage(p - 1);
    setProd(products.slice((p - 1) * 10 - 10, (p - 1) * 9));
  };

  const renderItem = ({ item, index }) => {
    return <ItemDeInventario item={item} index={index} />;
  };

  return (
    <View style={styles.viewContainer}>
      <SearchBar
        platform="default"
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.searchInput}
        onChangeText={(value) => setFilter(value)}
        placeholder="Ingrese el nombre del producto"
        placeholderTextColor="#888"
        round
        value={filter}
      />
      <View style={styles.buttonsView}>
        <Button
        onPress={()=>PrintPDF(products)}
          iconPosition="right"
          titleStyle={{ color: "#000", fontSize: 14, paddingLeft: 8 }}
          buttonStyle={{
         
            elevation: 1,
            backgroundColor: "transparent",
            height: 40,
            width: 120,
            borderColor: "#A1D6E2",
            borderWidth: 1,
            borderRadius: 18,
          }}
        >
          Exportar
          <Icon name="chevrons-down" type="feather" />
        </Button>
      </View>

      <ScrollView
        horizontal={true}
        overScrollMode={"never"}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: windowWidth * 2, height: 410 }}
      >
        <FlatList
          ListHeaderComponent={() => (
            <View
              style={styles.headerStyle}
            >
              <Text style={{ marginLeft: 10, flexWrap: "wrap", maxWidth: 100 }}>
                Codigo de Producto
              </Text>
              <Text
                style={{
                  width: windowWidth * 0.4,
                  textAlign: "center",
                }}
              >
                Descripcion
              </Text>
              <Text
                style={{
                  width: windowWidth * 0.2,
                  textAlign: "center",
                }}
              >
                Precio Unitario
              </Text>
              <Text
                style={{
                  width: windowWidth * 0.25,
                  textAlign: "center",
                }}
              >
                Ex. Inicial
              </Text>
              <Text
                style={{
                  width: windowWidth * 0.25,
                  textAlign: "center",
                }}
              >
                Ex. Final
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  width: windowWidth * 0.3,
                  textAlign: "center",
                }}
              >
                Precio Venta
              </Text>
            </View>
          )}
          horizontal={false}
          overScrollMode={"never"}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={filter!==""?products.filter((item) =>
            item.description.toLowerCase().includes(filter.toLowerCase())
          ):prod}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        {page > 1 ? (
          <Icon
            name="chevron-left"
            type="feather"
            onPress={() => decrement(page)}
          />
        ) : null}
        <Text style={{ color: "#A1D6E2" }}>{page}</Text>
        <Text> de</Text>
        <Text> {totalPage} </Text>
        {page !== totalPage ? (
          <Icon
            name="chevron-right"
            type="feather"
            onPress={() => increment(page)}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Inventario;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flatlist: {
    width: "100%",
    height: "80%",
  },
  container: {
    marginTop: 0,
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
  buttonsView: {
    width: "100%",
    height: 50,
    marginBottom: 0,
    paddingHorizontal: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerStyle:{
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#A1D6E2",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
