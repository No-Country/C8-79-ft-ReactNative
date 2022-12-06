import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
   
     <Image style={{height:"100%",width:"100%"}} resizeMode='cover' source={require('../assets/splash.png')}></Image> 
  
  )
}

export default SplashScreen

const styles = StyleSheet.create({})