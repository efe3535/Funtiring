import React, {useState} from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  View,
} from 'react-native';

const AnaSayfa = ({navigation}) => {
  const [text, setText] = useState('');

  const handleLogin = () => {
    if (text.length > 1) {
      navigation.navigate('Konumlar', {username: text});
    } else {
      Alert.alert('Hata', 'Lütfen geçerli bir kullanıcı adı girin.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hoş geldiniz!</Text>
      <Image
        style={styles.logoStyle}
        width={200}
        height={200}
        resizeMode="contain"
        source={require('../assets/spicaLogo.png')}
      />
      <View style={styles.loginItems}>
        <Text>Lütfen kullanıcı adı giriniz:</Text>
        <TextInput
          placeholderTextColor={'#777'}
          placeholder="Kullanıcı adınız"
          value={text}
          onChangeText={t => setText(t)}
          style={styles.login}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text>Giriş</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    flex: 1,
    gap: 12,
    margin: 12,
  },
  logoStyle: {
    width: '80%',
    height: '40%',
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
    padding: 12,
    paddingHorizontal: 24,
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
  },
});

export default AnaSayfa;
