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
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Config";

const CustomMenu = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = auth.currentUser.uid;
  const [usuario, setUsuario] = useState();
  const { colors } = useTheme();

  const datosUsuario = async () => {
    const docRef = doc(db, "Usuarios", uid);
    const docSnap = await getDoc(docRef);
    setUsuario(docSnap.data());
  };

  useEffect(() => {
    datosUsuario();
  }, []);

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
                    uri: "https://res.cloudinary.com/dnont3pur/image/upload/v1670372416/Monshine/monshine_v9et2x.jpg",
                  }}
                />
                <View style={{ width: "50%", marginTop: 0 }}>
                  <Text
                   adjustsFontSizeToFit
                    style={{
                      fontWeight: "bold",
                      fontSize:18,
                      textAlign: "center",
                      color: colors.text,
                      paddingVertical:10
                     
                    }}
                  >
                    Bienvenido
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,

                      textAlign: "center",

                      color: colors.text,
                    }}
                  >
                    {usuario?.userName}
                  </Text>
                </View>
              </View>
            </View>
          )}
          style={{
            width: "95%",
            height: 110,
          }}
        />
        <View
          style={{
            height: 600,
            backgroundColor: colors.background,
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingLeft: 25,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          onPress={() => signOutUser()}
          style={{ paddingVertical: 15, backgroundColor: colors.background }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.background,
            }}
          >
            <Icon color={colors.text} name="exit" type="ionicon" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 30,
                color: colors.text,
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
