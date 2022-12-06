import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key,value) => {
    try {
      
     const save= await AsyncStorage.setItem(key, value)
     
    } catch (e) {
      console.log(e)
    }
  }

  export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
     
      if(value !== null) {
       return value
      }
    } catch(e) {
        console.log(e) 
    }
  }



  export const removeData = async () => {
    try {
      const savedUser = await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  