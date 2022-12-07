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

import ClientDetail from "../screens/ClientDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewClient from "../screens/NewClient";
import EditClient from "../screens/EditClient";
import { useTheme } from "@react-navigation/native";
import Comprobantes from "../screens/Comprobantes";
import DetalleComprobante from "../screens/DetalleComprobante";
import Venta from "../screens/Venta";
import NewProduct from "../screens/NewProduct";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#A1D6E2" },
      }}
    >
      <Stack.Screen name="ProductScreen" component={Products} />
      <Stack.Screen name="NewProduct" component={NewProduct} />
      
    </Stack.Navigator>
  );
};

const ClientsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#A1D6E2" },
      }}
    >
      <Stack.Screen name="ClientsScreen" component={Clients} />
      <Stack.Screen name="ClientDetail" component={ClientDetail} />
      <Stack.Screen name="NewClient" component={NewClient} />
      <Stack.Screen name="EditClient" component={EditClient} />
    </Stack.Navigator>
  );
};

const ComprobantesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#A1D6E2" },
      }}
    >
      <Stack.Screen name="List de Comprobantes" component={Comprobantes} />
      <Stack.Screen
        name="Detalle de Comprobante"
        component={DetalleComprobante}
      />
    </Stack.Navigator>
  );
};

const Menu = ({ route }) => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomMenu {...props} />}
      screenOptions={{
        headerTintColor: colors.text,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.text,
        drawerItemStyle: {
          marginVertical: "3%",
        },
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
      }}
      useLegacyImplementation={true}
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
          drawerIcon: () => (
            <Icon color={colors.text} name="people" type="ionicon" />
          ),
        }}
      />
      <Drawer.Screen
        name="Productos"
        component={ProductStack}
        options={{
          title: "Productos",
          drawerIcon: () => (
            <Icon color={colors.text} name="pricetag" type="ionicon"></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="Inventario"
        component={Inventario}
        options={{
          title: "Inventario",
          drawerIcon: () => (
            <Icon color={colors.text} name="reader" type="ionicon"></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="Venta"
        component={Venta}
        options={{
          title: "Venta",
          drawerIcon: () => (
            <Icon
              color={colors.text}
              name="md-cash-outline"
              type="ionicon"
            ></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="Comprobantes"
        component={ComprobantesStack}
        options={{
          title: "Comprobantes",
          drawerIcon: () => (
            <Icon
              color={colors.text}
              name="document-text"
              type="ionicon"
            ></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="Reportes"
        component={Reportes}
        options={{
          title: "Reportes",
          drawerIcon: () => (
            <Icon color={colors.text} name="bar-chart" type="ionicon"></Icon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Menu;
