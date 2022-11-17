import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Icon } from 'react-native';
import logo from '../../assets/monshine.png';
import diamont from '../../assets/diamon2.gif';
import { useState } from 'react';

export const Login = ( navigation ) => {
    const [name, setName] = useState('');

    return (
      <View style={styles.container}>
        <Image
          source={ diamont }
          style={ styles.diamont }
          />
        <Image
          source={ logo }
          style={ styles.image }
          />
          
        <Text style={ styles.text }></Text>
        <TextInput
          placeholder='Usuario'
          style={ styles.inputs}  
        />

        <TextInput
          password= { true }
          secureTextEntry= { true }
          placeholder="Contraseña"
          style={ styles.inputs}   
        />
        
        <TouchableOpacity      
          style= { styles.button }
        >
          <Text> INICIAR </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={ ()=> {
                navigation.navigate('Pass')
            }}
        >
            <Text style={{ color: '#1995AD', marginTop: 40 }}> ¿Olvidaste tu contraseña? </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
            <View style={{ backgroundColor:'#000', height: 1, width: '30%'}}>
            
            </View>
            <View>
                <Text style={{marginHorizontal: 25}}>O</Text>
            </View>
            <View style={{ backgroundColor:'#000', height: 1, width: '30%'}}>
            
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20 }}>
            <Text> ¿No tienes una cuenta? </Text>
            <Text style={{ color: '#1995AD' }}> Crear cuenta </Text>    
        </View>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
  
      //justifyContent: 'center',
    },
    text: {
      color: 'cyan',
      fontSize: 50,
      fontWeight: 'bold'
    },
    image: {
      marginTop: 0,
      height: 50, 
      width: 130
    },
    diamont: {
      height: 135,//90
      width: 190,//125
      marginTop: '10%',
      resizeMode: 'contain'
    },
    button: {
      backgroundColor:"#A1D6E2",
      borderRadius: 5,
      padding:5,
      paddingLeft: 50,
      paddingRight: 50,
      marginTop: 10
    },
    inputs: {
      backgroundColor: '#F1F1f2',
      width: '80%',
      marginBottom: 25,
      padding: 10,
      borderRadius: 10
      
    },
    icon: {
       color: '#a1a1a2' 
    }
  });
  export default Login;
