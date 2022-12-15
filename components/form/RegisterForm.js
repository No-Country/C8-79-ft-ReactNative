import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Dialog, Icon } from "@rneui/themed";
import PopUp from "../PopUp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/Config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Spinner from "../Spinner";

const RegisterForm = () => {
  const [popup, setPopup] = useState(false);
  const nav = useNavigation();
  const [error, setError] = useState({ user: false, network: false });
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: true,
    passwordConfirmation: true,
  });

  useFocusEffect(
    useCallback(() => {
      return () => setSpinner(false);
    }, [])
  );

  const submitForm = (formData, clear) => {
    setSpinner(true);
    handleCreateUser(formData, clear);
  };

  const handleCreateUser = async (
    { userName, lastName, email, phoneNumber, password },
    clear
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const data = {
          userName,
          lastName,
          email,
          phoneNumber,
          password,
          profilePic:"https://res.cloudinary.com/dnont3pur/image/upload/v1670372416/Monshine/monshine_v9et2x.jpg",

          id: auth.currentUser.uid,
        };
        console.log(auth.currentUser.uid);
        await setDoc(doc(db, "Usuarios", auth.currentUser.uid), data);
        setPopup(true);
        clear();
        setTimeout(() => {
          setPopup(false) //nav.navigate("Login");
        }, 1000);
      })
      .catch((error) => {
        if (error.message.includes("email-already-in-use")) {
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

        console.log(error);
        setSpinner(false);
      });
  };

  const toggleInput = (element) => {
    setShowPassword((prev) => {
      if (element === "password") {
        return {
          ...prev,
          password: !prev.password,
        };
      } else {
        return {
          ...prev,
          passwordConfirmation: !prev.passwordConfirmation,
        };
      }
    });
  };

  return (
    <>
      {spinner ? <Spinner></Spinner> : null}
      <Formik
        initialValues={{ userName: "", lastName: "", email: "", password: "" ,phoneNumber:""}}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Debe completar este campo"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Debe completar este campo"),

          email: Yup.string()
            .email("Direccion invalida")
            .required("Debe completar este campo"),

          phoneNumber: Yup.number().required("Debe completar este campo"),
          password: Yup.string()
            .min(6, "Debe contener 6 caracteres o mas")
            .required("Debe completar este campo"),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Las contraseñas deben coincidir"
          ),
        })}
        onSubmit={(values, { resetForm }) => {
          submitForm(values, resetForm);
        }}
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
              onChangeText={handleChange("userName")}
              value={values.userName}
              selectionColor={"#000"}
            />
            {errors.userName && touched.userName && (
              <Text style={styles.error}>{errors.userName}</Text>
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
              onFocus={() =>
                setError((prev) => ({
                  ...prev,
                  user: false,
                }))
              }
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

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={showPassword.password ? true : false}
                selectionColor={"#000"}
              />
              <Icon
                name={showPassword.password ? "eye" : "eye-off"}
                type="feather"
                size={20}
                color="#000"
                onPress={() => toggleInput("password")}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Text style={styles.label}>Repetir Contraseña</Text>

            <View style={styles.passwordInput}>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("passwordConfirmation")}
                value={values.passwordConfirmation}
                secureTextEntry={
                  showPassword.passwordConfirmation ? true : false
                }
                selectionColor={"#000"}
              />
              <Icon
                name={showPassword.passwordConfirmation ? "eye" : "eye-off"}
                type="feather"
                size={20}
                color="#000"
                onPress={() => toggleInput("passwordConfirmation")}
              />
            </View>
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <Text style={styles.error}>{errors.passwordConfirmation}</Text>
            )}
            {error.user && (
              <Text style={styles.error}>
                Direccion de email en uso ,prueba reestablecer tu contraseña
              </Text>
            )}
            {error.network && (
              <Text style={styles.error}>
                Problemas con el servidor , intenta mas tarde
              </Text>
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
              message="¡Los cambios se guardaron con exito!"
            ></PopUp>
          </ScrollView>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  textInput: {
    paddingHorizontal: 15,
    backgroundColor: "#F1F1F2",
    height: 45,
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
    marginTop: 20,
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
