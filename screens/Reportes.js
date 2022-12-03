import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/themed";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

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
          <Text
            style={{
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
                { borderLeftWidth: 0, fontWeight: "bold" },
              ]}
            >
              Ingresos
            </Text>
            <Text
              style={[
                styles.resumeText,
                { borderRightWidth: 0, fontWeight: "bold" },
              ]}
            >
              Ganancia
            </Text>
            <Text style={[styles.resumeText, { borderLeftWidth: 0 }]}>
              $80000
            </Text>
            <Text style={[styles.resumeText, { borderRightWidth: 0 }]}>
              $80000
            </Text>
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
          <Text
            style={{
              width: "50%",
              textAlign: "center",
              fontSize: 20,
              marginLeft: 10,
              position: "absolute",
              top: 10,
              left: 0,
            }}
          >
            Productos mas vendidos
          </Text>
          <PieChart
            data={[
              {
                name: "Seoul",
                population: 20,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Toronto",
                population: 20,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "New York",
                population: 20,
                color: "#323232",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Moscow",
                population: 40,
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 20}
            height={220}
            chartConfig={{
              fillShadowGradient: "skyblue",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#37adc4",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#2d3f42",
              backgroundGradientToOpacity: 0.1,
              color: (opacity = 1) => "rgba(26, 255, 146,1)",
              strokeWidth: 2,
              useShadowColorFromDataset: false,
            }}
            style={{
              marginTop: 30,
            }}
            accessor="population"

            //for the absolute number remove if you want percentage
          />

          <Button
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonDialog}
            //onPress={() => confirmationExport(true, "XLS")}
          >
            {" "}
            <Icon name="chevrons-down" type="feather" /> Exportar
          </Button>
        </View>
        <View style={styles.graph}>
          <Text
            style={{
              width: "50%",
              textAlign: "center",
              fontSize: 20,
              marginLeft: 10,
              position: "absolute",
              top: 10,
              left: 0,
            }}
          >
            Mejores Clientes
          </Text>
          <PieChart
            data={[
              {
                name: "Seoul",
                population: 20,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Toronto",
                population: 20,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "New York",
                population: 20,
                color: "#323232",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Moscow",
                population: 40,
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 20}
            height={220}
            chartConfig={{
              fillShadowGradient: "skyblue",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#37adc4",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#2d3f42",
              backgroundGradientToOpacity: 0.1,
              color: (opacity = 1) => "rgba(26, 255, 146,1)",
              strokeWidth: 2,
              useShadowColorFromDataset: false,
            }}
            style={{
              marginTop: 30,
            }}
            accessor="population"

            //for the absolute number remove if you want percentage
          />

          <Button
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonDialog}
            //onPress={() => confirmationExport(true, "XLS")}
          >
            {" "}
            <Icon name="chevrons-down" type="feather" /> Exportar
          </Button>
        </View>
        <View style={styles.graph}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Ganancias{" "}
          </Text>

          <BarChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"], //Periodo de tiempo
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 500], //Cantidad es $
                },
              ],
            }}
            width={Dimensions.get("window").width - 30}
            height={300}
            yAxisLabel={"$"}
            chartConfig={{
              backgroundColor: "#A1D6E2",
              backgroundGradientFrom: "#A1D6E2",
              backgroundGradientFromOpacity: 0.0,
              backgroundGradientTo: "#A1D6E2",
              backgroundGradientToOpacity: 0.0,
              fillShadowGradientFromOpacity: 1,
              fillShadowGradientFrom: "red",
              fillShadowGradientTo: "red",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
          
            }}
            withInnerLines={true}
            showBarTops={false}
            style={{
              marginVertical: 8,
            }}
          />
        </View>
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
  resumeText: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: "50%",
    textAlign: "center",
    paddingVertical: 5,
  },
  buttonDialog: {
    marginTop: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: 120,
    height: 50,
    backgroundColor: "#A1D6E2",
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
