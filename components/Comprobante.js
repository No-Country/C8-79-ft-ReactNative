import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";


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
            width: windowWidth * 0.3,
          }}
        >
          {item.id}
        </Text>
        <Text
          style={{
            color: colors.text,
            width: windowWidth * 0.7,
            textAlign: "center",
            flexWrap: "wrap",
          }}
        >
          {item.cliente}
        </Text>
        <Text
          style={{
            //backgroundColor:"gray",
            color: colors.text,
            width: windowWidth * 0.6,
            textAlign: "center",
          }}
        >
          {moment(item.fecha*1000).format("DD/MMM/YY")}
        </Text>
        <Text
          style={{
            paddingRight:30,
            color: colors.text,
            marginRight: 10,
            width: windowWidth * 0.4,
            textAlign: "right",
          }}
        >
          ${item.monto}
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
