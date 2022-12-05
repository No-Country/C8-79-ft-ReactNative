import { View, Text, Dimensions, Animated } from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { useTheme, useFocusEffect } from "@react-navigation/native";
import AnimatedButton from "../components/AnimatedButton";


export default function Home() {
  const { colors } = useTheme();

  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
 const [arr, setArr] = useState(true)
 const [arr1, setArr1] = useState(false)
 const [arr2, setArr2] = useState(false)
 const [arr3, setArr3] = useState(false)
  


  useFocusEffect(
    useCallback(() => {
    
      setTimeout(()=>setArr1(true),250)
      setTimeout(()=>setArr2(true),500)
      setTimeout(()=>setArr3(true),750)
      
      return () => {setArr1(false),setArr2(false),setArr3(false),console.log("salio")}
    }, [])
  );


  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 28,
          padding: 20,
          textAlign: "center",
        }}
      >
        Selecciona una seccion para comenzar
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
        {arr&&<AnimatedButton icon={"person"} title={"Clientes"} ></AnimatedButton>}
        {arr1&&<AnimatedButton icon={"pricetag"} title={"Productos"}  ></AnimatedButton>}
        {arr2&&<AnimatedButton icon={"reader"}  title={"Inventario"} ></AnimatedButton>}
        {arr3&&<AnimatedButton icon={"document-text"} title={"Reportes"}  ></AnimatedButton>}

      </View>
    </View>
  );
}
