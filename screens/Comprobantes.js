import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import DateRangeFilter from "../components/DateRangeFilter";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
import Comprobante from "../components/Comprobante";
import UserContext from "../context/UserContext";
import { collection, getDocs,deleteDoc ,doc} from "firebase/firestore";
import { db } from "../firebase/Config";
import { Context } from "../context/ContextProvider";
import ArrowAnimated from "../components/AnimatedArrow";

const windowWidth = Dimensions.get("window").width;

const Comprobantes = () => {
  const { colors } = useTheme();
  const { setSpinner, setError, throwError } = useContext(UserContext);
  const { bandera, handleBandera } = useContext(Context);
  const [facturas, setFacturas] = useState([]);
  const [comprobante, setComprobante] = useState();
  const [loading, setLoading] = useState(false)

  

  const [filter, setFilter] = useState({
    startDate: moment().startOf("month"),
    endDate: moment(),
    displayedDate: moment(),
    visibility: false,
    data: [],
  });

  const traerDatos = async () => {
    try {
      const array = [];
      const querySnapshot = await getDocs(collection(db, "Facura"));
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });

      setFacturas(array);
      let auxFecha;
      let fechaReal;
      let arrayFecha = [];
      let date;

      array.forEach(async (factura) => {

        //await deleteDoc(doc(db, "Facura", factura.id));
     
        // auxFecha = String(new Date(factura?.fecha.seconds * 1000)).split(' ')
        //fechaReal = auxFecha[1]+'-'+auxFecha[2]+'-'+auxFecha[3]
        const todosProductos = factura.productos;
        const sumall = todosProductos
          .map((item) => item.total)
          .reduce((prev, curr) => prev + curr, 0);
        const objeto = {
          cliente: factura.cliente,
          operacion: "Venta",
          fecha: factura?.fecha.seconds,
          id: factura.id,
          monto: sumall,
        };
        arrayFecha.push(objeto);
      });

      setFilter((prev) => ({ ...prev, data: arrayFecha }));
      setComprobante(arrayFecha);
      setSpinner(false);
      setLoading(false)
    } catch (e) {
      console.log(e);
      setSpinner(false);
      throwError(e);
    }
  };

  useEffect(() => {
    setLoading(true)
    setSpinner(true);
    traerDatos();
  }, [bandera]);

  const handleFilter = (obj) => {
    setFilter((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const closeFilter = (end) => {
   
    
    const filteredArr = facturas
      .filter(
        (item) =>
        (
          item.fecha.seconds >= filter.startDate.unix()-2000 &&
          item.fecha.seconds <= end.unix()+86280
      ))
      .map((item) => ({
        cliente: item.cliente,
        operacion: "Venta",
        fecha: item.fecha.seconds,
        id: item.id,
        monto: item.productos
          .map((item) => item.total)
          .reduce((prev, curr) => prev + curr, 0),
      }));

    setFilter((prev) => ({
      ...prev,
      visibility: false,
      data: filteredArr,
    }));

    setSpinner(false);
  };

  const renderItem = ({ item, index }) => {
    return <Comprobante item={item} index={index} />;
  };

  return (
    <View style={{ height: "100%", backgroundColor: colors.background }}>
      <DateRangeFilter
        state={filter}
        close={closeFilter}
        handleFilter={handleFilter}
      ></DateRangeFilter>
          {!loading?<ArrowAnimated/>:null}

     
      <View style={styles.topContainer}>
        <Icon
          style={{ marginLeft: 10 }}
          name="calendar"
          type="ionicon"
          color={colors.text}
          onPress={() =>
            setFilter((prev) => (
             
             {
              ...prev,
              visibility: true,
            }))
          }
        />
        <Text style={{ marginRight: 10, fontSize: 16, color: colors.text }}>
          <Text style={{ fontWeight: "bold" }}>
            {!filter.visibility && filter.startDate.format("DD/MMM/YY")}
          </Text>
          {" A "}
          <Text style={{ fontWeight: "bold" }}>
            {!filter.visibility && filter.endDate.format("DD/MMM/YY")}
          </Text>
        </Text>
      </View>
      {facturas ? (
        <ScrollView
          horizontal={true}
          overScrollMode={"never"}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: windowWidth * 2 }}
        >
          <FlatList
            ListHeaderComponent={() => (
              <View
                style={[
                  styles.headerStyle,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={{
                    //backgroundColor:"red",
                    marginLeft: 10,
                    width: windowWidth * 0.3,
                    color: colors.text,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Identificador
                </Text>
                <Text
                  style={{
                    //backgroundColor:"blue",
                    flexWrap: "wrap",
                    color: colors.text,
                    width: windowWidth * 0.7,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  Cliente
                </Text>
                <Text
                  style={{
                    // backgroundColor:"gray",
                    color: colors.text,
                    width: windowWidth * 0.6,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Fecha
                </Text>
                <Text
                  style={{
                    // backgroundColor:"yellow"
                    paddingRight: 30,
                    color: colors.text,
                    width: windowWidth * 0.4,
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Monto
                </Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text
                style={{
                  color: colors.text,
                  width: "50%",
                  textAlign: "center",
                  marginTop: 50,
                }}
              >
                No se encontraron coincidencias
              </Text>
            )}
            horizontal={false}
            overScrollMode={"never"}
            style={{
              width: "100%",
              height: "100%",
            }}
            data={filter.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
          />
        </ScrollView>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Comprobantes;

const styles = StyleSheet.create({
  globalContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topContainer: {
    marginVertical: 40,
    height: 40,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resume: {
    justifyContent: "center",
    alignItems: "center",

    width: "95%",
    height: 150,
  },
  bestClient: {
    justifyContent: "center",

    width: "95%",
    height: 100,
  },
  graph: {
    backgroundColor: "#A1D6E270",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 370,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    borderRadius: 20,
  },
  topSellClients: {
    justifyContent: "center",
    alignItems: "center",
    height: 450,
    width: "95%",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    borderRadius: 20,
  },
  bestClientText: {
    fontSize: 22,
    marginLeft: 10,
  },
  resumeText: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: "50%",
    textAlign: "center",
    paddingVertical: 5,
  },
  flatlist: {
    width: "100%",
    height: "80%",
  },
  container: {
    marginTop: 10,
    width: "95%",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    textAlign: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: "#BCBABB",
    borderWidth: 1,
    borderBottomColor: "#BCBABB",
    borderBottomWidth: 1,
  },
  buttonsView: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    paddingHorizontal: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#A1D6E2",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonDialog: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: 100,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonBottom: {
    borderRadius: 20,
    height: 50,
    marginTop: 20,
  },
});
