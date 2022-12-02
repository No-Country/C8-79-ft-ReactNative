import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { ButtonGroup, Icon, FAB, Avatar, Button } from "@rneui/themed";
import PopUp from "../components/PopUp";
import PopUpInfo from "../components/PopUpInfo";
import { getInitials } from "../components/Client";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Config";
import { Context } from "../context/ContextProvider";


const ClientDetail = ({ navigation, route }) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const {handleBandera, bandera} = useContext(Context)
  const client = route.params;


  const deleteClient = (client) => {
    console.log("Intenta BORRAR " + client.firstName );
    setDeletePopUp(true);
  };

  const confirmationDelete = async (remove, client) => {
    remove
      ? (console.log("BORRAR " + client.firstName),
        await deleteDoc(doc(db, "Clientes", client.id)),
        handleBandera(),
        setDeletePopUp(false),
        setDeleted(true),
        setTimeout(() => {
          setDeleted(false), navigation.navigate("ClientsScreen");
        }, 2000))
      : (console.log("NO BORRAR " + client.firstName), setDeletePopUp(false));
  };


  const makeCall = (client) => {
    Linking.openURL(`tel:${client.phone}`);
  };

  const sendMessage = async (client) => {

    const link=`whatsapp://send?text=hello&phone=${client.phone}`

    try {
            const supported = await Linking.canOpenURL(link);
              if (supported) Linking.openURL(link);
          } catch (error) {
              console.log(error)
          }
          Linking.openURL(`sms:${client.phone}?body=`);
  };

  const openMap = (client) => {
    //funciona con coordenadas
    const openAddressOnMap = (lat, lng) => {
      const scheme = "geo:0,0?q=";
      const latLng = `${lat},${lng}`;
      const label = label;
      const url = `${scheme}${latLng}(${label})`;
      Linking.openURL(url);
    };
    openAddressOnMap(
      client.address.coordinates.lat,
      client.address.coordinates.lng
    );

  };

  const openReport = () => {
    alert("abris alguna seccion");
  };

  const actions = {
    0: makeCall,
    1: sendMessage,
    2: openMap,
    3: openReport,
  };

  const handleButtonAction = (value) => {
    setSelectedIndex(value),
    setTimeout(()=>{setSelectedIndex(-1),actions[value](client)},200)
  };

  return (
    <View style={styles.container}>
      <FAB
        visible={true}
        onPress={() => navigation.navigate("EditClient", client)}
        style={{ position: "absolute", right: 15, top: 10 }}
        icon={{ name: "edit", color: "black" }}
        color="white"
        titleStyle={{ color: "black" }}
      />
      <Avatar
        size={90}
        rounded
        title={getInitials(client)}
        containerStyle={{ marginVertical: 5, backgroundColor: "#676f72" }}
      />
      <Text style={styles.name}>
        {client.firstName} {client.lastName}
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
          display: "flex",
          alignItems: "center",
        }}
        buttonContainerStyle={{ borderWidth: 0, borderRightWidth: 0 }}
        buttons={[
          <Icon name="phone" type="feather" color="#000" />,
          <Icon name="mail" type="feather" color="#000" />,
          <Icon name="map" type="feather" color="#000" />,
          <Icon name="dollar-sign" type="feather" color="#000" />,
        ]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          handleButtonAction(value);
        }}
      />

      <View style={styles.information}>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Nombre Y Apellido: </Text>
          <Text style={styles.value}>
            {client.firstName} {client.lastName}
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Email: </Text>
          <Text style={styles.value}>{client.email}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Telefono: </Text>
          <Text style={styles.value}>{client.phone}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>Direccion: </Text>
          <Text style={styles.value}>{client.address.address}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.text}>id: </Text>
          <Text style={styles.value}>{client.id}</Text>
        </View>
      </View>

      <FAB
        visible={true}
        onPress={() => deleteClient(client)}
        placement="right"
        icon={{ name: "delete", color: "black" }}
        color="white"
        titleStyle={{ color: "black" }}
      />
      {deleted && (
        <PopUpInfo
          visibility={deleted}
          message={"Cliente eliminado"}
        ></PopUpInfo>
      )}
      <PopUp
        visibility={deletePopUp}
        message={"¿ Estas seguro que quieres borrar este cliente ?"}
        child={
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={styles.buttonText}
              buttonStyle={[styles.buttonDialog, { backgroundColor: "#fff" }]}
              onPress={() => confirmationDelete(true, client)}
            >
              SI
            </Button>
            <Button
              titleStyle={styles.buttonText}
              buttonStyle={[
                styles.buttonDialog,
                { backgroundColor: "#A1D6E2" },
              ]}
              onPress={() => confirmationDelete(false, client)}
            >
              No
            </Button>
          </View>
        }
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
    fontSize: 32,
    marginVertical: 5,
  },
  actionsButtons: {
    width: "100%",
    height: 50,
    borderWidth: 0,
    marginBottom: 15,
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
  value: {
    fontSize: 16,
  },
  buttonDialog: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: 100,
  },
  buttonContainer: {
  
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
