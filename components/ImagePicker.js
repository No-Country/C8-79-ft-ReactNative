
import React, { useState } from 'react';
import * as ImagePick from 'expo-image-picker';
import { Avatar } from '@rneui/themed';


const ImagePicker = ({set,data}) => {

    

    

    const pickImage = async () => {
      
      let result = await ImagePick.launchImageLibraryAsync({
        mediaTypes: ImagePick.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        set(result.assets[0].uri);
      }
    };
  
    return (
        <Avatar
        size={150}
        rounded
        source= {data?  {uri: data , width: 200, height: 200} :{uri: "https://res.cloudinary.com/dnont3pur/image/upload/v1670372416/Monshine/monshine_v9et2x.jpg"}}
      >
        <Avatar.Accessory size={23} onPress={pickImage} />
      </Avatar>
    );
}

export default ImagePicker





  
