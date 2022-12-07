
import UserContext from "../context/UserContext";
import { useEffect, useContext } from "react";
import { checkIsLogged } from "../firebase/session";
import Navigator from "./Navigator";
import Spinner from "../components/Spinner";

 const Main=()=> {
  const { getToken,spinner } = useContext(UserContext);

  useEffect(() => {
    const unsuscribe = checkIsLogged(getToken);
    //return () => unsuscribe();
  }, []);
  return(
<>
{spinner ? <Spinner></Spinner> : null}
 <Navigator></Navigator>
</>

  )


}

export default Main
