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

const ProductInput = ({ id, handleData,confirm }) => {
  const [cantidad, setCantidad] = useState(1);
  const { colors } = useTheme();
  const [producto, setProducto] = useState("");
  const [edit, setEdit] = useState(true);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "70%" }}>
        <Text style={styles.label}>Producto</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(d) => {
            setProducto(d);
          }}
          editable={edit ? true : false}
          selectionColor={"#000"}
        />
      </View>

      <View style={{ width: "30%", alignItems: "center" }}>
        <Text style={styles.label}>Cantidad</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="remove"
            type="ionicon"
            color={colors.text}
            onPress={() => {
              edit&& setCantidad((prev) => prev - 1);
            }}
          />
          <Text
            style={[styles.textInput, { textAlign: "center", width: "30%" }]}
          >
            {cantidad}
          </Text>
          <Icon
            name="add"
            type="ionicon"
            color={colors.text}
            onPress={() => {
              edit&& setCantidad((prev) => prev + 1);
            }}
          />
        </View>
        <Icon
          name="checkmark"
          type="ionicon"
          color="green"
          onPress={() => {
            setEdit(false);
            confirm((prev)=>prev+1)
            handleData((prev) => [...prev, { producto, cantidad }]);
          }}
        />
      </View>
     
    </View>
  );
};

export default ProductInput;

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
