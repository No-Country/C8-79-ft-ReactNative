import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAPS_KEY } from "@env";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

const MapSearchInput = ({ isPress, refer, setFieldValue }) => {
  const [text, setText] = useState("");
  const { colors }=useTheme()

  return (
    <GooglePlacesAutocomplete
      styles={{
        textInput: {
          backgroundColor: colors.card,
          height: 44,
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 18,
          flex: 1,
          color: colors.text,
        },
      }}
      GooglePlacesDetailsQuery={{ fields: "geometry" }}
      ref={refer}
      query={{ key: MAPS_KEY }}
      fetchDetails={true}
      keepResultsAfterBlur={true}
      textInputProps={{
        onChangeText: (newText) => {
          setText(newText);
          //setFieldValue("address",newText)
        },
      }}
      onFail={(error) => {
        setFieldValue("address", text);
        console.log(error);
      }}
      onNotFound={() => console.log("no results")}
      //inserta mensaje que no se encontro direccion
      // listEmptyComponent={() => (
      //   <View style={{ flex: 1 }}>
      //     <Text>No results were found</Text>
      //   </View>
      // )}
      onPress={(data, details = null) => {
        isPress(data, details, details?.geometry?.location, setFieldValue/* , console.log(data.description.split(",")[1]) */);
      }}
    />
  );
};

export default MapSearchInput;
