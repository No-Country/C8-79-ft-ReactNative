import { StyleSheet, TextInput, Text, View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Button, Icon } from "@rneui/themed";
import PopUp from "../components/PopUp";
import { useNavigation, useTheme } from "@react-navigation/native";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import UserContext from "../context/UserContext";
import { color } from "react-native-reanimated";
import { Context } from "../context/ContextProvider";
import { Switch } from "@rneui/themed";
import { getAuth, updateEmail, updatePassword } from "firebase/auth/react-native";
import { useEffect } from "react";

export default function Perfil() {
  const { theme, setTheme } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const { colors } = useTheme();
  const [usuario, setUsuario] = useState();
  const { handleBandera, bandera} = useContext(Context);
  const { setSpinner, setError } = useContext(UserContext);
  const nav = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = auth.currentUser.uid;
  const [popup, setPopup] = useState(false);

  const datosUsuario = async () => {
    const docRef = doc(db, "Usuarios", uid);
    const docSnap = await getDoc(docRef);
    setUsuario(docSnap.data());
  };

  useEffect(() => {
    datosUsuario();
  }, []);

  const submitForm = (values, resetForm) => {
    setSpinner(true)
    handleEdit(values, resetForm)
  };

  const handleEdit = async (
    { user, lastName, email, phone, password },
    resetForm
  ) => {
    const data = {
      id: uid,
      userName: user,
      lastName: lastName ? lastName : usuario.lastName,
      email,
      phoneNumber: phone ? phone : usuario.phoneNumber,
      password
    }
    
    const usuarioDB = doc(db, "Usuarios", uid);
    await setDoc(usuarioDB, data)
    setSpinner(false)
    updateEmail(auth.currentUser, data.email).then(() => {
      console.log("email update")
    }).catch((error) => {
      console.log(error)
    });
    

    updatePassword(auth.currentUser, data.password).then(() => {
      console.log("pass update")
    }).catch((error) => {
      console.log(error)
    });

    
    
    
  };

  const handleTheme = () => {
    setToggle((toggle) => !toggle);
    setTheme(theme == "Light" ? "Dark" : "Light");
  };
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 25,
        }}
      >
        <Icon name="sunny" type="ionicon" color={colors.text} />
        <Switch
          style={{ marginHorizontal: 5 }}
          value={toggle}
          onValueChange={() => handleTheme()}
        />
        <Icon name="moon" type="ionicon" color={colors.text} />
      </View>

      <Avatar
        size={150}
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      >
        <Avatar.Accessory size={23} />
      </Avatar>

      <Formik
        initialValues={{
          user: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          passwordConfirmation: "",
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
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <ScrollView
            overScrollMode={"never"}
            showsVerticalScrollIndicator={false}
            style={styles.form}
          >
            <Text style={[styles.label, { color: colors.text }]}>Nombre</Text>
            <TextInput
              style={[
                styles.textInput,
                { color: colors.text, backgroundColor: colors.card },
              ]}
              onChangeText={handleChange("user")}
              value={values.user}
              selectionColor={colors.text}
              placeholder={usuario?.userName}
              placeholderTextColor={theme === "Light" ? "#A5A3A2" : "#FFF"}
            />
            {errors.user && touched.user && (
              <Text style={styles.error}>{errors.user}</Text>
            )}
            <Text style={[styles.label, { color: colors.text }]}>Apellido</Text>
            <TextInput
              style={[
                styles.textInput,
                { color: colors.text, backgroundColor: colors.card },
              ]}
              onChangeText={handleChange("lastName")}
              value={values.lastName}
              selectionColor={colors.text}
              placeholder={usuario?.lastName}
              placeholderTextColor={theme === "Light" ? "#A5A3A2" : "#FFF"}
            />
            {errors.lastName && touched.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
            <Text style={[styles.label, { color: colors.text }]}>
              Correo Elentrónico
            </Text>
            <TextInput
              autoCorrect={false}
              style={[
                styles.textInput,
                { color: colors.text, backgroundColor: colors.card },
              ]}
              onChangeText={handleChange("email")}
              value={values.email}
              selectionColor={colors.text}
              placeholder={usuario?.email}
              placeholderTextColor={theme === "Light" ? "#A5A3A2" : "#FFF"}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <Text style={[styles.label, { color: colors.text }]}>
              Telefono Celular
            </Text>
            <TextInput
              keyboardType={"numeric"}
              style={[
                styles.textInput,
                { color: colors.text, backgroundColor: colors.card },
              ]}
              onChangeText={handleChange("phone")}
              value={values.phone}
              selectionColor={colors.text}
              placeholder={usuario?.phoneNumber}
              placeholderTextColor={theme === "Light" ? "#A5A3A2" : "#FFF"}
            />
            {errors.phone && touched.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}
            <Text style={[styles.label, { color: colors.text }]}>
              Contraseña
            </Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={[
                  styles.textInput,
                  { color: colors.text, backgroundColor: colors.card },
                ]}
                onChangeText={handleChange("password")}
                value={values.password}
                selectionColor={colors.text}
                secureTextEntry={true}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Text style={[styles.label, { color: colors.text }]}>
              Repetir Contraseña
            </Text>

            <View style={styles.passwordInput}>
              <TextInput
                style={[
                  styles.textInput,
                  { color: colors.text, backgroundColor: colors.card },
                ]}
                onChangeText={handleChange("passwordConfirmation")}
                value={values.passwordConfirmation}
                secureTextEntry={true}
                selectionColor={colors.text}
              />
            </View>
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <Text style={styles.error}>{errors.passwordConfirmation}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Button
                titleStyle={{ color: colors.text, fontSize: 18 }}
                buttonStyle={[
                  styles.button,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleSubmit}
                title="Guardar"
              />
            </View>
            <PopUp
              visibility={popup}
              message="¡Se guardaron los cambios con exito!"
            ></PopUp>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

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
