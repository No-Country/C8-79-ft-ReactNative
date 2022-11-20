import React, { useState } from "react";
import { Dialog, Icon } from "@rneui/themed";
import { Text, StyleSheet } from "react-native";

const PopUpInfo = ({ visibility, message, child }) => {
  return (
    <Dialog isVisible={visibility} overlayStyle={styles.dialog}>
      <Icon name="check" type="feather" color="#000" />
      <Text style={{ fontSize: 20 ,textAlign:"center"}}>{message} </Text>
    </Dialog>
  );
};

export default PopUpInfo;

const styles = StyleSheet.create({
  dialog: {
    textAlign: "center",
    borderColor: "#A1D6E2",
    borderWidth: 1,
    borderRadius: 10,
  },
});
