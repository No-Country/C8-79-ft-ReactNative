import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PasswordRecovery from "../screens/PasswordRecovery";
import Register from "../screens/Register";
import Login from "../screens/Login";
import LandingPage from "../screens/LandingPage";

const Stack = createNativeStackNavigator();

const NoLogged = ({launched}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    {!launched && <Stack.Screen name="Landing" component={LandingPage} /> }
      
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
    </Stack.Navigator>
  );
};

export default NoLogged;
