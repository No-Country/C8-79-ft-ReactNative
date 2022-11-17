import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import PasswordRecovery from "./screens/PasswordRecovery";
import Register from "./screens/Register";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Login({ navigation }) {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
    >
      <Text>Login</Text>
      <Button onPress={() => navigation.navigate("PasswordRecovery")}>
        
        Olvide
      </Button>
      <Button onPress={() => navigation.navigate("Register")}>registrat</Button>
      <Button onPress={() => navigation.navigate("Menu")}>ingrearsar</Button>
    </View>
  );
}

function Menu({ navigation }) {
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerStyle: { backgroundColor: "#A1D6E2" } }}
      useLegacyImplementation
      initialRouteName="Home"
    >
      <Drawer.Screen name="Register" component={Register} />

      <Drawer.Screen name="Home" component={Home} />
   
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={()=> props.navigation.navigate("Login")} />
    </DrawerContentScrollView>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
