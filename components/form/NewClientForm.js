import { StyleSheet, TextInput, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button,Icon } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation } from '@react-navigation/native';




const NewClientForm = () => {

  const nav = useNavigation();
 
  const [popup, setPopup] = useState(false)
  
  

  const submitForm = (formData,clear) => {
    setPopup(true)
    clear()
    setTimeout(()=> {setPopup(false) ,nav.navigate("ClientsScreen")},1000)
      }

  return (
    <Formik
      initialValues={{ user: "",lastName:"",email:"", phone: "",adress: "" }}
      validationSchema={Yup.object({
        user: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Debe completar este campo"),
          lastName: Yup.string()
          .max(20, "Must be 20 characters or less"),
          email: Yup.string().email("Direccion invalida")
          .required("Debe completar este campo")
         // phone: Yup.string(),
          
          //adress: Yup.string(),
      })}
      onSubmit={(values  ,{ resetForm }) => {submitForm(values,resetForm); } }
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <ScrollView
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          style={styles.form}
        >
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("user")}
            value={values.user}
            selectionColor={"#000"}
          />
          {errors.user && touched.user && (
            <Text style={styles.error}>{errors.user}</Text>
          )}
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("lastName")}
            value={values.lastName}
            selectionColor={"#000"}
          />
          {errors.lastName && touched.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}

          <Text style={styles.label}>Correo Elentrónico</Text>
          <TextInput
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={handleChange("email")}
           
            value={values.email}
            selectionColor={"#000"}
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}
          <Text style={styles.label}>Telefono Celular</Text>

          <TextInput
            keyboardType={"numeric"}
            style={styles.textInput}
            onChangeText={handleChange("phoneNumber")}
            value={values.phoneNumber}
            selectionColor={"#000"}
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          )}

          <Text style={styles.label}>Direccion</Text>
          
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("adress")}
              value={values.adress}
              selectionColor={"#000"}
            />
            
         
          {errors.adress && touched.adress && (
            <Text style={styles.error}>{errors.adress}</Text>
          )}

          
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: "#000",fontSize:18 }}
              buttonStyle={styles.button}
              onPress={handleSubmit}
              title="Guardar"
            />
          </View>

          <PopUp visibility={popup} message="¡Se creo el Cliente con exito!" ></PopUp>
        </ScrollView>
      )}
    </Formik>
  );
};

export default NewClientForm;

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  textInput: {
    
    paddingHorizontal: 10,
    backgroundColor: "#F1F1F2",
    height: 35,
    width: "100%",
    color: "#000000",
    fontSize: 18,
    flex: 1,
    borderRadius:10,
  },
  button: {
    borderRadius:10,
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
