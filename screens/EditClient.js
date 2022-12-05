import { StyleSheet, SafeAreaView, Text,View } from "react-native";
import React from "react";
import EditClientForm from "../components/form/EditClientForm";
import { useTheme } from "@react-navigation/native";

const EditClient = (route) => {

  const { colors }=useTheme()
   
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
     
      
      <EditClientForm client={route.route.params}></EditClientForm>
      
    </SafeAreaView>
  );
};

export default EditClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  
});
