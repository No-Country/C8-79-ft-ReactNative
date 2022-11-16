import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import {  Text, StyleSheet } from "react-native";

const PopUp = ({ visibility }) => {
  return (
    <Dialog isVisible={visibility} overlayStyle={styles.dialog}>
      <Text>¡Los cambios se guardaron con exito!</Text>
    </Dialog>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  dialog: {
    borderColor: "#A1D6E2",
    borderWidth: 1,
  },
});
