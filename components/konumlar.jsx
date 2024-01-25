import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Konumlar = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: `Oryantiring - Konumlar - ${route.params.username} kullanıcısı`,
    });
    fetch('http://100.25.205.61:9491/create_user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: route.params.username}),
    });
  }, [navigation, route.params.username]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.id === 0
            ? navigation.navigate('Haritalar', {
                username: route.params.username,
              })
            : null
        }
        style={styles.listViewItem}>
        <Image
          source={item.image}
          width={100}
          height={100}
          style={styles.imageStyle}
        />

        <Text style={styles.listViewItemTextStyle}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const separatorComponent = () => {
    return <View style={styles.separator} />;
  };

  const listHeaderComponent = () => {
    return <Text style={styles.header}>Konumların listesi</Text>;
  };

  const listEmptyComponent = () => {
    return (
      <Text style={styles.header}>
        Henüz fotoğraf eklenmemiş, 10 adet fotoğraf ekleyebilirsiniz.
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listViewStyle}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        ListHeaderComponentStyle={styles.headerContainer}
        ItemSeparatorComponent={separatorComponent}
        data={[
          {
            id: 0,
            label: 'Efes Antik Kenti',
            image: require('../assets/efes.jpg'),
          },
          {
            id: 2,
            label: 'Topkapı Sarayı',
            image: require('../assets/topkapi-sarayi-muzesi.jpg'),
          },

          {
            id: 1,
            label: 'Dolmabahçe Sarayı',
            image: require('../assets/dolmabahce.jpg'),
          },
        ]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    flex: 1,
    gap: 12,
  },
  listViewItem: {
    backgroundColor: '#d9d9d9',
    flexDirection: 'row',
    borderRadius: 12,
  },
  imageStyle: {
    width: '45%',
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  listViewItemTextStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
  },
  listViewStyle: {
    flex: 1,
    width: '80%',
  },
  listViewContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  separator: {
    height: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 12,
  },
});

export default Konumlar;
