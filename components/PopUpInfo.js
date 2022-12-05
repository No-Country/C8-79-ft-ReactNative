import React, { useState } from "react";
import { Dialog, Icon } from "@rneui/themed";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

const PopUpInfo = ({ visibility, message, child }) => {
  const {colors}=useTheme()
  return (
    <Dialog isVisible={visibility} overlayStyle={[styles.dialog,{borderColor:colors.primary}]}>
      <Icon name="check" type="feather" color={colors.text} />
      <Text style={{ fontSize: 20 ,textAlign:"center",color:colors.text}}>{message} </Text>
    </Dialog>
  );
};

export default PopUpInfo;

const styles = StyleSheet.create({
  dialog: {
    textAlign: "center",
    
    borderWidth: 1,
    borderRadius: 10,
  },
});
