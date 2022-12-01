import React, { useState } from "react";
import { Dialog } from "@rneui/base";
import { Text, StyleSheet, ActivityIndicator } from "react-native";

const Spinner = ({ }) => {
  return (
    <Dialog style={styles.dialog}  overlayStyle={styles.dialog}>
       <ActivityIndicator size="large" color="#A1D6E2" />
    </Dialog>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  dialog: {
    elevation:0,
    backgroundColor:"transparent",
  },
});
