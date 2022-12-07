import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const Comprobante = ({ item, index }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  return (
    
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detalle de Comprobante",item.id);
      }}
    >
      
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
            width: windowWidth * 0.2,
          }}
        >
          {item.operacion}
        </Text>
        <Text
          style={{
            color: colors.text,
            width: windowWidth * 0.35,
            textAlign: "center",
            flexWrap: "wrap",
          }}
        >
          {item.cliente}
        </Text>
        <Text
          style={{
            color: colors.text,
            width: windowWidth * 0.25,
            textAlign: "center",
          }}
        >
          {item.fecha}
        </Text>
        <Text
          style={{
            color: colors.text,
            marginRight: 10,
            width: windowWidth * 0.2,
            textAlign: "center",
          }}
        >
          ${"TEST"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Comprobante;

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
});
