import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from '../src/components/Login';
import { Register } from '../src/components/Register';
import { Pass } from '../src/components/Pass';

const Stack = createNativeStackNavigator();
export const MainStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={ Login }
            />
            <Stack.Screen
                name='Register'
                component={ Register }
            />
            <Stack.Screen
                name='Pass'
                component={ Pass }
            />
        </Stack.Navigator>
    </NavigationContainer>

  )
}
