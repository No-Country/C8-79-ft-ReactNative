import { getStorage, ref ,uploadBytes,getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
const random=nanoid()

export  const uploadImage=async (uri)=> {
    try {
      console.log(uri.uri)
      const response = await fetch(uri.uri)
      const blobFile = await response.blob()
      const storageRef = ref(getStorage(),  `images/${random}`)
      const result = await uploadBytes(storageRef, blobFile)
      const url = await getDownloadURL(result.ref)
  console.log(url)
      return url
    } catch (err) {
      return Promise.reject(err)
  }

}

