import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { Text, StyleSheet, ActivityIndicator } from "react-native";

const Spinner = ({ }) => {
  return (
    <Dialog isVisible={true} overlayStyle={styles.dialog}>
       <ActivityIndicator size="large" color="#A1D6E2" />
    </Dialog>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  dialog: {
backgroundColor:"transparent",
    textAlign: "center",
    borderColor: "#A1D6E2",
    borderWidth: 0,
    borderRadius: 0,
  },
});
