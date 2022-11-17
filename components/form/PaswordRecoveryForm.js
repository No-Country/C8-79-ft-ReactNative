import { StyleSheet, TextInput, Text, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@rneui/themed";
import PopUp from "../PopUp";

const PaswordRecoveryForm = () => {
  

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Direccion invalida")
          .required("Debe completar este campo"),
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.form}>
          <Text style={styles.label}>Ingresa tu correo electronico</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("email")}
            value={values.email}
            selectionColor={"#000"}
            autoCorrect={false}
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: "#000", fontSize: 18 }}
              buttonStyle={styles.button}
              onPress={handleSubmit}
              title="Recuperar"
            />
          </View>

          <PopUp visibility={popup}></PopUp>
        </View>
      )}
    </Formik>
  );
};

export default PaswordRecoveryForm;

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  textInput: {
    paddingHorizontal: 10,
    backgroundColor: "#F1F1F2",
    height: 40,
    width: "100%",
    fontSize: 18,
    borderRadius: 10,
  },
  button: {
    marginTop: 80,
    borderRadius: 10,
    marginVertical: 50,
    width: 200,
    backgroundColor: "#A1D6E2",
    color: "#000000",
  },
  error: {
    color: "red",
  },
  label: {
    textAlign: "left",
    marginVertical: "3%",
    color: "#000",
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
