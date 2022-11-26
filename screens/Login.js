import React, { useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "../components/Spinner";

export const Login = ({ navigation }) => {
  
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState({ user: false, network: false });

  useFocusEffect(
    useCallback(() => {
      return () => setSpinner(false);
    }, [])
  );

  const handleSignIn = ({ email, password }, reset) => {
    setSpinner(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        reset();
        navigation.navigate("Menu");
      })
      .catch((error) => {
        if (error.message.includes("user-not-found")) {
          setError((prev) => ({
            ...prev,
            user: true,
          }));
        } else {
          setError((prev) => ({
            ...prev,
            network: true,
          }));
          setTimeout(
            () =>
              setError((prev) => ({
                ...prev,
                network: false,
              })),
            5000
          );
        }
        console.log(error.message);
        setSpinner(false);
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
              onFocus={() =>
                setError((prev) => ({
                  ...prev,
                  user: false,
                }))
              }
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
              onFocus={() =>
                setError((prev) => ({
                  ...prev,
                  user: false,
                }))
              }
              value={values.password}
              selectionColor={"#000"}
              secureTextEntry={true}
              placeholder="Contraseña"
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {error.user && (
              <Text style={styles.error}>Credenciales incorrectas</Text>
            )}
            {error.network && (
              <Text style={styles.error}>
                Problemas con el servidor , intenta mas tarde
              </Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
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
      {spinner ? <Spinner></Spinner> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    justifyContent: "center",
  },
  text: {
    color: "cyan",
    fontSize: 50,
    fontWeight: "bold",
  },
  image: {
    marginBottom: 20,
    height: 50,
    width: 130,
  },
  diamont: {
    height: 135, //90
    width: 190, //125
    marginTop: "0%",
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
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    color: "#a1a1a2",
  },
  error: {
    color: "red",
    marginVertical: 5,
  },
});
export default Login;
