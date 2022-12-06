import { StyleSheet, Text, View, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const ItemDeInventario = ({ item, index }) => {
  return (
    <View
      style={[
        index % 2 === 0
          ? { backgroundColor: "#A1D6E266" }
          : { backgroundColor: "#fff" },
        styles.item,
      ]}
    >
      <Text
        style={{ marginLeft: 10, flexWrap: "wrap", width: windowWidth * 0.2 }}
      >
        {item.code}
      </Text>
      <Text style={{ width: windowWidth * 0.4, textAlign: "center" }}>
        {item.description}
      </Text>
      <Text style={{ width: windowWidth * 0.2, textAlign: "center" }}>
        ${item.price}
      </Text>
      <Text style={styles.Ex}>{item.ExI}</Text>
      <Text style={styles.Ex}>{item.ExF}</Text>
      <Text
        style={{
          marginRight: 10,
          width: windowWidth * 0.3,
          textAlign: "center",
        }}
      >
        ${item.sellPrice}
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
