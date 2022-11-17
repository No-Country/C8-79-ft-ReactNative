import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from "@rneui/base";
const Login = ({navigation}) => {
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
  )
}

export default Login

const styles = StyleSheet.create({})