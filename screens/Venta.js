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
import { useEffect ,useContext} from "react";
import {
  collection,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Config";
import SelectDropdown from "react-native-select-dropdown";
import { random } from "../helpers/random";
import { color } from "react-native-reanimated";
import UserContext from "../context/UserContext";
import { Context } from "../context/ContextProvider";

const windowWidth = Dimensions.get("window").width;

const Venta = () => {
  const {setSpinner,setError} = useContext(UserContext)
  const { colors } = useTheme();
  const [productInput, setProductInput] = useState(1);
  const [cliente, setCliente] = useState("");
  const [productData, setProductData] = useState([]);
  const [confirmation, setConfirmation] = useState(0);
  const [clientesFire, setClientesFire] = useState([]);
  const [productos, setProductos] = useState([]);
  const [idCodigo, setIdCodigo] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const {bandera, handleBandera} = useContext(Context)
  const [productos2, setProductos2] = useState([])
  const ram = random();

  

  const submit = async (data) => {
   console.log("desde submit",productData)
   
    console.log(productos2)
    let bandera = true;
   
    for (let i = 0; i < productData.length; i++) {
      bandera = productos.includes(productData[i].producto);
      if (bandera == false) {
        break;
      }
    }

    const aux = cliente.split(" ");
    const id = aux[aux.length - 1];
    const auxCliente = aux[0] + " " + aux[1];
    console.log(auxCliente)
    let arrayProductData = []
    for(let i = 0; i < productData.length; i++){
      let indice = allProducts.findIndex(e => e.nombre === productData[i].producto) 
      const objeto = {
        producto: productData[i].producto,
        nombre: allProducts[indice].nombre,
        cantidad: productData[i].cantidad,
        precioUnitario: allProducts[indice].precioVenta,
        precioCompra: allProducts[indice].precioCompra,
        total: productData[i].cantidad * allProducts[indice].precioVenta
      }
      arrayProductData.push(objeto)
      console.log(arrayProductData)
    };

    console.log(confirmation , productInput, bandera)
    if (confirmation === productInput && bandera === true) {
      const comprobante = {
        fecha: new Date(),
        cliente: auxCliente,
        productos: [
          ...arrayProductData, 
          
      ],
        id: ram,
      };

      await setDoc(doc(db, "Facura", ram), comprobante);

      const docRef = doc(db, "Clientes", id);
      await updateDoc(docRef, {
        cantidad: increment(1),
      });

      productData.forEach(async (e) => {
        const docRef = doc(db, "Productos", e.codigo);
        await updateDoc(docRef, {
          cantidad: increment(-e.cantidad),
          totalVentas: increment(e.cantidad),
        });
      });
      handleBandera()
      reset()
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
    const array = [];
    const querySnapshot = await getDocs(collection(db, "Clientes"));
    querySnapshot.forEach((doc) => {
   
      const nombre =
        doc.data().firstName + " " + doc.data().lastName +"                                                                                                      "+doc.data().id
              
      array.push(nombre);
    });
   // console.log(array)
    setClientesFire(array);

    const array2 = [];
    const arrayPrecioUniario = []
    const prod=[]

    const querySnapshot2 = await getDocs(collection(db, "Productos"));
    querySnapshot2.forEach((doc) => {
      const codigo = doc.data().nombre;
      const precioUnitario = {
       precioVenta: doc.data().precioVenta, 
       precioCompra: doc.data().precioCompra, 
       nombre: doc.data().nombre,
       codigo: doc.data().codigo
      }
      array2.push(codigo);
      arrayPrecioUniario.push(precioUnitario)
    });
    querySnapshot2.forEach((doc) => {
      prod.push(doc.data());
    });
   
    setProductos2(prod);
    setProductos(array2);
    setAllProducts(arrayPrecioUniario)
    setSpinner(false)
  };


  useEffect(() => {
    traerDatos();
    setSpinner(true)
  }, [bandera]);

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
        <Text style={[styles.label, { color: colors.text }]}>Cliente</Text>

        
          <SelectDropdown
            defaultButtonText="Selecciona un contacto"
            buttonStyle={{
              width: "100%",
              borderRadius: 10,
              backgroundColor: colors.card,
            }}
           
            dropdownStyle={{ backgroundColor: colors.card }}
            
            rowTextStyle={{color:colors.text}}
            buttonTextStyle={{ color: colors.text }}
            searchInputStyle={{ backgroundColor:colors.primary,  }}
            searchInputTxtColor={colors.text}
            data={clientesFire}
            onSelect={(selectedItem, index) => {
              setCliente(selectedItem);
            }}
            search
          />
       

        {Array.from(Array(productInput)).map((item, index) => {
          return (
            <ProductInput
              key={index}
              id={index}
              handleData={setProductData}
              confirm={setConfirmation}
              data={productos2}
            />
          );
        })}

        <View style={styles.buttonContainer}>
          <Button
            titleStyle={{ color: colors.text, fontSize: 18 }}
            buttonStyle={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => reset()}
            title={"Reiniciar"}
          />
          <Button
            titleStyle={{ color: colors.text, fontSize: 18 }}
            buttonStyle={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => setProductInput(productInput + 1)}
            title={"+ productos"}
          />
          <Button
            titleStyle={{ color: colors.text, fontSize: 18 }}
            buttonStyle={[styles.button, { backgroundColor: colors.primary }]}
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
