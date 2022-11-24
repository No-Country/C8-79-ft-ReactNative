import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY} from '@env'

const MapSearchInput = ({ isPress ,refer,setFieldValue}) => {
  return (
    
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
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
ref={refer}
        query={{ key: API_KEY }}
        fetchDetails={true}
        keepResultsAfterBlur={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        //inserta mensaje que no se encontro direccion
        // listEmptyComponent={() => (
        //   <View style={{ flex: 1 }}>
        //     <Text>No results were found</Text>
        //   </View>
        // )}
        onPress={(data, details = null) => {
          //setFieldValue("address","casass"),
          isPress(data, details,(details?.geometry?.location),setFieldValue)}}
      />
    
  );
};

export default MapSearchInput;
