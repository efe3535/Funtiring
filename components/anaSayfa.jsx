import React, {useState} from 'react';

import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  View,
} from 'react-native';

const AnaSayfa = ({navigation}) => {
  const [text, setText] = useState('');
  const [pass, setPass] = useState('');

  const checkPass = () => {
    return fetch('http://3.84.53.159:9491/checkpass', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: text, pass}),
    })
      .then(res => res.json())
      .then(res => res.success)
      .then(success => {
        return success;
      });
  };

  const handleLogin = async () => {
    if (await checkPass()) {
      navigation.navigate('Konumlar', {user: text.trim()});
    } else {
      Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Kayit');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Hoş geldiniz!</Text>

      <View style={styles.loginItems}>
        <Text style={styles.text}>Bilgilerinizi giriniz...</Text>
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.text}>Giriş</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Kayıt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: '25%',
    width: '100%',
  },
  logoStyle: {
    height: '20%',
    marginTop: 30,
  },
  login: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 12,
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#ccc',
    height: 40,
    justifyContent: 'center',
    borderRadius: 6,
    width: '60%',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  loginItems: {
    alignItems: 'center',
    flex: 1,
    gap: 20,
    marginTop: 30,
    width: '80%',
    paddingBottom: '50%',
  },
  text: {
    color: 'black',
  },
});

export default AnaSayfa;
