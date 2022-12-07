import { StyleSheet, TextInput, Text, View } from "react-native";
import React, { useState } from "react";

import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

const ProductInput = ({ handleData, confirm }) => {
  const [cantidad, setCantidad] = useState(1);
  const { colors } = useTheme();
  const [producto, setProducto] = useState("");
  const [edit, setEdit] = useState(true);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "60%" }}>
        <Text style={[styles.label, { color: colors.text }]}>Producto</Text>
        <TextInput
          style={[
            styles.textInput,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          onChangeText={(d) => {
            setProducto(d);
          }}
          editable={edit ? true : false}
          selectionColor={colors.text}
        />
      </View>

      <View style={{ width: "30%", alignItems: "center" }}>
        <Text style={[styles.label, { color: colors.text }]}>Cantidad</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Icon
            style={{ padding: 5 }}
            name="remove"
            type="ionicon"
            color={colors.text}
            onPress={() => {
              edit && setCantidad(prev => (prev <= 1)?prev:(prev - 1))
            }}
          />
          <Text
            style={[
              styles.textInput,
              {
                textAlign: "center",
                width: "20%",
                backgroundColor: colors.card,
                color: colors.text,
                textAlignVertical: "center",
              },
            ]}
          >
            {cantidad}
          </Text>
          <Icon
            style={{ padding: 5 }}
            name="add"
            type="ionicon"
            color={colors.text}
            onPress={() => {
              edit && setCantidad((prev) => prev + 1);
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "10%",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 5,
        }}
      >
        {edit ? (
          <Icon
            style={{ padding: 5 }}
            name="checkmark"
            type="ionicon"
            color="green"
            onPress={() => {
              setEdit(false);
              confirm((prev) => prev + 1);
              handleData((prev) => [...prev, { producto, cantidad }]);
            }}
          />
        ) : (
          <Icon
            style={{ padding: 5 }}
            name="checkmark-done"
            type="ionicon"
            color="green"
          />
        )}
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
