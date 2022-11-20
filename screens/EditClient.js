import { StyleSheet, SafeAreaView, Text,View } from "react-native";
import React from "react";
import EditClientForm from "../components/form/EditClientForm";

const EditClient = (route) => {
   
  return (
    <SafeAreaView style={styles.container}>
     
      <Text style={styles.title}>Editar Cliente</Text>
      <EditClientForm client={route.route.params}></EditClientForm>
      
    </SafeAreaView>
  );
};

export default EditClient;

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
