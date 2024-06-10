import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Kayit = ({navigation, route}) => {
  const [text, setText] = useState('');
  const [pass, setPass] = useState('');

  const handleRegister = () => {
    const register = fetch('http://3.84.53.159:9491/create_user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: text, pass}),
    })
      .then(res => res.json())
      .then(res => {
        return res.ok;
      });

    if (register) {
      navigation.navigate('Konumlar', {user: text.trim()});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholderTextColor={'#777'}
        placeholder="E-Mail"
        value={text}
        keyboardType="email-address"
        onChangeText={t => setText(t)}
        style={styles.login}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
      />
      <TextInput
        placeholderTextColor={'#777'}
        placeholder="Şifre"
        value={pass}
        secureTextEntry
        onChangeText={t => setPass(t)}
        style={styles.login}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.text}>Giriş</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
    flex: 1,
    gap: 12,
    margin: 12,
  },
  text: {
    color: 'black',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: '60%',
    alignItems: 'center',
  },
  login: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 12,
    padding: 10,
    width: '80%',
  },
});

export default Kayit;
