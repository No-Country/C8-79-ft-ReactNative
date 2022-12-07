import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const ItemDeInventario = ({ item, index }) => {
  const { colors }=useTheme()
  return (
    <View
      style={[
        index % 2 === 0
          ? { backgroundColor: colors.background }
          : { backgroundColor: colors.primary },
        styles.item,
      ]}
    >
      <Text
        style={{color:colors.text, marginLeft: 10, flexWrap: "wrap", width: windowWidth * 0.2 }}
      >
        {item.codigo}
      </Text>
      <Text style={{color:colors.text, width: windowWidth * 0.4, textAlign: "center" }}>
        {item.nombre}
      </Text>
      <Text style={{color:colors.text, width: windowWidth * 0.2, textAlign: "center" }}>
        ${item.precioCompra}
      </Text>
      <Text style={[styles.Ex,{color:colors.text,}]}>{item.cantidad}</Text>
      <Text
        style={{
          color:colors.text,
          marginRight: 10,
          width: windowWidth * 0.3,
          textAlign: "center",
        }}
      >
        ${item.precioVenta}
      </Text>
    </View>
  );
};

export default ItemDeInventario;

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  Ex: {
    width: windowWidth * 0.25,
    textAlign: "center",
  },
});
