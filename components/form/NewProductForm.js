import {StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation } from "@react-navigation/native";

export const NewProductForm = () => {

  const nav = useNavigation();
  const placesRef = useRef();

  const [popup, setPopup] = useState(false);
  

  const submitForm = (values, clear) => {
    console.log(values);
    setPopup(true);
    clear();
    setTimeout(() => {
      setPopup(false), nav.navigate("ProductsScreen");
    }, 1000);
  };

 

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        cost: "",
        sale: "",
        quantity: "",
        category: ""
      }}

      validationSchema={Yup.object({
        name: Yup.string()
          .required("Debe completar este campo"),         
        description: Yup.string()
        .required("Debe completar este campo"),
        cost: Yup.string()
          .required("Debe completar este campo"),
        sale: Yup.string()
        .required("Debe completar este campo"),
        quantity: Yup.string()
          .required("Debe completar este campo"),
        category: Yup.string()
          .required("Debe completar este campo"),
      })}

      onSubmit={(values, { resetForm }) => {
        submitForm(values, resetForm);
      }}
    >

      {({setFieldValue , handleChange, handleSubmit, values, errors, touched }) => (
        
        <FlatList 
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          style={styles.form}
          ListHeaderComponent={
          <>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={handleChange("name")}
                value={values.name}
                selectionColor={"#000"}
          />

          {errors.name && touched.name && (

            <Text style={styles.error}>{errors.name}</Text>

          )}

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={handleChange("description")}
                value={values.description}
                selectionColor={"#000"}
          />

          {errors.description && touched.description && (

            <Text style={styles.error}>{errors.description}</Text>

          )}

            <Text style={styles.label}>Precio de costo</Text>
            <TextInput
                keyboardType={"numeric"}
                style={styles.textInput}
                onChangeText={handleChange("cost")}
                value={values.cost}
                selectionColor={"#000"}
          />

          {errors.cost && touched.cost && (

            <Text style={styles.error}>{errors.cost}</Text>

          )}
          
          <Text style={styles.label}>Precio de venta</Text>

          <TextInput
            keyboardType={"numeric"}
            style={styles.textInput}
            onChangeText={handleChange("sale")}
            value={values.sale}
            selectionColor={"#000"}
          />

          {errors.sale && touched.sale && (

            <Text style={styles.error}>{errors.sale}</Text>

          )}

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            keyboardType={"numeric"}
            style={styles.textInput}
            onChangeText={handleChange("quantity")}
            value={values.quantity}
            selectionColor={"#000"}
          />

          {errors.quantity && touched.quantity && (

            <Text style={styles.error}>{errors.quantity}</Text>

          )}

          <Text style={styles.label}>Categoría</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={handleChange("category")}
                value={values.category}
                selectionColor={"#000"}
          />

          {errors.category && touched.category && (

            <Text style={styles.error}>{errors.category}</Text>

          )}


          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: "#000", fontSize: 18 }}
              buttonStyle={styles.button}
              onPress={handleSubmit}
              title="Guardar producto"
            />
          </View>

          <PopUp
            visibility={popup}
            message="¡Se creó el Producto con éxito!"
          ></PopUp>
          
          </>
         }
         >
          
        </FlatList>
      )}
    </Formik>

  )
};
export default NewProductForm;
//estilos

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  textInput: {
    paddingHorizontal: 10,
    backgroundColor: "#F1F1F2",
    height: 44,
    width: "100%",
    color: "#000000",
    fontSize: 18,
    flex: 1,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    marginVertical: 50,
    width: 200,
    backgroundColor: "#A1D6E2",
    color: "#000000",
  },
  passwordInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  label: {
    textAlign: "left",
    flex: 1,
    marginVertical: "3%",
    color: "#BCBABE",
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
