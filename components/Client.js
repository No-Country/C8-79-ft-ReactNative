import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export const getInitials = (client) => {
  const firstName = client.firstName[0].toUpperCase();
  const firstLastName = client.lastName[0].toUpperCase();
  return firstName + firstLastName;
};

const Client = ({ fontSz,textColor, item, isPress, index }) => {

const navigation=useNavigation()

  return (<TouchableOpacity
    activeOpacity={.2}
    //onPressIn={isPress}
    onPress={()=>{isPress,navigation.navigate("ClientDetail",item)} }
    style={[
      index % 2 === 0
        ? { backgroundColor: "#A1D6E266" }
        : { backgroundColor: "#fff" },
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
      <Text style={[styles.title, { color: textColor,fontSize:fontSz }]}>
        {item.firstName} {item.lastName}
      </Text>
    </View>
    <Icon
      style={{ paddingRight: 10 }}
      name="chevron-right"
      type="feather"
      color="#BCBABB"
    />
  </TouchableOpacity>)
}

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
