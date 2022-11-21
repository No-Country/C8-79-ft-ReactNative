import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { SafeAreaView, View, Text } from "react-native"; //import {apiKey} from './config'; // your google cloud api key

const MapSearchInput = ({ ref }) => {
  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            backgroundColor: "#F1F1F2",
            height: 44,
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 18,
            flex: 1,
            color: "#000",
          },
        }}
        query={{ key: "" }}
        fetchDetails={true}
        keepResultsAfterBlur={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        listEmptyComponent={() => (
          <View style={{ flex: 1 }}>
            <Text>No results were found</Text>
          </View>
        )}
        onPress={(data, details = null) => console.log(data, details)}
      />
    </SafeAreaView>
  );
};

export default MapSearchInput;
