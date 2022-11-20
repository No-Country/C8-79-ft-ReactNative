import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { getInitials } from "../components/Client";
import { ButtonGroup, Icon, FAB ,Avatar} from "@rneui/themed";

const ClientDetail = ({ navigation, route }) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const client = route.params;

  return (
    <View style={styles.container}>
      <FAB
        visible={true}
        onPress={() => console.log("visible")}
        style={{ position: "absolute", right: 15, top: 10 }}
        icon={{ name: "edit", color: "black" }}
        color="white"
        titleStyle={{ color: "black" }}
      />
      <Avatar
        size={100}
        rounded
        title={getInitials(client)}
        containerStyle={{ marginVertical: 15, backgroundColor: "#676f72" }}
      />
      <Text style={styles.name}>
        {client.Nombre} {client.Apellido}
      </Text>
      <ButtonGroup
      activeOpacity={0}
        selectedButtonStyle={styles.selectedButton}
        containerStyle={styles.actionsButtons}
        buttonStyle={{
          borderWidth: 1,
          borderRadius: 20,
          marginHorizontal: 10,
          borderColor: "#A1D6E2",
          display:"flex",
          alignItems:"center",
        }}
        buttonContainerStyle={{ borderWidth: 0, borderRightWidth: 0 }}
        buttons={[
          <Icon
            name="phone"
            type="feather"
            color="#BCBABB"
          />,
          <Icon
            name="mail"
            type="feather"
            color="#BCBABB"
          />,
          <Icon
            name="map"
            type="feather"
            color="#BCBABB"
          />,
          <Icon
            name="dollar-sign"
            type="feather"
            color="#BCBABB"
          />,
        ]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
      />

      <View style={styles.information}>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Nombre Y Apellido: </Text>
          <Text style={styles.value}>
            {client.Nombre} {client.Apellido}
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Email: </Text>
          <Text style={styles.value}>
            {client.email} 
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Telefono: </Text>
          <Text style={styles.value}>
            {client.telefono} 
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Direccion: </Text>
          <Text style={styles.value}>
            Calle Falsa 123
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>id: </Text>
          <Text style={styles.value}>
            {client.id} 
          </Text>
        </View>
      </View>

      <FAB
        visible={true}
        onPress={() => console.log("visible")}
        placement="right"
        icon={{ name: "delete", color: "black" }}
        color="white"
        titleStyle={{ color: "black" }}
      />
    </View>
  );
};

export default ClientDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 36,
    marginVertical: 5,
  },
  actionsButtons: {
    width: "100%",
    height: 50,
    borderWidth: 0,
  },
  selectedButton: {
    backgroundColor: "#A1D6E2",
  },
  information: {
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: "95%",
    height: 240,
    borderRadius: 20,
    padding: 10,
    display: "flex",
    justifyContent: "space-evenly",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemInfo: {
    flexDirection: "row",
  },
  value:{
    fontSize:16
  }
});
