import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

const Haritalar = ({navigation, route}) => {
  const [imagesList, setImagesList] = useState([]);
  const [extraData, setExtraData] = useState(false);
  const [addedIndexes, setAddedIndexes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: `Oryantiring - Haritalar - ${route.params.username} kullanıcısı`,
      });
      fetch('http://100.25.205.61:9491/get_images', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: route.params.username}),
      })
        .then(res => res.json())
        .then(res => {
          let temp = [];
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
        })
        .catch(console.err);
      setExtraData(true);
    }, [navigation, route.params.username]),
  );

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem}>
        <Image source={{uri: item}} style={styles.imageStyle} />
        <Text>
          {route.params.username} kullanıcısından {addedIndexes[index] + 1}{' '}
          numaralı fotoğraf
        </Text>
      </View>
    );
  };

  const handlePhoto = id => {
    navigation.navigate('FotografEkle', {
      username: route.params.username,
      index: id,
    });
  };

  const FooterComponentArray = [...Array(10).keys()]
    .map(ind => (
      <TouchableOpacity
        style={styles.footerComponent}
        key={ind}
        onPress={() => handlePhoto(ind)}>
        <Text>{ind + 1}. resmi ekle</Text>
      </TouchableOpacity>
    ))
    .filter((item, ind) => !addedIndexes.includes(ind));

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
        ListFooterComponent={<View>{FooterComponentArray}</View>}
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
