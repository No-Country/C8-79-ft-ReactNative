import React, { useState } from "react";
import * as ImagePick from "expo-image-picker";
import { Avatar } from "@rneui/themed";
import { uploadImage } from "../firebase/storage";

const ImagePicker = ({ set, data, defaultPic }) => {
  const pickImage = async () => {
    let result = await ImagePick.launchImageLibraryAsync({
      mediaTypes: ImagePick.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result)
      const image = await uploadImage(result);

      set(image);
    }
  };

  return (
    <Avatar size={150} rounded source={{ uri: data }}>
      <Avatar.Accessory size={23} onPress={pickImage} />
    </Avatar>
  );
};

export default ImagePicker;
