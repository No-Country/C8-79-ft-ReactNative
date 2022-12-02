import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const Reportes = () => {
  return (
    <View style={{ height: "100%" }}>
      <ScrollView
        contentContainerStyle={styles.globalContainer}
        overScrollMode="never"
      >
        <View style={styles.topContainer}>
          <Icon
            style={{ marginLeft: 10 }}
            name="calendar"
            type="ionicon"
            color="#000"
            onPress={() => console.log("hello")}
          />
          <Text style={{ marginRight: 10, fontSize: 20 }}>Diciembre 2022</Text>
        </View>
        <View style={styles.resume}>
          <Text style={{ width: "100%", textAlign: "center", fontSize: 22,marginVertical:15 }}>Resumen </Text>
          <View style={{ flexDirection:"row", width:"85%",flexWrap:"wrap"}}>
            <Text style= {[styles.resumeText,{borderLeftWidth:0,fontWeight:"bold"}]}>Ingresos</Text>
            <Text style= {[styles.resumeText,{borderRightWidth:0,fontWeight:"bold"}]}>Ganancia</Text>
            <Text style= {[styles.resumeText,{borderLeftWidth:0}]}>$80000</Text>
            <Text style= {[styles.resumeText,{borderRightWidth:0}]}>$80000</Text>
          </View>
        </View>
        <View style={styles.bestClient}>
          <Text style={styles.bestClientText}>Mejor cliente: </Text>
          <Text
            style={[
              styles.bestClientText,
              { width: "100%", textAlign: "center" },
            ]}
          >
            Nombre de cliente
          </Text>
        </View>
        <View style={styles.graph}>
          <Text>Diciembre 2022</Text>
        </View>
        <View style={styles.graph}>
          <Text>Diciembre 2022</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Reportes;

const styles = StyleSheet.create({
  globalContainer: {
    flexGrow: 1,

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
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 400,
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
  resumeText:{
    fontSize:20,
    borderWidth:1,
    borderColor:"#A1D6E2",
width:"50%",
textAlign:"center",
paddingVertical:5
  },
});
