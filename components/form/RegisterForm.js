import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Dialog, Icon } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { db, firebaseConfig } from "../../firebase/Config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const RegisterForm = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [popup, setPopup] = useState(false);
  const nav = useNavigation();

  const [showPassword, setShowPassword] = useState({
    password: true,
    passwordConfirmation: true,
  });


  const handleCreateUser = async ({
    userName,
    lastName,
    email,
    phoneNumber,
    password,
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const data = {
          userName,
          lastName,
          email,
          phoneNumber,
          password,
        };
        await addDoc(collection(db, "Usuarios"), data);
      })
      .catch((error) => {
        console.log(error);
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

  const submitForm = (formData, clear) => {
    console.log(formData);
    setPopup(true);
    clear();
    setTimeout(() => {
      setPopup(false), nav.navigate("Login");
    }, 1000);
  };

  return (
    <>
      <Formik
        initialValues={{ userName: "", lastName: "", email: "", password: "" }}
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
          handleCreateUser(values);
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
