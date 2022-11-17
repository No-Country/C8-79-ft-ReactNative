import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import PaswordRecoveryForm from "../components/form/PaswordRecoveryForm";

const PasswordRecovery = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recupera tu contraseña</Text>
      <PaswordRecoveryForm  ></PaswordRecoveryForm>
      <Button
        titleStyle={{ color: "#000", fontSize: 16 }}
        buttonStyle={styles.button}
        onPress={()=>navigation.goBack()}
        title="Volver"
      />
    </SafeAreaView>
  );
};

export default PasswordRecovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  title: {
    marginVertical: 100,
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    width: 150,
    backgroundColor: "#A1D6E2",
    color: "#000000",
  },
});
