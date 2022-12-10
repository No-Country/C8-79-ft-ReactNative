import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React from "react";
import EditClientForm from "../components/form/EditClientForm";
import { useTheme } from "@react-navigation/native";

const EditClient = (route) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
     <Text style={[styles.title,{backgroundColor:colors.primary,color:colors.text}]}>Editar Cliente</Text>
      <EditClientForm client={route.route.params}></EditClientForm>
    </View>
  );
};

export default EditClient;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight:"bold",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    zIndex: 1,
    marginBottom: 10,
    height: 60,
    width: "100%",
  },
});
