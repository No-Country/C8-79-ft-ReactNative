import {StyleSheet, TextInput, Text, View, FlatList, SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { NewProductForm } from '../components/form/NewProductForm';


const NewProduct = () => {
  const {colors}=useTheme()
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
     
     <Text style={[styles.title,{backgroundColor:colors.primary,color:colors.text}]}>Crear nuevo Producto</Text>
      <NewProductForm/>
      
    </SafeAreaView>
  )
};

export default NewProduct;

//Estilos:

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
    },
  top:{
    backgroundColor: "#EFEFEF",
    height:14,
    width:"100%"
  }
    ,
    title: {
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 20,
      zIndex: 1,
    
      marginBottom: 10,
      color: "#000000",
      backgroundColor: "#A1D6E2",
      height: 60,
      width: "100%",
    },
  });