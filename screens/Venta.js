import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Dialog, Icon } from "@rneui/themed";
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const Venta = () => {
  const { colors } = useTheme();
  const [popup, setPopup] = useState(false);
  const nav = useNavigation();
  const [error, setError] = useState({ user: false, network: false });
  const [spinner, setSpinner] = useState(false);
  const [productInput, setProductInput] = useState(1);
  const [showPassword, setShowPassword] = useState({
    password: true,
    passwordConfirmation: true,
  });

  const submitForm = (formData, clear) => {};

  const ProductInput = ({ handleChange, values,setFieldValue }) => {

    const [cantidad, setCantidad] = useState(1)
    return (


      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "70%" }}>
          <Text style={styles.label}>Producto</Text>
          <TextInput
        
            style={styles.textInput}
            onChangeText={handleChange("producto")}
            value={values.producto}
            selectionColor={"#000"}
          />
        </View>

        <View style={{ width: "30%", alignItems: "center" }}>
          <Text style={styles.label}>Cantidad</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="add" type="ionicon" color={colors.text}  onPress={()=>setCantidad (cantidad+1)} />
            <TextInput
              style={[styles.textInput, {textAlign:"center", width: "30%" }]}
              onChangeText={()=>{handleChange("cantidad")}}
              value={values.cantidad}
              selectionColor={"#000"}
              
            />
            <Icon name="remove" type="ionicon" color={colors.text} onPress={()=>setCantidad (cantidad-1)}  />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Formik
        initialValues={{ cliente: "A", producto: "", cantidad:"1" }}
        validationSchema={Yup.object({
            cliente: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Debe completar este campo"),
          producto: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Debe completar este campo"),
          cantidad: Yup.number()
            .required("Debe completar este campo")
            .positive()
            .max(100)
        })}
        onSubmit={(values, { resetForm }) => {
          submitForm(values, resetForm);
        }}
      >
        {({
            setFieldValue,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView
            overScrollMode={"never"}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              heigth: "100%",
              marginTop: 20,
              width: windowWidth - 30,
            }}
          >
            <Text style={styles.label}>Cliente</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("cliente")}
              value={values.cliente}
              selectionColor={"#000"}
            />

            {errors.cliente && touched.cliente && (
              <Text style={styles.error}>{errors.cliente}</Text>
            )}

            {Array.from(Array(productInput)).map((item, index) => {
              return (
                <ProductInput
                  key={index}
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              );
            })}

            {errors.lastName && touched.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Button
                titleStyle={{ color: "#000", fontSize: 18 }}
                buttonStyle={styles.button}
                onPress={() => setProductInput(productInput + 1)}
                title="+ Productos"
              />
              <Button
                titleStyle={{ color: "#000", fontSize: 18 }}
                buttonStyle={styles.button}
                onPress={handleSubmit}
                title="Guardar"
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Venta;

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
    marginVertical: 10,
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
    marginTop: 50,

    alignItems: "center",
    justifyContent: "center",
  },
});
