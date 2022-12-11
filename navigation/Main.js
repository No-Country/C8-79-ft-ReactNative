import UserContext from "../context/UserContext";
import { useEffect, useContext } from "react";
import { checkIsLogged } from "../firebase/session";
import Navigator from "./Navigator";
import Spinner from "../components/Spinner";
import { Tooltip } from "@rneui/themed";
import { Text} from "react-native";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Main = () => {
  const { getToken, spinner, error } = useContext(UserContext);

  useEffect(() => {
    const unsuscribe = checkIsLogged(getToken);
   // return () => unsuscribe();
  }, []);
  return (
    <>
      {spinner ? <Spinner></Spinner> : null}

      <Navigator></Navigator>

      <Tooltip
        visible={error.status}
        width={300}
        backgroundColor="#990000"
        containerStyle={{
          position: "absolute",
          top: windowHeight - 200,
          left: windowWidth / 2 - 150,
        }}
        //overlayColor={"red"}
        withPointer={false}
        popover={<Text style={{color:"#fff"}}> {error.message} </Text>}
      ></Tooltip>
    </>
  );
};

export default Main;
