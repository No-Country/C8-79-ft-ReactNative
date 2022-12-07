import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

import { Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import ProductInput from "../components/ProductInput";
import { resetPassword } from "../firebase/session";

const windowWidth = Dimensions.get("window").width;

const Venta = () => {
  const { colors } = useTheme();
  const [productInput, setProductInput] = useState(1);
  const [cliente, setCliente] = useState("");
  const [productData, setProductData] = useState([]);
  const [confirmation, setConfirmation] = useState(0);

  const submit = (data) => {
    if (confirmation === productInput) {
      const comprobante = {
        fecha: new Date(),
        cliente: cliente,
        productos: {
          ...productData,
        },
      };
      return comprobante;
    } else {
      console.log("debe completar");
    }
  };

const reset=()=>{
setProductInput(0)
setConfirmation(0)
setProductData([])
setCliente("")

  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
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
          onChangeText={(d) => setCliente(d)}
          selectionColor={"#000"}
        />

        {Array.from(Array(productInput)).map((item, index) => {
          return (
            <ProductInput
              key={index}
              id={index}
              handleData={setProductData}
              confirm={setConfirmation}
            />
          )
        })}

        <View style={styles.buttonContainer}>
        <Button
            titleStyle={{ color: "#000", fontSize: 18 }}
            buttonStyle={styles.button}
            onPress={() => reset()}
            title={"Reiniciar"}
          />
          <Button
            titleStyle={{ color: "#000", fontSize: 18 }}
            buttonStyle={styles.button}
            onPress={() => setProductInput(productInput + 1)}
            title={"+ productos"}
          />
          <Button
            titleStyle={{ color: "#000", fontSize: 18 }}
            buttonStyle={styles.button}
            onPress={() => submit()}
            title={"Confirmar"}
          />
        </View>
      </ScrollView>
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
marginBottom:20,
    alignItems: "center",
    justifyContent: "center",
  },
});
