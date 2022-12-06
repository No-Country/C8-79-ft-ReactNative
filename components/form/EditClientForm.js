import { StyleSheet, TextInput, Text, View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button,Icon } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation,useTheme } from '@react-navigation/native';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebase/Config";
import { Context } from "../../context/ContextProvider";
import UserContext from "../../context/UserContext";
import { color } from "react-native-reanimated";




const EditClientForm = ({client}) => {
  const { colors}=useTheme()
  const {handleBandera, bandera} = useContext(Context)
  const {setSpinner,setError} = useContext(UserContext)
  const nav = useNavigation();
 
  const [popup, setPopup] = useState(false)


 
  const submitForm = async(formData,clear) => {
    const cliente = doc(db, "Clientes", client.id);
   setSpinner(true)
    await setDoc(cliente, {
      id: client.id,
      firstName: formData.user,
      lastName:formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        address:formData.address,
        city: client.address.city,
        coordinates: {
          lat:client.address.coordinates.lat,
          lng: client.address.coordinates.lng
        }
      }
  }).catch(error => {
    console.log(error)
    setError(error)

  });
    handleBandera()
    setSpinner(false)
    setPopup(true)
    console.log(client.id)
    clear()
    setTimeout(()=> {setPopup(false), nav.navigate("ClientsScreen") },1000)
      }
  return (
    <Formik
      initialValues={{ user: client.firstName ,lastName:client.lastName,email:client.email, phone:client.phone,address:client.address.address}}
      validationSchema={Yup.object({
        user: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Debe completar este campo"),
          lastName: Yup.string()
          .max(20, "Must be 20 characters or less"),
          email: Yup.string().email("Direccion invalida")
          .required("Debe completar este campo"),
          phone: Yup.string(),
          address: Yup.string(),
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
          <Text style={[styles.label,{color:colors.text}]}>Nombre</Text>
          <TextInput
            style={[styles.textInput,{color:colors.text,backgroundColor:colors.card}]}
            onChangeText={handleChange("user")}
            value={values.user}
            selectionColor={colors.text}
          />
          {errors.user && touched.user && (
            <Text style={styles.error}>{errors.user}</Text>
          )}
          <Text style={[styles.label,{color:colors.text}]}>Apellido</Text>
          <TextInput
            style={[styles.textInput,{color:colors.text,backgroundColor:colors.card}]}
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
            style={[styles.textInput,{color:colors.text,backgroundColor:colors.card}]}
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
            style={[styles.textInput,{color:colors.text,backgroundColor:colors.card}]}
            onChangeText={handleChange("phone")}
            value={values.phone}
            selectionColor={colors.text}
          />
          {errors.phone && touched.phone && (
            <Text style={styles.error}>{errors.phone}</Text>
          )}
          <Text style={[styles.label,{color:colors.text}]}>Direccion</Text>
          
            <TextInput
              style={[styles.textInput,{color:colors.text,backgroundColor:colors.card}]}
              onChangeText={handleChange("address")}
              value={values.address}
              selectionColor={colors.text}
            />
            
         
          {errors.address && touched.address && (
            <Text style={styles.error}>{errors.address}</Text>
          )}
          
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: colors.text,fontSize:18 }}
              buttonStyle={[styles.button,{backgroundColor:colors.primary}]}
              onPress={handleSubmit}
              title="Guardar"
            />
          </View>
          <PopUp visibility={popup} message="¡Se guardaron los cambios con exito!" ></PopUp>
        </ScrollView>
      )}
    </Formik>
  );
};
export default EditClientForm;
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