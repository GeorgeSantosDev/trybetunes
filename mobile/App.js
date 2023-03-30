import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

const height = Dimensions.get('screen').height;

function App()  {
  return (
    <SafeAreaView style={ styles.container }>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen name="Login" component={ Login } options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={ Home } options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height,
  },
});

export default App;
