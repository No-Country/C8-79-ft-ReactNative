import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useCallback } from "react";
import { SearchBar } from "@rneui/themed";
import ItemDeInventario from "../components/ItemDeInventario";
import { Icon, Button } from "@rneui/themed";
import PrintPDF from "../components/PrintPDF";
import ExcelExport from "../components/ExcelExport";
import PopUp from "../components/PopUp";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import UserContext from "../context/UserContext";
import { TouchableOpacity } from "react-native";
import { inventoryhtml } from "../helpers/formatReportHTML";

const windowWidth = Dimensions.get("window").width;

const Inventario = () => {
  const { setSpinner, throwError } = useContext(UserContext);
  const { colors } = useTheme();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [prod, setProd] = useState([]);
  const [popup, setPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [hide, setHide] = useState(false)

  const traerDatos = async () => {
    try {
      const array = [];
      const querySnapshot = await getDocs(collection(db, "Productos"));
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setProducts(array);
      pagination(array);
      setSpinner(false);
    } catch (error) {
      throwError(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSpinner(true);
      traerDatos();

     
    }, [])
  );

  const pagination = (arr) => {
    setProd(arr.slice(0, 9));
    setTotalPage(Math.ceil(arr.length / 9));
    //console.log("p", totalPage);
  };

  const increment = () => {
    setPage((prev) => prev + 1);
    setProd(products.slice((page + 1) * 10 - 11, (page + 1) * 9));
  };
  const decrement = (p) => {
    setPage((prev) => prev - 1);
    setProd(products.slice((page - 1) * 10 - 10, (page - 1) * 9));
  };

  const exportDetail = () => {
    setPopup(true);
  };

  const confirmationExport = (remove, format = null) => {

    remove
      ? (setPopup(false),
        format === "PDF" ? PrintPDF(inventoryhtml(products)) : ExcelExport(products))
      : setPopup(false)
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
        onFocus={()=>setHide(true)}
        onBlur={()=>setHide(false)}
        value={filter}
      />
      <View style={styles.buttonsView}>
        <Button
          onPress={() => exportDetail(products)}
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
        contentContainerStyle={{ width: windowWidth * 2, height: "100%" }}
      >
        <FlatList
          ListHeaderComponent={() => (
            <View
              style={[styles.headerStyle, { backgroundColor: colors.primary }]}
            >
              <Text
                style={{
                  textAlign:"center",
                  fontSize: 18,
                  fontWeight: "bold",
                  flexWrap: "wrap",
                 width: (windowWidth * 2)/5,
                  color: colors.text,
                }}
              >
                Codigo de Producto
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text,
               width: (windowWidth * 2)/5,
                  textAlign: "center",
                }}
              >
              Nombre
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text,
                  width: (windowWidth * 2)/5,
                  textAlign: "center",
                }}
              >
                Stock
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text,
                  width: (windowWidth * 2)/5,
                  textAlign: "center",
                }}
              >
                Precio Unitario
              </Text>
             

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text,
                width:(windowWidth * 2)/5,
                  textAlign: "center",
                }}
              >
                Precio Venta
              </Text>
              
            </View>
            
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: colors.text,
                width: "50%",
                textAlign: "center",
                marginTop: 50,
              }}
            >
              No se encontraron coincidencias
            </Text>
          )}
          horizontal={false}
          overScrollMode={"never"}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            filter !== ""
              ? products.filter((item) =>
                  item.nombre.toLowerCase().includes(filter.toLowerCase())
                )
              : prod
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
          reverse
            color={colors.primary}
            name="chevron-left"
            type="feather"
            onPress={() => decrement()}
          />
        ) : <Icon
        reverse
        color={"transparent"}
          name="chevron-left"
          type="feather"
         disabledStyle={{display:"none"}}
         disabled
         
        />}
       
        <Text style={{ color: colors.text,alignSelf:"center", }}>
          {page} de {totalPage}
        </Text>

        {page !== totalPage ? (
          
            <Icon
            reverse
              color={colors.primary}
              name="chevron-right"
              type="feather"
              onPress={() => increment()}
            
            />
         
        ) :   <Icon
        reverse
          color={"transparent"}
          name="chevron-right"
          type="feather"
          disabledStyle={{display:"none"}}
          disabled
        
        
        />}

       
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

    flexDirection: "row",
   
    height: 50,
    
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
