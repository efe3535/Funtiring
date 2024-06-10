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
import Kayit from './components/kayit';
import Community from './components/community';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
        <Stack.Screen
          name="AnaSayfa"
          options={{title: 'Funtiring - Ana sayfa'}}
          component={AnaSayfa}
        />
        <Stack.Screen
          name="Konumlar"
          options={{title: 'Funtiring - Konumlar'}}
          component={Konumlar}
        />
        <Stack.Screen
          name="Haritalar"
          options={{title: 'Funtiring - Haritalar'}}
          component={Haritalar}
        />
        <Stack.Screen
          name="FotografEkle"
          options={{title: 'Funtiring - Fotoğraf'}}
          component={FotografEkle}
        />
        <Stack.Screen
          name="Kayit"
          options={{title: 'Funtiring - Kayıt'}}
          component={Kayit}
        />
        <Stack.Screen
          name="Community"
          options={{title: 'Funtiring - Topluluk'}}
          component={Community}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
