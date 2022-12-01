import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { Text, StyleSheet } from "react-native";

const PopUp = ({ visibility, message, child}) => {
  return (
    <Dialog isVisible={visibility} overlayStyle={styles.dialog}>
      <Text style={{ fontSize: 16,textAlign:"center" }}>{message} </Text>
      {child}
    </Dialog>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  dialog: {
    textAlign: "center",
    borderColor: "#A1D6E2",
    borderWidth: 1,
    borderRadius: 10,
  },
});
