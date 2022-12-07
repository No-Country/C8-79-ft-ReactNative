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
import { useEffect } from "react";
import { collection, doc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import SelectDropdown from 'react-native-select-dropdown'
import { random } from "../helpers/random";


const windowWidth = Dimensions.get("window").width;

const Venta = () => {
  const { colors } = useTheme();
  const [productInput, setProductInput] = useState(1);
  const [cliente, setCliente] = useState("");
  const [productData, setProductData] = useState([]);
  const [confirmation, setConfirmation] = useState(0);
  const [clientesFire, setClientesFire] = useState([]);
  const [productos, setProductos] = useState([]);
  const [idCodigo, setIdCodigo] = useState([])
  const ram = random()
 

  const submit = async(data) => {
    let bandera = true
    for (let i = 0; i < productData.length; i++) {
      bandera  = productos.includes(productData[i].producto) 
      if(bandera == false){
        break
      }
    }

    

    
    const aux = cliente.split(' ')
    const id = aux[aux.length-1]
    const auxCliente = aux[0] + " " + aux[1] 
    

    if (confirmation === productInput && bandera === true) {
      
      const comprobante = {
        fecha: new Date(),
        cliente: auxCliente,
        productos: {
          ...productData,
        },
        id: ram
      };
     
      await setDoc(doc(db, "Facura", ram ), comprobante);

      const docRef = doc(db, "Clientes", id);
      await updateDoc(docRef, {
        cantidad : increment(1)
      });

      productData.forEach(async(e) => {
        const docRef = doc(db, "Productos", e.producto);
        await updateDoc(docRef, {
          cantidad : increment(-e.cantidad),
          totalVentas: increment(e.cantidad)
        });
      });


      return comprobante;
    } else {
      console.log("debe completar o su codigo de producto es invalido");
    }
  };

  const reset = () => {
    setProductInput(0);
    setConfirmation(0);
    setProductData([]);
    setCliente("");
  };

  const traerDatos = async () => {
    const array = []
    const querySnapshot = await getDocs(collection(db, "Clientes"));
    querySnapshot.forEach((doc) => {
      const nombre = doc.data().firstName + ' ' + doc.data().lastName + ' ' + doc.data().id
      array.push(nombre);

    });
    setClientesFire(array)

    const array2 = [];

    const querySnapshot2 = await getDocs(collection(db, "Productos"));
    querySnapshot2.forEach((doc) => {
      
      
      const codigo = doc.data().codigo
      array2.push(codigo);
   
    });
    setProductos(array2);
  
  };
  
  useEffect(() => {
    
    traerDatos()
    console.log(productos)
   
   
  }, [])

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

        {
          clientesFire.length > 0 ? 
            <SelectDropdown  
              data={clientesFire}
              onSelect={(selectedItem, index) => {
                setCliente(selectedItem)
              }}
              search
              
            />
          : null
        }


        {Array.from(Array(productInput)).map((item, index) => {
          return (
            <ProductInput
              key={index}
              id={index}
              handleData={setProductData}
              confirm={setConfirmation}
            />
          );
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
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
