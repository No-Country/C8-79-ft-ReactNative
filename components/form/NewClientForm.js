import {
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation , useTheme} from "@react-navigation/native";
import MapSearchInput from "../MapsSearchInput"

const NewClientForm = () => {

  const { colors}=useTheme()
  const nav = useNavigation();
  const placesRef = useRef();

  const [popup, setPopup] = useState(false);
  const [location, setLocation] = useState({coordinates:"" ,address:""})

  const submitForm = (values, clear) => {
    console.log(values);
    setPopup(true);
    clear();
    setTimeout(() => {
      setPopup(false), nav.navigate("ClientsScreen");
    }, 1000);
  };

  const getAddress = () => {
    return (placesRef.current.getAddressText());
  };

  const getLocation = (data,details,coordinates,setter)=> {
    
    setter("address",getAddress().split(",")[0])
    setLocation({coordinates:coordinates ,address:getAddress()})
    
  }

  const addClient = (values) => {
    console.log(values)
  }


  return (
    <Formik
      initialValues={{
        user: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      }}
      validationSchema={Yup.object({
        user: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Debe completar este campo"),
         
        lastName: Yup.string().max(20, "Must be 20 characters or less"),
        email: Yup.string()
          .email("Direccion invalida")
          .required("Debe completar este campo"),
        phone: Yup.string(),
        address: Yup.string()
          .min(5, "Must be 5 characters or more")
          .required("Debe completar este campo"),
      })}
      onSubmit={(values, { resetForm }) => {
        submitForm(values, resetForm);
        addClient(values)
      }}
    >
      {({setFieldValue , handleChange, handleSubmit, values, errors, touched }) => (
        <FlatList 
        overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
         style={styles.form}
         ListHeaderComponent={
          <>
          <Text style={[styles.label,{color:colors.text}]}>Nombre</Text>
          <TextInput
            style={[styles.textInput,{backgroundColor:colors.card,color:colors.text}]}
            onChangeText={handleChange("user")}
            value={values.user}
            selectionColor={colors.text}
          />
          {errors.user && touched.user && (
            <Text style={styles.error}>{errors.user}</Text>
          )}
          <Text style={[styles.label,{color:colors.text}]}>Apellido</Text>
          <TextInput
            style={[styles.textInput,{backgroundColor:colors.card,color:colors.text}]}
            onChangeText={handleChange("lastName")}
            value={values.lastName}
            selectionColor={colors.text}
          />
          {errors.lastName && touched.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}

          <Text style={[styles.label,{color:colors.text}]}>Correo Elentrónico</Text>
          <TextInput
            autoCorrect={false}
            style={[styles.textInput,{backgroundColor:colors.card,color:colors.text}]}
            onChangeText={handleChange("email")}
            value={values.email}
            selectionColor={colors.text}
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}
          <Text style={[styles.label,{color:colors.text}]}>Telefono Celular</Text>

          <TextInput
            keyboardType={"numeric"}
            style={[styles.textInput,{backgroundColor:colors.card,color:colors.text}]}
            onChangeText={handleChange("phoneNumber")}
            value={values.phoneNumber}
            selectionColor={colors.text}
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          )}

          <Text style={[styles.label,{color:colors.text}]}>Direccion</Text>

          <MapSearchInput
            onChangeText={(()=>handleChange("address"))}
            value={values.address}
            isPress={getLocation}
            refer={placesRef}
            setFieldValue={setFieldValue}
          ></MapSearchInput>

          {errors.address && touched.address && (
            <Text style={styles.error}>{errors.address}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: colors.text, fontSize: 18 }}
              buttonStyle={[styles.button,{backgroundColor:colors.primary}]}
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
