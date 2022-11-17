import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PasswordRecovery from "./screens/PasswordRecovery";
import Register from "./screens/Register";
import Home from './screens/Home';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';

const Stack = createNativeStackNavigator();

function Login({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
      <Text>Login</Text>
      <Button onPress={()=>navigation.navigate('PasswordRecovery')} > Olvide </Button>
      <Button onPress={()=>navigation.navigate('Register')}>registrat</Button>
      <Button onPress={()=>navigation.navigate('Home')} >ingrearsar</Button>
      </View>
  );
}

export default function App() {
  return (
    // <>
    // {/* // <View style={styles.container}>
    // //   <Text>Open up App.js to start working on your app!</Text> */}
    //   <StatusBar style="auto" />
    // {/* {/* // </View> */}
    // <Register></Register>
    // {/* <PasswordRecovery></PasswordRecovery> */}
    // </>

    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen  name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="Home" component={Home} />
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









    
