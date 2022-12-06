import { StyleSheet, SafeAreaView, Text,View } from "react-native";
import React from "react";
import NewClientForm from "../components/form/NewClientForm";
import { useTheme } from "@react-navigation/native";

const NewClient = () => {
 const {colors}=useTheme()
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
     
      <Text style={[styles.title,{backgroundColor:colors.primary,color:colors.text}]}>Crear nuevo Cliente</Text>
      <NewClientForm></NewClientForm>
      
    </SafeAreaView>
  );
};

export default NewClient;

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
