import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

const Konumlar = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: `Funtiring - Konumlar - ${route.params.user} kullanıcısı`,
    });
  }, [navigation, route.params.user]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.id === 0 || item.id === 1) {
            navigation.navigate('Haritalar', {
              user: route.params.user,
              id: item.id,
            });
          } else {
            Alert.alert(
              'Yakında',
              `Yakında "${item.label}" bölgesi de eklenecek.`,
            );
          }
        }}
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

  const handleCommunity = () => {
    navigation.navigate('Community', {user: route.params.user});
  };

  const listFooterComponent = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.header}>Topluluk</Text>
        <TouchableOpacity onPress={handleCommunity} style={styles.button}>
          <Text style={styles.text}>Topluluğa giriş yap</Text>
        </TouchableOpacity>
      </View>
    );
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
        ListFooterComponent={listFooterComponent}
        ListFooterComponentStyle={styles.listFooterComponent}
        ItemSeparatorComponent={separatorComponent}
        data={[
          {
            id: 0,
            label: 'Efes Antik Kenti',
            image: require('../assets/efes.jpg'),
          },
          {
            id: 2,
            label: 'Aigai Antik Kenti',
            image: {
              uri: 'https://arkeofili.com/wp-content/uploads/2019/08/aigai.jpg',
            },
          },

          {
            id: 3,
            label: 'Aizanoi Antik Kenti',
            image: {
              uri: 'https://arkeofili.com/wp-content/uploads/2019/08/aizanoi.jpg',
            },
          },
          {
            id: 4,
            label: 'Aktopraklık Höyük',
            image: {
              uri: 'https://arkeofili.com/wp-content/uploads/2019/08/aktoprak.jpg',
            },
          },
          {
            id: 5,
            label: 'Alacahöyük',
            image: {
              uri: 'https://arkeofili.com/wp-content/uploads/2019/08/Alacahoyuk.jpg',
            },
          },
          {
            id: 6,
            label: 'Anavarza Antik Kenti',
            image: {
              uri: 'https://arkeofili.com/wp-content/uploads/2019/08/anavarza.jpg',
            },
          },
          {
            id: 7,
            label: 'Anemurium Antik Kenti',
            image: {
              uri: 'https://arkeofili.com/wp-content/uploads/2019/08/Anemuriumjpg.jpg',
            },
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
  buttonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: '#d9d9d9',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  listViewItem: {
    backgroundColor: '#d9d9d9',
    flexDirection: 'row',
    borderRadius: 12,
  },

  text: {
    color: 'black',
  },
  listFooterComponent: {
    alignItems: 'center',
    padding: 8,
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
