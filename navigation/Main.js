
import UserContext from "../context/UserContext";
import { useEffect, useContext } from "react";
import { checkIsLogged } from "../firebase/session";
import Navigator from "./Navigator";

 const Main=()=> {
  const { getToken } = useContext(UserContext);

  useEffect(() => {
    const unsuscribe = checkIsLogged(getToken);
    return () => unsuscribe();
  }, []);

  return <Navigator></Navigator>;

}

export default Main
