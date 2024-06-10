import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';

const Community = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Funtiring - Topluluk - ' + route.params.user,
      });
      fetch('http://3.84.53.159:9491/getPosts')
        .then(res => res.json())
        .then(messages => {
          setPosts(messages.posts);
        });
    }, [navigation, route.params.user]),
  );
  const [message, setMessage] = useState('');

  const handleMessage = () => {
    if (message.length > 5) {
      fetch('http://3.84.53.159:9491/communityPost', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: route.params.user, message: message}),
      })
        .then(res => res.json())
        .then(success => {
          if (success.status === 'ok') {
            Alert.alert('Başarılı', 'Mesajınız başarıyla gönderildi!');
          }
        });
    } else {
      Alert.alert('Hata', 'Mesajınız 5 karakterden uzun olmalıdır.');
    }
  };

  const listFooterComponent = () => {
    return (
      <View style={styles.footerComponentStyle}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Buraya mesajınızı girin!"
          value={message}
          onChangeText={t => setMessage(t)}
          multiline
        />
        <TouchableOpacity onPress={handleMessage} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Mesajı gönder</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderItem}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>{item.from}</Text> tarafından
          gönderildi
        </Text>
        <Text style={styles.text}>{item.message}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>
        Topluluğa hoş geldiniz! Dilediğinizi yazın!
      </Text>
      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={renderItem}
        contentContainerStyle={styles.centerList}
        ListFooterComponentStyle={styles.footerComponentStyle}
        ListFooterComponent={listFooterComponent()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    gap: 12,
    margin: 12,
  },
  contentContainer: {
    alignItems: 'center',
  },
  renderItem: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 10,
  },
  textInputStyle: {
    backgroundColor: '#d9d9d9',
    padding: 12,
    width: '80%',
    borderRadius: 12,
    height: 200,
  },

  bold: {
    fontWeight: 'bold',
  },

  footerComponentStyle: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },

  flatList: {
    flex: 1,
    width: '100%',
  },

  centerList: {
    flex: 1,
    gap: 10,
  },

  buttonText: {
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: '#ddd',
    padding: 16,
    width: '80%',
    alignItems: 'center',
    borderRadius: 6,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  text: {
    fontSize: 15,

    color: 'black',
    textAlign: 'center',
  },
});

export default Community;
