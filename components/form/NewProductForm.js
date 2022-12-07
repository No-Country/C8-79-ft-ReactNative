import { StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@rneui/themed";
import PopUp from "../PopUp";
import { useNavigation, useTheme } from "@react-navigation/native";

const NewProductForm = () => {
  const { colors } = useTheme();
  const nav = useNavigation();

  const [popup, setPopup] = useState(false);

  const submitForm = (values, clear) => {
    console.log(values);
    setPopup(true);
    clear();
    setTimeout(() => {
      setPopup(false), nav.navigate("ProductScreen");
    }, 1000);
  };

  const addProduct = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        nombre: "",
        descripcion: "",
        precioVenta: "",
        precioCompra: "",
        cantidad: "",
        codigo: "",
      }}
      validationSchema={Yup.object({
        nombre: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Debe completar este campo"),

        descripcion: Yup.string()
          .max(80, "Must be 80 characters or less")
          .required("Debe completar este campo"),
        precioVenta: Yup.string().required("Debe completar este campo"),
        precioCompra: Yup.string().required("Debe completar este campo"),
        cantidad: Yup.string()
          .max(5, "Must be 5 characters or more")
          .required("Debe completar este campo"),
          codigo: Yup.string()
          .max(6, "Must be 6 characters or more")
          .min(6, "Must be 6 characters or less")
          .required("Debe completar este campo"),
      })}
      onSubmit={(values, { resetForm }) => {
        submitForm(values, resetForm);
        addProduct(values);
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
        <FlatList
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          style={styles.form}
          ListHeaderComponent={
            <>
              <Text style={[styles.label, { color: colors.text }]}>Nombre</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { backgroundColor: colors.card, color: colors.text },
                ]}
                onChangeText={handleChange("nombre")}
                value={values.nombre}
                selectionColor={colors.text}
              />
              {errors.nombre && touched.nombre && (
                <Text style={styles.error}>{errors.nombre}</Text>
              )}
              <Text style={[styles.label, { color: colors.text }]}>
                Descripcion
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  { backgroundColor: colors.card, color: colors.text },
                ]}
                onChangeText={handleChange("descripcion")}
                value={values.descripcion}
                selectionColor={colors.text}
              />
              {errors.descripcion && touched.descripcion && (
                <Text style={styles.error}>{errors.descripcion}</Text>
              )}

              <Text style={[styles.label, { color: colors.text }]}>
                Precio de venta
              </Text>
              <TextInput
                keyboardType={"numeric"}
                style={[
                  styles.textInput,
                  { backgroundColor: colors.card, color: colors.text },
                ]}
                onChangeText={handleChange("precioVenta")}
                value={values.precioVenta}
                selectionColor={colors.text}
              />
              {errors.precioVenta && touched.precioVenta && (
                <Text style={styles.error}>{errors.precioVenta}</Text>
              )}
              <Text style={[styles.label, { color: colors.text }]}>
                Precio de compra
              </Text>

              <TextInput
                keyboardType={"numeric"}
                style={[
                  styles.textInput,
                  { backgroundColor: colors.card, color: colors.text },
                ]}
                onChangeText={handleChange("precioCompra")}
                value={values.precioCompra}
                selectionColor={colors.text}
              />
              {errors.precioCompra && touched.precioCompra && (
                <Text style={styles.error}>{errors.precioCompra}</Text>
              )}

              <Text style={[styles.label, { color: colors.text }]}>
                Cantidad en stock
              </Text>

              <TextInput
                keyboardType={"numeric"}
                style={[
                  styles.textInput,
                  { backgroundColor: colors.card, color: colors.text },
                ]}
                onChangeText={handleChange("cantidad")}
                value={values.cantidad}
                selectionColor={colors.text}
              />

              {errors.cantidad && touched.cantidad && (
                <Text style={styles.error}>{errors.cantidad}</Text>
              )}

<Text style={[styles.label, { color: colors.text }]}>
                Codigo del producto
              </Text>

              <TextInput
                
                style={[
                  styles.textInput,
                  { backgroundColor: colors.card, color: colors.text },
                ]}
                onChangeText={handleChange("codigo")}
                value={values.codigo}
                selectionColor={colors.text}
              />

              {errors.codigo && touched.codigo && (
                <Text style={styles.error}>{errors.codigo}</Text>
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
                message="¡Se creo el Producto con exito!"
              ></PopUp>
            </>
          }
        ></FlatList>
      )}
    </Formik>
  );
};

export default NewProductForm;

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
