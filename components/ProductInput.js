import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

const ProductInput = ({ handleData, confirm, data }) => {
  const [cantidad, setCantidad] = useState(1);
  const { colors } = useTheme();
  const [producto, setProducto] = useState("");
  const [edit, setEdit] = useState(true);
  //console.log(data.map((item) => item.nombre));
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
      }}
    >
      <View style={{ width: "100%" }}>
        <Text style={[styles.label, { color: colors.text }]}>Producto</Text>

        <SelectDropdown
          disabled={!edit ? true : false}
          defaultButtonText="Selecciona un Producto"
          buttonStyle={{
            width: "100%",
            borderRadius: 10,
            backgroundColor: colors.card,
          }}
          dropdownStyle={{ backgroundColor: colors.card }}
          rowTextStyle={{ color: colors.text }}
          buttonTextStyle={{ color: colors.text }}
          searchInputStyle={{ backgroundColor: colors.primary }}
          searchInputTxtColor={colors.text}
          data={data.map((item) => item.nombre)}
          onSelect={(selectedItem, index) => {
            setProducto(selectedItem);
          }}
          search
        />
      </View>

      <View
        style={{ width: "100%", alignItems: "center", flexDirection: "row" }}
      >
        <View style={{ alignItems: "center", width: "60%" }}>
          <Text style={[styles.label, { color: colors.text }]}>Cantidad</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{ backgroundColor: colors.primary, borderRadius: 5 }}
              onPress={() => {
                edit && setCantidad((prev) => (prev <= 1 ? prev : prev - 1));
              }}
            >
              <Icon
                style={{ padding: 5 }}
                name="remove"
                type="ionicon"
                color={colors.text}
              />
            </TouchableOpacity>
            <Text
              includeFontPadding={false}
              style={[
                styles.textInput,
                {
                  marginHorizontal: 10,
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
            <TouchableOpacity
              style={{ backgroundColor: colors.primary, borderRadius: 5 }}
              onPress={() => {
                edit && setCantidad((prev) => prev + 1);
              }}
            >
              <Icon
                style={{ padding: 5 }}
                name="add"
                type="ionicon"
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "40%", alignItems: "center" }}>
          <Text
            style={[styles.label, { color: colors.text, textAlign: "center" }]}
          >
            {edit ? "Pendiente" : "Confirmado"}{" "}
          </Text>

          <TouchableOpacity
            style={{ backgroundColor: colors.primary, borderRadius: 5,marginBottom:5 }}
            onPress={() => {
              setEdit(false);
              confirm((prev) => prev + 1);

              let i=data.map(item=>item.nombre).indexOf(producto)
              let codigo=data[i].codigo 
              handleData((prev) => [...prev, { producto, cantidad ,codigo}]);
            }}
          >
            <Icon
              style={{ padding: 5 }}
              name={edit ? "checkmark": "checkmark-done" }
              type="ionicon"
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
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
    width: "70%"
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
    width: "100%",
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
