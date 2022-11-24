import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Icon,
} from "react-native";
import logo from "../assets/monshine.png";
import diamont from "../assets/diamon2.gif";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth, firebaseConfig } from "../firebase/Config";
import { Formik } from "formik";
import * as Yup from "yup";
//

export const Login = ({ navigation }) => {
 
  const [incorrect, setIncorrect] = useState(false);


  const handleSignIn = ({email,password}, reset) => {


    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIncorrect(false);
        reset()
        navigation.navigate("Menu");
      })
      .catch((error) => {
        console.log(error);
        setIncorrect(true);
      });

    
  };

  return (
    <View style={styles.container}>
      <Image source={diamont} style={styles.diamont} />
      <Image source={logo} style={styles.image} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Direccion invalida")
            .required("Debe completar este campo"),
          password: Yup.string()
            .min(6, "Debe contener 6 caracteres o mas")
            .required("Debe completar este campo"),
        })}
        onSubmit={(values, { resetForm }) => {
        handleSignIn(values, resetForm);
        
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.inputs}
              onChangeText={handleChange("email")}
              value={values.email}
              selectionColor={"#000"}
              placeholder="Direccion de email"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.inputs}
              onChangeText={handleChange("password")}
              value={values.password}
              selectionColor={"#000"}
              secureTextEntry={true}
              placeholder="Contraseña"
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {incorrect && (
              <Text style={styles.error}>Credenciales incorrectas</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit()
              }}
            >
              <Text> INICIAR </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PasswordRecovery");
        }}
      >
        <Text style={{ color: "#1995AD", marginTop: 40 }}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
      >
        <View
          style={{ backgroundColor: "#000", height: 1, width: "30%" }}
        ></View>
        <View>
          <Text style={{ marginHorizontal: 25 }}>O</Text>
        </View>
        <View
          style={{ backgroundColor: "#000", height: 1, width: "30%" }}
        ></View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text> ¿No tienes una cuenta? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#1995AD" }}> Crear cuenta </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    //justifyContent: 'center',
  },
  text: {
    color: "cyan",
    fontSize: 50,
    fontWeight: "bold",
  },
  image: {
    marginTop: 0,
    height: 50,
    width: 130,
  },
  diamont: {
    height: 135, //90
    width: 190, //125
    marginTop: "10%",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#A1D6E2",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 10,
  },
  inputs: {
    backgroundColor: "#F1F1f2",
    width: "80%",
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    color: "#a1a1a2",
  },
  error: {
    color: "red",
    marginVertical:5
  },
});
export default Login;
