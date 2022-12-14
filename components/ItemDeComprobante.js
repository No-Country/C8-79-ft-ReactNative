import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const ItemDeComprobante = ({ item, index }) => {
  const navigation = useNavigation();
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
          marginLeft: 10,
          width: windowWidth * 0.35,
        }}
      >
        {item.nombre}
      </Text>
      <Text
        style={{
          color: colors.text,
          width: windowWidth * 0.1,
          textAlign: "center",
          flexWrap: "wrap",
        }}
      >
        {item.cantidad}
      </Text>
      <Text
        style={{
          color: colors.text,
          width: windowWidth * 0.25,
          textAlign: "center",
        }}
      >
        ${item.precioUnitario}
      </Text>
      <Text
        style={{
          color: colors.text,
          marginRight: 10,
          width: windowWidth * 0.25,
          textAlign: "right",
        }}
      >
        ${item.total}
      </Text>
    </View>
  );
};

export default ItemDeComprobante;

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
});
