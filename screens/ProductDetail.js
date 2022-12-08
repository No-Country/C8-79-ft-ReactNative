import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { ButtonGroup, Icon, FAB, Avatar, Button } from "@rneui/themed";
import PopUp from "../components/PopUp";
import PopUpInfo from "../components/PopUpInfo";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Config";
import { Context } from "../context/ContextProvider";
import { useTheme } from "@react-navigation/native";
import { NewProductForm } from "../components/form/NewProductForm";
import { useNavigation } from "@react-navigation/native";

export const ProductDetail = ( {route} ) => {
const navigation=useNavigation()

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const {handleBandera, bandera} = useContext(Context)
  const product = route.params;


  const {colors}=useTheme()

  const deleteProduct = (product) => {
    console.log("Intenta BORRAR " + product.nombre );
    setDeletePopUp(true);
  };



  const confirmationDelete = async (remove, product) => {
    remove
      ? (console.log("BORRAR " + product.nombre),
        await deleteDoc(doc(db, "Productos", product.codigo)),
        handleBandera(),
        setDeletePopUp(false),
        setDeleted(true),
        setTimeout(() => {
          setDeleted(false), navigation.navigate("ProductsScreen");
        }, 2000))
      : (console.log("NO BORRAR " + product.nombre), setDeletePopUp(false));
  };


  return (
    <View style={[styles.container,{backgroundColor: colors.background,}]}>
      <FAB
        visible={true}
        onPress={() => navigation.navigate("EditProduct", product)}
        style={{ position: "absolute", right: 15, top: 10 }}
        icon={{ name: "edit", color: colors.text }}
        color={colors.button}
        titleStyle={{ color: colors.text }}
      />
    
      <Text style={[styles.name,{color:colors.text}]}>
        { product.nombre }
      </Text>

      <View style={[styles.information,{borderColor: colors.primary,}]}>
        <View style={styles.itemInfo}>
          <Text style={[styles.text,{color:colors.text}]}>Nombre: </Text>
          <Text style={[styles.value,{color:colors.text}]}>
            { product.nombre }
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.text,{color:colors.text}]}>Descripción: </Text>
          <Text style={[styles.value,{color:colors.text}]}>{ product.descripcion }</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.text,{color:colors.text}]}>Precio de costo: </Text>
          <Text style={[styles.value,{color:colors.text}]}>{product.precioCompra}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.text,{color:colors.text}]}>Precio de venta: </Text>
          <Text style={[styles.value,{color:colors.text}]}>{product.precioVenta}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.text,{color:colors.text}]}>Cantidad: </Text>
          <Text style={[styles.value,{color:colors.text}]}>{product.cantidad}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.text,{color:colors.text}]}>Categoría: </Text>
          <Text style={[styles.value,{color:colors.text}]}>{product.codigo}</Text>
        </View>
      </View>

      <FAB
        visible={true}
        onPress={() => deleteProduct(product)}
        placement="right"
        icon={{ name: "delete", color: colors.text }}
        color={colors.button}
        titleStyle={{ color: colors.text }}
      />
      {deleted && (
        <PopUpInfo
          visibility={deleted}
          message={"Producto eliminado"}
        ></PopUpInfo>
      )}
      <PopUp
        visibility={deletePopUp}
        message={"¿Estás seguro que quieres borrar este producto?"}
        child={
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={[styles.buttonText,{ color:colors.text,}]}
              buttonStyle={[styles.buttonDialog, { backgroundColor: colors.background,borderColor:colors.primary }]}
              onPress={() => confirmationDelete(true, product)}
            >
              SI
            </Button>
            <Button
              titleStyle={[styles.buttonText,{ color:colors.text,}]}
              buttonStyle={[
                styles.buttonDialog,
                { backgroundColor: colors.primary,borderColor:colors.primary },
              ]}
              onPress={() => confirmationDelete(false, product)}
            >
              No
            </Button>
          </View>
        }
      />
    </View>
  )
}

/* Estilos  */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    marginVertical: 5,
    marginBottom: 20
  },
  actionsButtons: {
    width: "100%",
    height: 50,
    borderWidth: 0,
    marginBottom: 15,
  },
  information: {
    borderWidth: 1,
    width: "95%",
    height: 240,
    borderRadius: 20,
    padding: 10,
    display: "flex",
    justifyContent: "space-evenly",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemInfo: {
    flexDirection: "row",
  },
  value: {
    fontSize: 16,
  },
  buttonDialog: {
    borderRadius: 30,
    borderWidth: 1,
    width: 90,
  },
  buttonContainer: {
  flexDirection:"row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
