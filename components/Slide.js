import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";

export default function Slide({items}) {
    const {width} = Dimensions.get('window')

    const handleAlgo = () => {
        console.log(items.image);
    }
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{uri:items.image}}
        style={{ height: "50%", width:width, resizeMode: "contain", marginTop: 30 }}
      />
      <Text style={styles.title}>{items.title}</Text>
      <Text onPress={handleAlgo} style={styles.subtitle}>{items.subtitle}</Text>
    </View>
  );
  
}
const styles = StyleSheet.create({
    title:{
        color:"#000000",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: 'center'
    },
    subtitle:{
        color: "#000000",
        fontSize: 15,
        fontWeight: "500",
        marginTop: 10,
        maxWidth: "70%",
        textAlign: "center"
    }
  })
