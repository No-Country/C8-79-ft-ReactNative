import React, { Fragment } from "react";
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Register from "../screens/Register";
import Home from "../screens/Home";
import CustomMenu from "./CustomMenu";
import Products from "../screens/Products";
import Clients from "../screens/Clients";
import { Image, View } from "react-native";
import { Icon } from "@rneui/base";
import Inventario from "../screens/Inventario";
import Reportes from "../screens/Reportes";
import Perfil from "../screens/Perfil";
import ClientDetail from "../screens/ClientDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewClient from "../screens/NewClient";
import EditClient from "../screens/EditClient";
import { useTheme } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();



const ClientsStack=()=>{
return <Stack.Navigator
  screenOptions={{
    headerShown: false,
    headerStyle: { backgroundColor: "#A1D6E2" } 
  }}
>
 <Stack.Screen name="ClientsScreen" component={Clients} />
  <Stack.Screen name="ClientDetail" component={ClientDetail} />
  <Stack.Screen name="NewClient" component={NewClient} />
  <Stack.Screen name="EditClient" component={EditClient} />
</Stack.Navigator>}



const Menu = ({route}) => {
 

  const {colors}=useTheme()
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomMenu {...props} />}
      screenOptions={{ 
        headerTintColor:colors.text,
        drawerActiveBackgroundColor:colors.primary,
        drawerActiveTintColor:colors.text,
        drawerItemStyle: {
           marginVertical:"3%" ,
          
        },
        headerShown: true,
      headerStyle: { backgroundColor: colors.primary } }}
      useLegacyImplementation={false}
      initialRouteName={route.params}
    >
      {/* <ion-icon name="reader"></ion-icon> */}

      {/* <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "Perfil",
          drawerIcon: () => <Icon name="people" type="ionicon"></Icon>,
        }}
      /> */}

      {/* <Drawer.Screen
        name="Home"
        
        component={Home}
        options={{
          
          title: "Home",
          drawerIcon: () => <Icon color={ colors.text} name="home" type="ionicon"></Icon>,
        }}
      /> */}

      <Drawer.Screen
        name="Clientes"
        component={ClientsStack}
        options={{
          title: "Clientes",
          drawerIcon: () => <Icon color={ colors.text} name="person" />,
        }}
      />
      <Drawer.Screen
        name="Productos"
        component={Products}
        options={{
          title: "Productos",
          drawerIcon: () => <Icon color={ colors.text} name="pricetag" type="ionicon"></Icon>,
        }}
      />

      <Drawer.Screen
        name="Inventario"
        component={Inventario}
        options={{
          title: "Inventario",
          drawerIcon: () => <Icon color={ colors.text} name="reader" type="ionicon"></Icon>,
        }}
      />

      <Drawer.Screen
        name="Reportes"
        component={Reportes}
        options={{
          title: "Reportes",
          drawerIcon: () => <Icon color={ colors.text} name="document-text" type="ionicon"></Icon>,
        }}
      />

      
      
      
      
    </Drawer.Navigator>
  );
};

export default Menu;
