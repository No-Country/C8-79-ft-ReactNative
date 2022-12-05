import { View, Text, Dimensions, Animated } from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { useTheme, useFocusEffect } from "@react-navigation/native";
import AnimatedButton from "../components/AnimatedButton";
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const { colors } = useTheme();

  const [arr, setArr] = useState(false);
  const [arr1, setArr1] = useState(false);
  const [arr2, setArr2] = useState(false);
  const [arr3, setArr3] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => setArr(true), 100);
      setTimeout(() => setArr1(true), 300);
      setTimeout(() => setArr2(true), 600);
      setTimeout(() => setArr3(true), 900);

      return () => {
        setArr1(false), setArr2(false), setArr3(false), console.log("salio");
      };
    }, [])
  );

  return (
    <View style={{ flex: 1,justifyContent:"center", backgroundColor: colors.background }}>
      <LinearGradient
        colors={[colors.primary, colors.card]}
        style={{width:"100%",height:"100%",justifyContent:"center"}}
      >
      <Text
        style={{
          color: colors.text,
          fontSize: 28,
          padding: 20,
          textAlign: "center",
          marginBottom:50
        }}
      >
        Selecciona una seccion para comenzar
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%",height:"60%" }}>
        {arr && (
          <AnimatedButton
            icon={"person"}
            title={"Clientes"}
            
          ></AnimatedButton>
        )}
        {arr1 && (
          <AnimatedButton
            icon={"pricetag"}
            title={"Productos"}
           
          ></AnimatedButton>
        )}
        {arr2 && (
          <AnimatedButton
            icon={"reader"}
            title={"Inventario"}
           
          ></AnimatedButton>
        )}
        {arr3 && (
          <AnimatedButton
            icon={"document-text"}
            title={"Reportes"}
           
          ></AnimatedButton>
        )}
      </View>
      </LinearGradient>
    </View>
  );
}
