import { StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/themed";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { View } from "react-native-web";

const PieChartComponent = ({ title, data,exports }) => {
  const{colors}=useTheme()
  return (
    <>
      <Text
        style={{
          color:colors.text,
          width: "50%",
          textAlign: "center",
          fontSize: 20,
          marginLeft: 10,
          position: "absolute",
          top: 10,
          left: 0,
        }}
      >
        {title}
      </Text>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          color: (opacity = 1) => "rgba(26, 255, 146,1)",
        }}
        style={{
          marginLeft: 30,
          marginTop: 30,
        }}
        accessor="population"
        avoidFalseZero
        hasLegend={true}
        
      />

      <Button
        titleStyle={[styles.buttonText,{color:colors.text}]}
        buttonStyle={[styles.button,{backgroundColor:colors.background,borderColor:colors.primary}]}
        onPress={() => exports(data)}
      >
        <Icon name="chevrons-down" type="feather" color={colors.text} /> Exportar
      </Button>
    </>
  );
};

export default PieChartComponent;

const styles = StyleSheet.create({
  
  button: {
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
