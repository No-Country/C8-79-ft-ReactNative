import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import { useTheme } from "@react-navigation/native";

const Product = ({ fontSz, textColor, item, isPress, index }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      //onPressIn={isPress}
      // onPress={() => {
      //   isPress, navigation.navigate("ClientDetail", item);
      // }}
      style={[
        index % 2 === 0
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.background },
        styles.item,
      ]}
    >
      <View style={styles.contact}>
        <View style={{flex: 1, flexDirection:"row", justifyContent:'space-evenly'}}>
          <Text style={[styles.title, { color: textColor, fontSize: fontSz}]}>
            {item.nombre}
          </Text>
          <Text style={[styles.title, { color: textColor, fontSize: fontSz }]}>
            {item.cantidad}
          </Text>
          <Text style={[styles.title, { color: textColor, fontSize: fontSz }]}>
            {`$ ${item.precioVenta}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  title: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
  },
});
