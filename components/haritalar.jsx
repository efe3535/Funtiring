import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Button,
} from 'react-native';

const Haritalar = ({navigation, route}) => {
  const [imagesList, setImagesList] = useState([]);
  const [extraData, setExtraData] = useState(false);
  const [addedIndexes, setAddedIndexes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: `Fun-Tring - Haritalar - ${route.params.username} kullanıcısı`,
      });
      fetch('http://100.25.205.61:9491/get_images', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: route.params.username}),
      })
        .then(res => res.json())
        .then(res => {
          let temp = [];
          if (route.params.id === 0) {
            setImagesList(
              res.images
                .map((item, ind) => {
                  if (item) {
                    temp.push(ind);
                    return res.prefix + item;
                  } else {
                    return null;
                  }
                })
                .filter(item => item),
            );
            setAddedIndexes(temp);
          } else if (route.params.id === 1) {
            setImagesList(
              res.images2
                .map((item, ind) => {
                  if (item) {
                    temp.push(ind);
                    return res.prefix + item;
                  } else {
                    return null;
                  }
                })
                .filter(item => item),
            );
            setAddedIndexes(temp);
          }
        })
        .catch(console.err);
      setExtraData(true);
    }, [navigation, route.params.username, route.params.id]),
  );

  const sendDelete = id => {
    fetch('http://100.25.205.61:9491/delete', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: route.params.username,
        id,
        place: route.params.id,
      }),
    }).catch(console.err);
  };

  const confirmDelete = id => {
    Alert.alert(
      'Emin misiniz?',
      'Fotoğrafınız sonsuza kadar kaybolacak. Bu işlem geri alınamaz.',
      [
        {
          text: 'Evet',
          onPress: () => {
            sendDelete(id);
            navigation.navigate('Konumlar', {username: route.params.username});
          },
          style: 'default',
        },
        {
          text: 'İptal',
          onPress: () => {
            Alert.alert('', 'Fotoğraf silinmemiştir.');
          },
          style: 'cancel',
        },
      ],
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem}>
        <Image source={{uri: item}} style={styles.imageStyle} />
        <Text>
          {route.params.username} kullanıcısından {addedIndexes[index] + 1}{' '}
          numaralı fotoğraf
        </Text>
        <TouchableOpacity
          onPress={() => {
            confirmDelete(addedIndexes[index]);
          }}
          style={styles.deleteStyle}>
          <Image
            style={styles.copKutusu}
            source={require('../assets/copKutusu.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handlePhoto = id => {
    navigation.navigate('FotografEkle', {
      username: route.params.username,
      index: id,
      place: route.params.id,
    });
  };

  /*const FooterComponentArray = [...Array(route.params.id === 0 ? 10 : 5).keys()]
    .map(ind => (
      <TouchableOpacity
        style={styles.footerComponent}
        key={ind}
        onPress={() => handlePhoto(ind)}>
        <Text>{ind + 1}. resmi ekle</Text>
      </TouchableOpacity>
    ))
    .filter((item, ind) => !addedIndexes.includes(ind));*/
  /*const FooterComponentArray = (
    <TouchableOpacity
      style={styles.footerComponent}
      onPress={() => handlePhoto()}>
      <Text>{ind + 1}. resmi ekle</Text>
    </TouchableOpacity>
  );*/
  const FooterComponent = (
    <TouchableOpacity
      style={styles.footerComponent}
      onPress={() => handlePhoto(addedIndexes.length)}>
      <Text>{addedIndexes.length + 1}. resmi ekle</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        ListHeaderComponentStyle={styles.container}
        ListHeaderComponent={
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.container}>
            <Animated.Image
              style={styles.image}
              resizeMode={'contain'}
              source={require('../assets/ornekHarita.jpg')}
            />
          </ScrollView>
        }
        ListFooterComponent={FooterComponent}
        ListFooterComponentStyle={
          (route.params.id === 0 && addedIndexes.length === 10) ||
          (route.params.id === 1 && addedIndexes.length === 5)
            ? {display: 'none'}
            : null
          /* Eğer yeterli fotoğraf varsa gösterme, yoksa göster. oldu arkadaşlar
          kapiyorum ben :D tmam
          githuba aticam kodlari wp grubunda var linkler
          */
        }
        data={imagesList}
        extraData={extraData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    gap: 10,
    marginTop: 12,
  },
  deleteStyle: {
    padding: 12,
  },
  copKutusu: {
    width: 32,
    height: 32,
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: '80%',
    height: 150,
  },
  image: {
    width: '90%',
    height: Dimensions.get('window').height * 0.75,
  },
  map: {
    width: '90%',
    height: 600,
    borderRadius: 12,
  },
  renderItem: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 12,
    width: '70%',
    alignSelf: 'center',
    padding: 12,
    marginTop: 12,
  },
  footerComponent: {
    alignSelf: 'center',
    padding: 12,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ddd',
    margin: 10,
    borderRadius: 5,
  },
});

export default Haritalar;
