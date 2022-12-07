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
import { useTheme } from "@react-navigation/native";


const CustomMenu = (props) => {
  const{colors}=useTheme()
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.primary }}
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
                    color:colors.text
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
           
          
          }}
        />
        <View style={{ height:600, backgroundColor: colors.background, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingLeft: 25,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          backgroundColor:colors.background
        }}
      >
        <TouchableOpacity
          onPress={() => signOutUser()}
          style={{ paddingVertical: 15 ,backgroundColor:colors.background}}
        >
          <View style={{ flexDirection: "row", alignItems: "center",backgroundColor:colors.background }}>
            <Icon color={colors.text} name="exit" type="ionicon" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 30,
                color:colors.text
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
