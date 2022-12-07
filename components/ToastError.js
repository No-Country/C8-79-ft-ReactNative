import React from 'react'
import { StyleSheet,  } from 'react-native'
import  ToastManager, { Toast } from 'toastify-react-native'



const ToastError = ()  =>{


  const showToasts = () => {
    Toast.error("Error")
  }




 
  
  
  

  return (
    <ToastManager />
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10
}
})


   


export default ToastError