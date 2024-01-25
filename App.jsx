/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnaSayfa from './components/anaSayfa';
import Haritalar from './components/haritalar';
import Konumlar from './components/konumlar';
import FotografEkle from './components/fotografEkle';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
        <Stack.Screen
          name="AnaSayfa"
          options={{title: 'Oryantiring - Ana sayfa'}}
          component={AnaSayfa}
        />
        <Stack.Screen
          name="Konumlar"
          options={{title: 'Oryantiring - Konumlar'}}
          component={Konumlar}
        />
        <Stack.Screen
          name="Haritalar"
          options={{title: 'Oryantiring - Haritalar'}}
          component={Haritalar}
        />
        <Stack.Screen
          name="FotografEkle"
          options={{title: 'Oryantiring - Fotoğraf'}}
          component={FotografEkle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
