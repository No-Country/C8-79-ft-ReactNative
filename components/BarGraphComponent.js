import { StyleSheet, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const BarGraphComponent = ({ title }) => {
  return (
    <>
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        {title}
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
        showBarTops={false}
        style={{
          marginVertical: 8,
        }}
      />
    </>
  );
};

export default BarGraphComponent;

const styles = StyleSheet.create({});
