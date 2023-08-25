import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import HomeScreen from '../Screens/HomeScreen';
import CardScreen from '../Screens/CardScreen';
import VideoScreen from '../Screens/VideoScreen';
import ScannerScreen from '../Screens/ScannerScreen';
import AnimationScreen from '../Screens/AnimationScreen';
import StaticContact from '../Screens/StaticContact';
import Gallery from '../Screens/Gallery';

const Stack = createNativeStackNavigator();

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen" >
    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CardScreen" component={CardScreen}/>
      <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ScannerScreen" component={ScannerScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="AnimationScreen" component={AnimationScreen}/>
      <Stack.Screen name="StaticContact" component={StaticContact} options={{ headerShown: false }}/>
      <Stack.Screen name="Gallery" component={Gallery} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default Navigator;
