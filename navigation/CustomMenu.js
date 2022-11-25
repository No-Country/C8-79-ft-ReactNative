import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";

const CustomMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.replace("Login")}
       icon= {() => <Icon name="home" type="ionicon"></Icon>}
       style={{marginTop:80}}
      />
    </DrawerContentScrollView>
  );
};

export default CustomMenu;

const styles = StyleSheet.create({});
