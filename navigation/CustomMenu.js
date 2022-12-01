import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { Avatar } from "@rneui/themed";

const CustomMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
      onPress={()=>props.navigation.navigate("Perfil")}
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
                  fontSize: 22,
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
          borderBottomColor: "#000",
        }}
      />

      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.replace("Login")}
        icon={() => <Icon name="exit" type="ionicon"></Icon>}
        style={{
        
          borderTopWidth: 0,
          borderTopColor: "#000",
          paddingTop: 5,
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomMenu;

const styles = StyleSheet.create({});
