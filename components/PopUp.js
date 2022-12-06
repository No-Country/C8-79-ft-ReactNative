import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

const PopUp = ({ visibility, message, child}) => {
  const {colors}=useTheme()
  return (
    <Dialog isVisible={visibility} overlayStyle={[styles.dialog,{borderColor:colors.primary,backgroundColor:colors.background}]}>
      <Text style={{ fontSize: 16,textAlign:"center",color:colors.text }}>{message} </Text>
      {child}
    </Dialog>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  dialog: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
});
