import React from 'react';
import { NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import OnBoardScreen from "./src/screens/OnBoardScreen";
import { NavigationParamList } from './src/screens/types';


const Stack = createStackNavigator<NavigationParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}} >
        <Stack.Screen  name='OnBoard' component={OnBoardScreen} />
        <Stack.Screen  name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}