import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { getInitials } from "../helpers/getInitials";

const Client = ({ item,  index }) => {
  const {colors}=useTheme()
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={() => {
        navigation.navigate("ClientDetail", item);
      }}
      style={[
        index % 2 === 0
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.background },
        styles.item,
      ]}
    >
      <View style={styles.contact}>
        <Avatar
          size={40}
          rounded
          title={getInitials(item)}
          containerStyle={{ backgroundColor: "#676f72" }}
        />
        <Text style={[styles.title, { color: colors.text, fontSize: 20 }]}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
      <Icon
        style={{ paddingRight: 10 }}
        name="chevron-right"
        type="feather"
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

export default Client;

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    padding: 5,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  title: {
    paddingLeft: 20,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
  },
});
