import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { Icon, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import ItemDeComprobante from "../components/ItemDeComprobante";
import ExcelExport from "../components/ExcelExport";
import PopUp from "../components/PopUp";
import { db } from "../firebase/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import PrintPDFComprobante from "../context/PrintPDFComprobante";
import UserContext from "../context/UserContext";
import moment from "moment";

const windowWidth = Dimensions.get("window").width;

const DetalleComprobante = ({ navigation, route }) => {
  const { setSpinner, setError, throwError } = useContext(UserContext);
  const { colors } = useTheme();
  const [popup, setPopup] = useState(false);
  const [facturas, setFactura] = useState([]);
  const idFactura = route.params;
  const [items, setItems] = useState();
  const [fecha, setFecha] = useState();
  const [monto, setMonto] = useState();

  const traerDatos = async () => {
    try {
      const docRef = doc(db, "Facura", idFactura);
      const docSnap = await getDoc(docRef);
      setFactura(docSnap.data());
      setItems(docSnap.data().productos);
      date = moment(docSnap.data()?.fecha.seconds * 1000).format("DD/MMM/YY");
      // let auxFecha = String(new Date(docSnap.data()?.fecha.seconds * 1000)).split(' ')
      // let fechaReal = auxFecha[1]+'-'+auxFecha[2]+'-'+auxFecha[3]
      setFecha(date);
      const sumall = docSnap
        .data()
        .productos.map((item) => item.total)
        .reduce((prev, curr) => prev + curr, 0);
      setMonto(sumall);
    } catch (e) {
      console.log(e);
      throwError(e);
    }
  };

  useEffect(() => {
    traerDatos();
    console.log(items);
  }, []);

  const exportDetail = () => {
    setPopup(true);
  };
  /////FALTA PASAR NOMBRE #coprobante y fecha
  const confirmationExport = (remove, format = null) => {
    remove
      ? (setPopup(false),
        format === "PDF" ? PrintPDFComprobante(items,fecha) : ExcelExport(items))
      : setPopup(false);
  };

  const renderItem = ({ item, index }) => {
    return <ItemDeComprobante item={item} index={index} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.buttonsView}>
        <Button
          onPress={() => exportDetail(items)}
          iconPosition="right"
          titleStyle={{ color: colors.text, fontSize: 14, paddingLeft: 8 }}
          buttonStyle={{
            elevation: 0,
            backgroundColor: "transparent",
            height: 40,
            width: 120,
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 18,
          }}
        >
          Exportar
          <Icon color={colors.text} name="chevrons-down" type="feather" />
        </Button>
      </View>

      <View
        style={{ margintextAlign: "left", minWidth: "100%", paddingLeft: 5 }}
      >
        <Text
          style={{
            fontSize: 22,
            padding: 2,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          {facturas?.cliente}
        </Text>
        <Text style={{ fontSize: 18, padding: 2, color: colors.text }}>
          Comprobante
          <Text style={{ fontWeight: "bold", color: colors.text }}>
            #{idFactura}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 18,
            padding: 2,
            paddingBottom: 10,
            color: colors.text,
          }}
        >
          Fecha:
          <Text style={{ fontWeight: "bold", color: colors.text }}>
            {fecha}
          </Text>
        </Text>
      </View>
      <FlatList
        ListFooterComponentStyle={{ paddingRight: 10 }}
        ListFooterComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginRight: 20,
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                height: 100,
                fontWeight: "bold",
                fontSize: 20,
                color: colors.text,
              }}
            >
              TOTAL : $ {monto}
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View
            style={[
              styles.headerStyle,
              { backgroundColor: colors.primary, flexDirection: "row" },
            ]}
          >
            <Text
              style={{
                marginLeft: 10,
                flexWrap: "wrap",
                minWidth: windowWidth * 0.35,
                color: colors.text,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Producto
            </Text>
            <Text
              style={{
                flexWrap: "wrap",
                color: colors.text,
                minWidth: windowWidth * 0.1,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Cant.
            </Text>
            <Text
              style={{
                color: colors.text,
                minWidth: windowWidth * 0.25,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              $ Uni.
            </Text>
            <Text
              style={{
                color: colors.text,
                minWidth: windowWidth * 0.25,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              $ Parcial
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <ActivityIndicator
            style={{ marginTop: 200 }}
            size="large"
            color={colors.primary}
          />
        )}
        horizontal={false}
        overScrollMode={"never"}
        style={{
          width: "100%",
        }}
        data={
          items
          // filter !== ""
          //   ? products.filter((item) =>
          //       item.description.toLowerCase().includes(filter.toLowerCase())
          //     )
          //   : prod
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      ></FlatList>

      <PopUp
        visibility={popup}
        message={"Selecciona el formato para exportar"}
        child={
          <View style={[styles.buttonContainer]}>
            <View style={styles.buttonHeader}>
              <Button
                titleStyle={[styles.buttonText, { color: colors.text }]}
                buttonStyle={[
                  styles.buttonDialog,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => confirmationExport(true, "PDF")}
              >
                PDF
              </Button>
              <Button
                titleStyle={[styles.buttonText, { color: colors.text }]}
                buttonStyle={[
                  styles.buttonDialog,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => confirmationExport(true, "XLS")}
              >
                XLS
              </Button>
            </View>
            <Button
              titleStyle={[styles.buttonText, { color: colors.text }]}
              buttonStyle={[
                styles.buttonBottom,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => confirmationExport(false)}
            >
              CANCELAR
            </Button>
          </View>
        }
      />
    </View>
  );
};

export default DetalleComprobante;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    marginVertical: 5,
  },
  actionsButtons: {
    width: "100%",
    height: 50,
    borderWidth: 0,
    marginBottom: 15,
  },
  information: {
    borderWidth: 1,
    width: "95%",
    height: 240,
    borderRadius: 20,
    padding: 10,
    display: "flex",
    justifyContent: "space-evenly",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemInfo: {
    flexDirection: "row",
  },
  value: {
    fontSize: 16,
  },
  buttonDialog: {
    borderRadius: 30,
    borderWidth: 1,
    width: 90,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
  buttonsView: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    paddingHorizontal: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
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
