import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState,useContext, useEffect } from "react";
import { Icon } from "@rneui/themed";
import PieChartComponent from "../components/PieChartComponent";
import BarGraphComponent from "../components/BarGraphComponent";
import { graphone, graphTwo } from "../helpers/devData";
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
 
  const {colors}=useTheme()
  const [filter, setFilter] = useState({
    startDate: moment().startOf("month"),
    endDate: moment(),
    displayedDate: moment(),
    visibility: false,
    data: [],
  
  })

  
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

      array.forEach((factura) => {
        date = moment(factura?.fecha.seconds * 1000).format("DD/MMM/YY");
        // auxFecha = String(new Date(factura?.fecha.seconds * 1000)).split(' ')
        //fechaReal = auxFecha[1]+'-'+auxFecha[2]+'-'+auxFecha[3]
        const todosProductos = factura.productos;
        const sumall = todosProductos
          .map((item) => item.total)
          .reduce((prev, curr) => prev + curr, 0);
        const objeto = {
          cliente: factura.cliente,
          operacion: "Venta",
          fecha: date,
          id: factura.id,
          monto: sumall,
        };
        arrayFecha.push(objeto);
      });

      setFilter((prev) => ({ ...prev, data: arrayFecha }));
      setComprobante(arrayFecha);
      setSpinner(false);
    } catch (e) {
      console.log(e);
      setSpinner(false);
      throwError(e);
    }
  };

  useEffect(() => {
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
    // const filteredArr = facturas
    //   .filter(
    //     (item) =>
    //       item.fecha.seconds > filter.startDate.unix() &&
    //       item.fecha.seconds < end.unix()
    //   )
    //   .map((item) => ({
    //     cliente: item.cliente,
    //     operacion: "Venta",
    //     fecha: item.fecha.seconds,
    //     id: item.id,
    //     monto: item.productos
    //       .map((item) => item.total)
    //       .reduce((prev, curr) => prev + curr, 0),
    //   }));

    setFilter((prev) => ({
      ...prev,
      visibility: false,
      //data: filteredArr,
    }));

    setSpinner(false);
  };
  

  return (
    <View style={{ height: "100%",backgroundColor:colors.background }}>
      <DateRangeFilter
        state={filter}
        close={closeFilter}
        handleFilter={handleFilter}
      ></DateRangeFilter>
      <ScrollView
        contentContainerStyle={[styles.globalContainer,{backgroundColor:colors.background}]}
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
          <Text style={{ marginRight: 10, fontSize: 16 ,color:colors.text}}>
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
              color:colors.text,
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
                { borderLeftWidth: 0, fontWeight: "bold" ,color:colors.text,borderColor:colors.primary},
              ]}
            >
              Ingresos
            </Text>
            <Text
              style={[
                styles.resumeText,
                { borderRightWidth: 0, fontWeight: "bold",color:colors.text,borderColor:colors.primary },
              ]}
            >
              Ganancia
            </Text>
            <Text style={[styles.resumeText, { color:colors.text,borderLeftWidth: 0,borderColor:colors.primary }]}>
              $80000
            </Text>
            <Text style={[styles.resumeText, { color:colors.text,borderRightWidth: 0,borderColor:colors.primary }]}>
              $80000
            </Text>
          </View>
        </View>
        <View style={styles.bestClient}>
          <Text style={[styles.bestClientText,{color:colors.text}]}>Mejor cliente: </Text>
          <Text
            style={[
              styles.bestClientText,
              { width: "100%", textAlign: "center",color:colors.text,fontWeight:"bold" },
            ]}
          >
            Nombre de cliente
          </Text>
        </View>

        <View style={[styles.graph,{backgroundColor:colors.background,borderColor:colors.primary}]}>
          <PieChartComponent title={"Productos mas vendidos"} data={graphone} />
        </View>
        <View style={[styles.graph,{backgroundColor:colors.background,borderColor:colors.primary}]}>
          <PieChartComponent title={"Mejores Clientes"} data={graphTwo} />
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
