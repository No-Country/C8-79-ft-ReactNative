import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import { SearchBar } from "@rneui/themed";
import ItemDeInventario from "../components/ItemDeInventario";
import { Icon, Button } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { products } from "../helpers/devProcuctsData";
import PrintPDF from "../components/PrintPDF";
import ExcelExport from "../components/ExcelExport";
import PopUp from "../components/PopUp";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";

const windowWidth = Dimensions.get("window").width;

const Inventario = () => {
  const { colors } = useTheme();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [prod, setProd] = useState([]);
  const [popup, setPopup] = useState(false);
  const [productos, setProductos] = useState([]);


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
  }, []);


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

  const exportDetail = () => {
    setPopup(true);
  };

  const confirmationExport = (remove, format = null) => {
    remove
      ? (setPopup(false),
        format === "PDF" ? PrintPDF(productos) : ExcelExport(productos))
      : setPopup(false);
  };

  const renderItem = ({ item, index }) => {
    return <ItemDeInventario item={item} index={index} />;
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
        placeholder="Ingrese el nombre del producto"
        placeholderTextColor={colors.text}
        round
        value={filter}
      />
      <View style={styles.buttonsView}>
        <Button
          onPress={() => exportDetail(productos)}
          iconPosition="right"
          titleStyle={{ color: colors.text, fontSize: 14, paddingLeft: 8 }}
          buttonStyle={{
            elevation: 0,
            backgroundColor: "transparent",
            height: 40,
            width: 120,
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 18,
          }}
        >
          Exportar
          <Icon color={colors.text} name="chevrons-down" type="feather" />
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
              style={[styles.headerStyle, { backgroundColor: colors.primary }]}
            >
              <Text
                style={{
                  marginLeft: 10,
                  flexWrap: "wrap",
                  maxWidth: 100,
                  color: colors.text,
                }}
              >
                Codigo de Producto
              </Text>
              <Text
                style={{
                  color: colors.text,
                  width: windowWidth * 0.4,
                  textAlign: "center",
                }}
              >
                Descripcion
              </Text>
              <Text
                style={{
                  color: colors.text,
                  width: windowWidth * 0.2,
                  textAlign: "center",
                }}
              >
                Precio Unitario
              </Text>
              <Text
                style={{
                  color: colors.text,
                  width: windowWidth * 0.25,
                  textAlign: "center",
                }}
              >
                Stock
              </Text>
              
              <Text
                style={{
                  color: colors.text,
                  marginRight: 10,
                  width: windowWidth * 0.3,
                  textAlign: "center",
                }}
              >
                Precio Venta
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <ActivityIndicator
              style={{ marginTop: 200 }}
              size="large"
              color={colors.primary}
            />
          )}
          horizontal={false}
          overScrollMode={"never"}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            filter !== ""
              ? productos.filter((item) =>
                  item.nombre.toLowerCase().includes(filter.toLowerCase())
                )
              : productos
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.codigo}
          renderItem={renderItem}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 30,
        }}
      >
        {page > 1 ? (
          <Icon
            color={colors.text}
            name="chevron-left"
            type="feather"
            onPress={() => decrement(page)}
          />
        ) : null}
        <Text style={{ color: colors.text }}>
          {page} de {totalPage}{" "}
        </Text>

        {page !== totalPage ? (
          <Icon
            color={colors.text}
            name="chevron-right"
            type="feather"
            onPress={() => increment(page)}
          />
        ) : null}
      </View>

      <PopUp
        visibility={popup}
        message={"Selecciona el formato para exportar"}
        child={
          <View style={[styles.buttonContainer]}>
            <View style={styles.buttonHeader}>
              <Button
                titleStyle={[styles.buttonText, { color: colors.text }]}
                buttonStyle={[
                  styles.buttonDialog,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => confirmationExport(true, "PDF")}
              >
                PDF
              </Button>
              <Button
                titleStyle={[styles.buttonText, { color: colors.text }]}
                buttonStyle={[
                  styles.buttonDialog,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => confirmationExport(true, "XLS")}
              >
                XLS
              </Button>
            </View>
            <Button
              titleStyle={[styles.buttonText, { color: colors.text }]}
              buttonStyle={[
                styles.buttonBottom,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => confirmationExport(false)}
            >
              CANCELAR
            </Button>
          </View>
        }
      />
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
    marginTop: 10,
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
    marginBottom: 10,
    paddingHorizontal: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#A1D6E2",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonDialog: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: 100,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonBottom: {
    borderRadius: 20,
    height: 50,
    marginTop: 20,
  },
});
