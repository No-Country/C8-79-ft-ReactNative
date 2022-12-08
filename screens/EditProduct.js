import { StyleSheet, SafeAreaView, Text,View } from "react-native";
import React from "react";
import EditProductFrom from "../components/form/EditProductForm";
import { useTheme } from "@react-navigation/native";

export const EditProduct = (route) => {

  const { colors }=useTheme()
   
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
     
      
      <EditProductFrom product={route.route.params}></EditProductFrom>
      
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  
});
