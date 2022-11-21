import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Icon } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation } from "@react-navigation/native";
import MapSearchInput from "../MapsSearchInput";

const NewClientForm = () => {
  const nav = useNavigation();

  const [popup, setPopup] = useState(false);
  const [location, setLocation] = useState({cordiantes:"" ,address:""})

  const placesRef = useRef();
  const getAddress = () => {
    return (placesRef.current.getAddressText());
  };

  const submitForm = (values, clear) => {
    console.log(values);
    console.log(location)
    
    // setPopup(true);
    // clear();
    // setTimeout(() => {
    //   setPopup(false), nav.navigate("ClientsScreen");
    // }, 1000);
  };

  const getLocation = (data,details,cordiantes)=> {

    setLocation({cordiantes:cordiantes ,address:getAddress()})
  }

  return (
    <Formik
      initialValues={{
        user: "",
        lastName: "",
        email: "",
        phone: "",
        address: location.address,
      }}
      validationSchema={Yup.object({
        user: Yup.string()
          .max(20, "Must be 20 characters or less")
         // .required("Debe completar este campo"),
         ,
        lastName: Yup.string().max(20, "Must be 20 characters or less"),
        email: Yup.string()
          .email("Direccion invalida")
          //.required("Debe completar este campo"),
          ,
        phone: Yup.string(),
        address: Yup.string()
          .min(5, "Must be 5 characters or more")
          //.required("Debe completar este campo"),
      })}
      onSubmit={(values, { resetForm }) => {
        submitForm(values, resetForm);
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <FlatList 
        overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
         style={styles.form}
         ListHeaderComponent={
          <>
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

          <MapSearchInput
            onChangeText={(handleChange("address"))}
            value={location.address}
            isPress={getLocation}
            refer={placesRef}
          ></MapSearchInput>

          {errors.address && touched.address && (
            <Text style={styles.error}>{errors.address}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: "#000", fontSize: 18 }}
              buttonStyle={styles.button}
              onPress={handleSubmit}
              title="Guardar"
            />
          </View>

          <PopUp
            visibility={popup}
            message="¡Se creo el Cliente con exito!"
          ></PopUp>
          
          </>
         }
         >
          
        </FlatList>
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
