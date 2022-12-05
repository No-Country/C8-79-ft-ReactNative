import { View, Text } from 'react-native'
import React,{useState,useContext} from 'react'
import UserContext from '../context/UserContext';
import { useTheme } from '@react-navigation/native';



import {Switch } from "@rneui/themed";


export default function Perfil() {
  const { theme,setTheme} =useContext(UserContext);
  const [toggle, setToggle] = useState(false)

  const { colors } = useTheme();


  const handleTheme = () => {
    setToggle((toggle)=>!toggle)
    setTheme(theme == "Light" ? "Dark" : "Light");
  };
  return (
    <View style={{justifyContent:"center",alignItems:"center",height:"100%"}}>
      
      <Text>Perfil</Text>

      <Switch
     
        value={toggle}
        onValueChange={() => handleTheme()}
      />
    </View>
  )
}