import { StyleSheet, SafeAreaView, Text,View } from "react-native";
import React from "react";

import RegisterForm from "../components/form/RegisterForm"

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}></View>
      <Text style={styles.title}>Por favor , registrate</Text>
      <RegisterForm></RegisterForm>
      
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    marginTop: 15,
    marginBottom: 10,
    color: "#000000",
    backgroundColor: "#A1D6E2",
    height: 60,
    width: "100%",
  },
});
