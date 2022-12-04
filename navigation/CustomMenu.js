import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import { signOutUser } from "../firebase/session";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomMenu = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#A1D6E2" }}
      >
        <DrawerItem
          onPress={() => props.navigation.navigate("Perfil")}
          label={() => (
            <View>
              <View
                style={{
                  marginTop: -10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Avatar
                  containerStyle={{ margin: 0, maxWidth: "50%" }}
                  size={100}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />

                <Text
                  style={{
                    fontSize: 20,
                    flexWrap: "wrap",
                    width: "50%",
                    textAlign: "center",
                    marginTop: 0,
                    marginLeft: 10,
                  }}
                >
                  Bienvenido Nombre
                </Text>
              </View>
            </View>
          )}
          style={{
            width: "95%",
            height: 110,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        />
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingLeft: 25,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <TouchableOpacity
          onPress={() => signOutUser()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="exit" type="ionicon" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 30,
              }}
            >
              Cerrar Sesion
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomMenu;

const styles = StyleSheet.create({});
