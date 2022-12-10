import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const ItemDeInventario = ({ item, index }) => {
  const { colors } = useTheme();
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
        style={{
          color: colors.text,
          flexWrap: "wrap",
          width: (windowWidth * 2) / 5,
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {item.codigo}
      </Text>
      <Text
        style={{
          color: colors.text,
          width: (windowWidth * 2) / 5,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        {item.nombre}
      </Text>
      <Text
        style={[
          styles.Ex,
          {
            color: colors.text,
            fontSize: 18,
            width: (windowWidth * 2) / 5,
          },
        ]}
      >
        {item.cantidad}
      </Text>
      <Text
        style={{
          color: colors.text,
          width: (windowWidth * 2) / 5,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        ${item.precioCompra}
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          textAlign: "center",
          width: (windowWidth * 2) / 5,
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
    height: "auto",
    paddingVertical:10
  },
  Ex: {
    width: windowWidth * 0.25,
    textAlign: "center",
  },
});
