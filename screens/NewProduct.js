import { StyleSheet, SafeAreaView, Text } from "react-native";
import React from 'react'
import { useTheme } from "@react-navigation/native";
import NewProductForm from '../components/form/NewProductForm'

export default function NewProduct() {
    const {colors}=useTheme()
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
     
      <Text style={[styles.title,{backgroundColor:colors.primary,color:colors.text}]}>Ingresar nuevo producto</Text>
      <NewProductForm></NewProductForm>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
    },
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
  