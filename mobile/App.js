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
import Favorites from './src/screens/Favorites';
import Profile from './src/screens/Profile';
import Album from './src/screens/Album';
import Provider from './src/context/provider';

const Stack = createStackNavigator();

const height = Dimensions.get('screen').height;

function App()  {
  return (
    <SafeAreaView style={ styles.container }>
      <Provider>
        <NavigationContainer>
          <StatusBar />
          <Stack.Navigator>
            <Stack.Screen name="Login" component={ Login } options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={ Home } options={{ headerShown: false }} />
            <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="Album" component={Album} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height,
  },
});

export default App;
