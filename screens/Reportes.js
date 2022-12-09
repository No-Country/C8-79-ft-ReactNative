import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Icon } from "@rneui/themed";
import PieChartComponent from "../components/PieChartComponent";
import BarGraphComponent from "../components/BarGraphComponent";

import DateRangeFilter from "../components/DateRangeFilter";
import moment from "moment";
import { useTheme } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import { Context } from "../context/ContextProvider";

const Reportes = () => {
  const { setSpinner, setError, throwError } = useContext(UserContext);
  const { bandera, handleBandera } = useContext(Context);
  const [facturas, setFacturas] = useState([]);
  const [comprobante, setComprobante] = useState();
  const [bandera2, setBandera2] = useState(false);
  const [filtered, setfiltered] = useState([]);
  const [ingreso, setIngreso] = useState("0");
  const [ganancia, setGanancia] = useState("0");
  const [mejorCliente, setMejorCliente] = useState(null);
  const [masVendido, setMasVendido] = useState(null);
  const [mejorClientes, setMejorClientes] = useState(null);

  const { colors } = useTheme();
  const [filter, setFilter] = useState({
    startDate: moment().startOf("month"),
    endDate: moment(),
    displayedDate: moment(),
    visibility: false,
    data: [],
  });


  const populate= (arr)=>{


    const ingresoTemp = arr
    .map((item) => item.productos.map((item) => item.total))
    .flat()
    .reduce((prev, curr) => prev + curr, 0);
  setIngreso(ingresoTemp);

  const gananciaTemp =
    ingresoTemp -
    arr
      .map((item) =>
        item.productos.map((item) => item.precioCompra * item.cantidad)
      )
      .flat()
      .reduce((prev, curr) => prev + curr, 0);
  setGanancia(gananciaTemp);

  const mejorClienteTemp = Array.from(
    arr
      .map((item) => ({
        cliente: item.cliente,
        total: item.productos.reduce((prev, acc) => prev + acc.total, 0),
      }))
      .reduce(
        (prev, acc) =>
          prev.set(acc.cliente, (prev.get(acc.cliente) || 0) + acc.total),
        new Map()
      ),
    (item) => item
  ).reduce((prev, acc) => (prev > acc ? acc : prev));
  setMejorCliente(mejorClienteTemp[0]);

  const masVendidoTemp = Array.from(
    arr
      .map((item) =>
        item.productos.map((item) => {
          return { producto: item.producto, cantidad: item.cantidad };
        })
      )
      .flat()

      .reduce(
        (prev, acc) =>
          prev.set(
            acc.producto,
            (prev.get(acc.producto) || 0) + acc.cantidad
          ),
        new Map()
      ),
    (item) => item
  ).sort((a, b) => b[1] - a[1]);
  const colorForGraph = [
    "#99CCCC",
    "#E2ADA1",
    "#C7C7C7",
    "#6B9FAB",
    "#B8DAE2",
  ];
  const formatoParaGraphVendido = masVendidoTemp
    .slice(0, 5)
    .map((item, index) => {
      return {
        name: item[0],
        population: item[1],
        color: colorForGraph[index],
        legendFontColor: colors.text,
        legendFontSize: 15,
      };
    });

  setMasVendido(formatoParaGraphVendido);

  const mejorClientesTemp = Array.from(
    arr
      .map((item) => ({
        cliente: item.cliente,
        total: item.productos.reduce((prev, acc) => prev + acc.total, 0),
      }))
      .reduce(
        (prev, acc) =>
          prev.set(acc.cliente, (prev.get(acc.cliente) || 0) + acc.total),
        new Map()
      ),
    (item) => item
  ).sort((a, b) => b[1] - a[1]);

  const formatoParaGraphCliente = mejorClientesTemp
    .slice(0, 5)
    .map((item, index) => {
      return {
        name: item[0],
        population: item[1],
        color: colorForGraph[index],
        legendFontColor: colors.text,
        legendFontSize: 15,
      };
    });

  setMejorClientes(formatoParaGraphCliente);
  }

  const traerDatos = async () => {
    try {
      const array = [];
      const querySnapshot = await getDocs(collection(db, "Facura"));
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setFilter(prev=>{return{...prev,data:array}})
      setFacturas(array);
      // console.log(array);

      // array.forEach((obj) => {
      //   //date = moment(factura?.fecha.seconds * 1000).format("DD/MMM/YY");
      //   // auxFecha = String(new Date(factura?.fecha.seconds * 1000)).split(' ')
      //   //fechaReal = auxFecha[1]+'-'+auxFecha[2]+'-'+auxFecha[3]

      //   const costoTotal = obj.productos
      //     .map((item) => item.precioCompra * item.cantidad)
      //     .reduce((prev, curr) => prev + curr, 0);

      //   // const objeto = {
      //   //   cliente: factura.cliente,
      //   //   operacion: "Venta",
      //   //   fecha: date,
      //   //   id: factura.id,
      //   //   monto: sumall,
      //   // };
      //   // arrayFecha.push(objeto);
      // });

     

      //setFilter((prev) => ({ ...prev, data: arrayFecha }));
      //setComprobante(arrayFecha);
      setSpinner(false);
      return array
    } catch (e) {
      console.log(e);
      setSpinner(false);
      throwError(e);
    }
  };
 
  const aux=async()=>{
    const a=  await traerDatos()
    if (a){
      populate(a)
    }
    
     
  }

  useEffect(() => {
    setSpinner(true);
    aux()
    
   
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
          item.fecha.seconds > filter.startDate.unix() -4000&&
          item.fecha.seconds < end.unix()+50000
      )
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

  return (
    <View style={{ height: "100%", backgroundColor: colors.background }}>
      <DateRangeFilter
        state={filter}
        close={closeFilter}
        handleFilter={handleFilter}
      ></DateRangeFilter>
      <ScrollView
        contentContainerStyle={[
          styles.globalContainer,
          { backgroundColor: colors.background },
        ]}
        overScrollMode="never"
      >
        <View style={styles.topContainer}>
          <Icon
            style={{ marginLeft: 10 }}
            name="calendar"
            type="ionicon"
            color={colors.text}
            onPress={() =>
              setFilter((prev) => ({
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
        <View style={styles.resume}>
          <Text
            style={{
              color: colors.text,
              width: "100%",
              textAlign: "center",
              fontSize: 22,
              marginVertical: 15,
            }}
          >
            Resumen
          </Text>
          <View
            style={{ flexDirection: "row", width: "85%", flexWrap: "wrap" }}
          >
            <Text
              style={[
                styles.resumeText,
                {
                  borderLeftWidth: 0,
                  fontWeight: "bold",
                  color: colors.text,
                  borderColor: colors.primary,
                },
              ]}
            >
              Ingresos
            </Text>
            <Text
              style={[
                styles.resumeText,
                {
                  borderRightWidth: 0,
                  fontWeight: "bold",
                  color: colors.text,
                  borderColor: colors.primary,
                },
              ]}
            >
              Ganancia
            </Text>
            <Text
              style={[
                styles.resumeText,
                {
                  color: colors.text,
                  borderLeftWidth: 0,
                  borderColor: colors.primary,
                },
              ]}
            >
              {ingreso}
            </Text>
            <Text
              style={[
                styles.resumeText,
                {
                  color: colors.text,
                  borderRightWidth: 0,
                  borderColor: colors.primary,
                },
              ]}
            >
              {ganancia}
            </Text>
          </View>
        </View>
        <View style={styles.bestClient}>
          <Text style={[styles.bestClientText, { color: colors.text }]}>
            Mejor cliente:
          </Text>
          <Text
            style={[
              styles.bestClientText,
              {
                width: "100%",
                textAlign: "center",
                color: colors.text,
                fontWeight: "bold",
              },
            ]}
          >
            {mejorCliente}
          </Text>
        </View>

        <View
          style={[
            styles.graph,
            { backgroundColor: colors.background, borderColor: colors.primary },
          ]}
        >
          <PieChartComponent
            title={"Productos mas vendidos"}
            data={masVendido ? masVendido : []}
          />
        </View>
        <View
          style={[
            styles.graph,
            { backgroundColor: colors.background, borderColor: colors.primary },
          ]}
        >
          <PieChartComponent
            title={"Mejores Clientes"}
            data={mejorClientes ? mejorClientes : []}
          />
        </View>
        {/* <View style={styles.graph}>
          <BarGraphComponent dates={filter} title={"Ganancias"} />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Reportes;

const styles = StyleSheet.create({
  globalContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topContainer: {
    marginTop: 20,
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
});
