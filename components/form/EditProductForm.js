import { StyleSheet, TextInput, Text, View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Icon } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation, useTheme } from "@react-navigation/native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { Context } from "../../context/ContextProvider";
import UserContext from "../../context/UserContext";
import { color } from "react-native-reanimated";

const EditProductForm = ({ product }) => {
  const { colors } = useTheme();
  const { handleBandera, bandera } = useContext(Context);
  const { setSpinner, throwError } = useContext(UserContext);
  const nav = useNavigation();

  const [popup, setPopup] = useState(false);

  const submitForm = async (formData, clear) => {
    try {
      setSpinner(true);
      const prod = doc(db, "Productos", product.codigo);
      await setDoc(prod, {
        nombre: formData.name,
        descripcion: formData.descripcion,
        precioCompra: formData.precioCompra,
        precioVenta: formData.precioVenta,
        cantidad: product.cantidad,
        codigo: product.codigo,
      });

      handleBandera();
      setSpinner(false);
      setPopup(true);
      clear();
      setTimeout(() => {
        setPopup(false), nav.navigate("ProductsScreen");
      }, 1000);
    } catch (error) {
      setSpinner(false);
      throwError(error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: product.nombre,
        descripcion: product.descripcion,
        precioCompra: String(product.precioCompra),
        precioVenta: String(product.precioVenta),
        cantidad: String(product.cantidad),
        categoria: product.codigo,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Debe completar este campo"),
        descripcion: Yup.string().required("Debe completar este campo"),
        precioCompra: Yup.number().required("Debe completar este campo"),
        precioVenta: Yup.number().required("Debe completar este campo"),
        cantidad: Yup.number().required("Debe completar este campo"),
        categoria: Yup.string().required("Debe completar este campo"),
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
            onChangeText={handleChange("name")}
            value={values.name}
            selectionColor={colors.text}
          />

          {errors.name && touched.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <Text style={[styles.label, { color: colors.text }]}>
            Descripción
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { color: colors.text, backgroundColor: colors.card },
            ]}
            onChangeText={handleChange("descripcion")}
            value={values.descripcion}
            selectionColor={colors.text}
          />

          {errors.descripcion && touched.descripcion && (
            <Text style={styles.error}>{errors.descripcion}</Text>
          )}

          <Text style={[styles.label, { color: colors.text }]}>
            Precio de Costo
          </Text>
          <TextInput
            keyboardType={"numeric"}
            style={[
              styles.textInput,
              { color: colors.text, backgroundColor: colors.card },
            ]}
            onChangeText={handleChange("precioCompra")}
            value={values.precioCompra}
            selectionColor={colors.text}
          />

          {errors.precioCompra && touched.precioCompra && (
            <Text style={styles.error}>{errors.precioCompra}</Text>
          )}

          <Text style={[styles.label, { color: colors.text }]}>
            Precio de Venta
          </Text>
          <TextInput
            keyboardType={"numeric"}
            style={[
              styles.textInput,
              { color: colors.text, backgroundColor: colors.card },
            ]}
            onChangeText={handleChange("precioVenta")}
            value={values.precioVenta}
            selectionColor={colors.text}
          />

          {errors.precioVenta && touched.precioVenta && (
            <Text style={styles.error}>{errors.precioVenta}</Text>
          )}

          <Text style={[styles.label, { color: colors.text }]}>Cantidad</Text>
          <TextInput
            keyboardType={"numeric"}
            style={[
              styles.textInput,
              { color: colors.text, backgroundColor: colors.card },
            ]}
            onChangeText={handleChange("cantidad")}
            value={values.cantidad}
            selectionColor={colors.text}
          />

          {errors.cantidad && touched.cantidad && (
            <Text style={styles.error}>{errors.cantidad}</Text>
          )}

          <Text style={[styles.label, { color: colors.text }]}>Codigo</Text>

          <TextInput
            style={[
              styles.textInput,
              { color: colors.text, backgroundColor: colors.card },
            ]}
            onChangeText={handleChange("categoria")}
            value={values.categoria}
            selectionColor={colors.text}
          />

          {errors.categoria && touched.categoria && (
            <Text style={styles.error}>{errors.categoria}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{ color: colors.text, fontSize: 18 }}
              buttonStyle={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
              title="Guardar cambios"
            />
          </View>
          <PopUp
            visibility={popup}
            message="¡Se guardaron los cambios con éxito!"
          ></PopUp>
        </ScrollView>
      )}
    </Formik>
  );
};
export default EditProductForm;

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
