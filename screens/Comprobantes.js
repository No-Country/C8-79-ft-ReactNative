import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import DateRangeFilter from "../components/DateRangeFilter";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
import Comprobante from "../components/Comprobante";

const windowWidth = Dimensions.get("window").width;

const Comprobantes = () => {
  const { colors } = useTheme();
  const comprobantes = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  const [filter, setFilter] = useState({
    startDate: moment().startOf("month"),
    endDate: moment(),
    displayedDate: moment(),
    visibility: false,
    title: {
      month: moment().startOf("month").format("MMMM"),
      year: moment().year(),
    },
  });

  const handleFilter = (obj) => {
    setFilter((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const closeFilter = () => {
    setFilter((prev) => ({
      ...prev,
      visibility: false,
    }));
  };

  const renderItem = ({ item, index }) => {
    return <Comprobante item={item} index={index} />;
  };

  return (
    <View style={{ height: "100%", backgroundColor: colors.background }}>
      <DateRangeFilter
        state={filter}
        close={closeFilter}
        handleFilter={handleFilter}
      ></DateRangeFilter>

      <View style={styles.topContainer}>
        <Icon
          style={{ marginLeft: 10 }}
          name="calendar"
          type="ionicon"
          color={colors.text}
          onPress={() =>
            setFilter((prev) => ({
              ...prev,
              visibility: true,
            }))
          }
        />
        <Text style={{ marginRight: 10, fontSize: 16, color: colors.text }}>
          <Text style={{ fontWeight: "bold" }}>
            {!filter.visibility && filter.startDate.format("DD/MMM/YY")}
          </Text>
          {" A "}
          <Text style={{ fontWeight: "bold" }}>
            {!filter.visibility && filter.endDate.format("DD/MMM/YY")}
          </Text>
        </Text>
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={[styles.headerStyle, { backgroundColor: colors.primary }]}
          >
            <Text
              style={{
                marginLeft: 10,
                flexWrap: "wrap",
                minWidth: windowWidth * 0.2,
                color: colors.text,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Operacion
            </Text>
            <Text
              style={{
                flexWrap: "wrap",
                color: colors.text,
                minWidth: windowWidth * 0.35,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Cliente
            </Text>
            <Text
              style={{
                color: colors.text,
                minWidth: windowWidth * 0.2,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Fecha
            </Text>
            <Text
              style={{
                color: colors.text,
                minWidth: windowWidth * 0.25,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Monto
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <ActivityIndicator
            style={{ marginTop: 200 }}
            size="large"
            color={colors.primary}
          />
        )}
        horizontal={false}
        overScrollMode={"never"}
        style={{
          width: "100%",
          height: "100%",
        }}
        data={
          comprobantes
          // filter !== ""
          //   ? products.filter((item) =>
          //       item.description.toLowerCase().includes(filter.toLowerCase())
          //     )
          //   : prod
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};

export default Comprobantes;

const styles = StyleSheet.create({
  globalContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topContainer: {
    marginVertical: 40,
    height: 40,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resume: {
    justifyContent: "center",
    alignItems: "center",

    width: "95%",
    height: 150,
  },
  bestClient: {
    justifyContent: "center",

    width: "95%",
    height: 100,
  },
  graph: {
    backgroundColor: "#A1D6E270",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 370,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    borderRadius: 20,
  },
  topSellClients: {
    justifyContent: "center",
    alignItems: "center",
    height: 450,
    width: "95%",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    borderRadius: 20,
  },
  bestClientText: {
    fontSize: 22,
    marginLeft: 10,
  },
  resumeText: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: "50%",
    textAlign: "center",
    paddingVertical: 5,
  },
  flatlist: {
    width: "100%",
    height: "80%",
  },
  container: {
    marginTop: 10,
    width: "95%",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    textAlign: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: "#BCBABB",
    borderWidth: 1,
    borderBottomColor: "#BCBABB",
    borderBottomWidth: 1,
  },
  buttonsView: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    paddingHorizontal: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#A1D6E2",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonDialog: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A1D6E2",
    width: 100,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonBottom: {
    borderRadius: 20,
    height: 50,
    marginTop: 20,
  },
});
