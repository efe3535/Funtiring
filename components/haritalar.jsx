import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  SectionList,
  Alert,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';

const UserList = props => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  let aciklamalar =
    props.id === 0
      ? [
          'Yazıtlar',
          'Odeon',
          'Herakles Kapısı',
          'Traianus Çeşmesi',
          'Hamam ve Umumi Tuvaletler',
          'Celsus Kütüphanesi',
          'Kral Yolu ve Ticaret Agorası',
          'Büyük Tiyatro',
          'Liman Yolu',
          'Meryem Kilisesi',
        ]
      : [
          'Bir SPICA üyesi ile fotoğraf çekinin.',
          'Bir gönüllü ile fotoğraf çekinin.',
          'Bir hakem ile fotoğraf çekinin.',
          'Robot deneme masası ile fotoğraf çekinin.',
          'Anı fotoğraf noktasında fotoğraf çekinin.',
        ];
  let fullAciklama =
    props.id === 0
      ? [
          'Yazıtlar: Burada bilgilendirici yaklaşık 60 adet örnek bulunur.',
          'Odeon: Zamanında kapalı olan bu yapı 1400 kişilik kapasiteye sahiptir.',
          'Herakles Kapısı: Adını ön cephesindeki Kuvvet Tanrısı Herakles kabartmaları  olmasından alan Herakles Kapısı Roma çağı sonlarında Kuretler Caddesi’ni yaya yolu haline getirmiştir.',
          'Traianus Çeşmesi: Cadde üzerinde iki katlı anıtlardan biri olan Traianus Çeşmesi, ortada duran İmparator Traianus’un heykelinin ayağı altındaki küre dünyayı simgeler.',
          'Hamam ve Umumi Tuvaletler: Efes’te yaşayan yerlilerin o zamanki sosyalleşme alanı olan, soğuk, ılık ve sıcak kısımları olmasıyla birlikte toplanma yeri olarak da kullanılmıştır. ',
          'Celsus Kütüphanesi: Efes valisi olan Celsus ölünce, oğlu tarafından babasının adına mezar anıtı olarak yaptırmıştır.  ',
          "Kral Yolu ve Ticaret Agorası:  MÖ 5. yüzyılda onarılmış ve yeniden düzenlenmiş bir antik anayol olan Kral Yolu, Efes'ten Persepolis'e kadar hızlı ulaşımı kolaylaştırmak için yapılmıştır.",
          'Büyük Tiyatro: Çok süslü ve üç katlı sahne binası tamamen yıkılan Büyük Tiyatro, 24.000 kişilik kapasitesiyle antik dünyanın en büyük açık hava tiyatrosudur. ',
          'Liman Yolu: 600 metre uzunluğuyla birlikte Efes’in en uzun caddesidir.',
          'Meryem Kilisesi: Meryem adına inşa edilmiş ilk kilise olan Meryem Kilisesi, Hristiyanlık dinindeki ilk yedi kilise arasında yer almaktadır.',
        ]
      : [
          'Bir SPICA üyesi ile fotoğraf çekinin.',
          'Bir gönüllü ile fotoğraf çekinin.',
          'Bir hakem ile fotoğraf çekinin.',
          'Robot deneme masası ile fotoğraf çekinin.',
          'Anı fotoğraf noktasında fotoğraf çekinin.',
        ];
  const renderItem = ({item, index}) => {
    console.log(item);
    return (
      <View style={{alignItems: 'center', gap: 10}}>
        <Text
          style={[
            styles.text,
            {width: '80%', textAlign: 'center', alignItems: 'center'},
          ]}>
          {index + 1}- {fullAciklama[index]}
        </Text>
        <View style={styles.renderItem}>
          <Image source={{uri: item}} style={styles.imageStyle} />
          <Text style={styles.text}>
            {props.username} kullanıcısından {props.addedIndexes[index] + 1}{' '}
            numaralı fotoğraf
          </Text>
          <TouchableOpacity
            onPress={() => {
              confirmDelete(props.addedIndexes[index]);
            }}
            style={styles.deleteStyle}>
            <Image
              style={styles.copKutusu}
              source={require('../assets/copKutusu.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 24, textAlign: 'justify', padding: 12}}>
          ⭐️⭐️⭐️
        </Text>
      </View>
    );
  };

  const handlePhoto = id => {
    props.navigation.navigate('FotografEkle', {
      username: props.username,
      index: id,
      place: props.id,
    });
  };
  const sendDelete = id => {
    fetch('http://3.84.53.159:9491/delete', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: props.username,
        id,
        place: props.id,
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
            props.navigation.navigate('Konumlar', {
              username: props.username,
              id: props.id,
            });
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

  const FooterComponent = (
    <View style={{alignItems: 'center'}}>
      <Text style={[styles.text, styles.bilgi]}>
        {props.addedIndexes.length + 1}. nokta:{' '}
        {fullAciklama[props.addedIndexes.length]}
      </Text>

      <TouchableOpacity
        style={styles.footerComponent}
        onPress={() => handlePhoto(props.addedIndexes.length)}>
        <Text style={styles.text}>
          {props.addedIndexes.length + 1}. fotoğrafı ekle:{' '}
          {aciklamalar[props.addedIndexes.length]}
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <FlatList
      ListHeaderComponentStyle={styles.container}
      ListHeaderComponent={
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}>
          <Text style={styles.header}>Görevler</Text>
          <Text style={styles.text}>
            {aciklamalar
              .map(
                (item, ind) =>
                  `${props.addedIndexes.includes(ind) ? '✅' : ''} ${
                    ind + 1
                  }. hedef: ${item}`,
              )
              .join('\n')}
          </Text>
          <Modal
            style={styles.modal}
            visible={showFullScreen}
            animationType="fade">
            <ScrollView>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowFullScreen(false)}>
                <Text style={styles.text}>Kapat</Text>
              </TouchableOpacity>
              <Animated.Image
                style={props.id === 0 ? styles.imageFullScreen : styles.hidden}
                resizeMode={'stretch'}
                source={require('../assets/ornekHarita.jpg')}
              />
            </ScrollView>
          </Modal>
          <TouchableOpacity
            onPress={() => setShowFullScreen(true)}
            style={props.id === 0 ? styles.image : styles.hidden}>
            <Animated.Image
              style={props.id === 0 ? styles.image : styles.hidden}
              resizeMode={'contain'}
              source={require('../assets/ornekHarita.jpg')}
            />
          </TouchableOpacity>
        </ScrollView>
      }
      ListFooterComponent={FooterComponent}
      ListFooterComponentStyle={
        (props.id === 0 && props.addedIndexes.length === 10) ||
        (props.id === 1 && props.addedIndexes.length === 5)
          ? {display: 'none'}
          : null
        /* Eğer yeterli fotoğraf varsa gösterme, yoksa göster. oldu arkadaşlar
          kapiyorum ben :D
          githuba aticam kodlari wp grubunda var linkler
          */
      }
      data={props.imagesList}
      extraData={props.extraData}
      renderItem={renderItem}
    />
  );
};

const AdminList = props => {
  const [usersData, setUsersData] = useState([]);
  const [sectionListData, setSectionListData] = useState([
    {title: null, data: []},
  ]);

  const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  useEffect(() => {
    fetch('http://3.84.53.159:9491/admin')
      .then(data => data.json())
      .then(json => {
        setUsersData(json);
        console.log(
          'data',
          Object.keys(json.users).map(user => {
            return {
              title: user,
              data: {
                dataImages1: json.users[user].images
                  .filter(item => item)
                  .map(image => 'http://3.84.53.159:9491/' + image),
                dataImages2: json.users[user].images2
                  .filter(item => item)
                  .map(image => 'http://3.84.53.159:9491/' + image),
              },
            };
          }),
        );
        setSectionListData(
          Object.keys(json.users).map(user => {
            return {
              title: user,
              data: json.users[user].images
                .filter(item => item)
                .map(image => 'http://3.84.53.159:9491/' + image)
                .concat(
                  json.users[user].images2
                    .filter(item => item)
                    .map(image => 'http://3.84.53.159:9491/' + image),
                ) /*{
                dataImages1: json.users[user].images.map(
                  image => 'http://3.84.53.159:9491/' + image,
                ),
                dataImages2: json.users[user].images2.map(
                  image => 'http://3.84.53.159:9491/' + image,
                ),
              }*/,
            };
          }),
        );
      })
      .catch(console.err);
  }, []);

  /*const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem}>
        <Image source={{uri: item}} style={styles.imageStyle} />
        <Text style={styles.text}>
          {props.username} kullanıcısından {props.addedIndexes[index] + 1}{' '}
          numaralı fotoğraf
        </Text>
        <TouchableOpacity
          onPress={() => {
            confirmDelete(props.addedIndexes[index]);
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

  const sendDelete = id => {
    fetch('http://3.84.53.159:9491/delete', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: props.username,
        id,
        place: props.id,
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
            props.navigation.navigate('Konumlar', {username: props.username});
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
  };*/

  return (
    <SectionList
      sections={sectionListData}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => (
        <View>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

const Haritalar = ({navigation, route}) => {
  const [imagesList, setImagesList] = useState([]);
  const [extraData, setExtraData] = useState(false);
  const [addedIndexes, setAddedIndexes] = useState([]);

  const [admin, setAdmin] = useState(route.params.username === 'admin');

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: `Fun-teering - Haritalar - ${route.params.username} kullanıcısı`,
      });
      fetch('http://3.84.53.159:9491/get_images', {
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

  return (
    <View>
      {admin ? (
        <AdminList
          navigation={navigation}
          username={route.params.username}
          id={route.params.id}
          addedIndexes={addedIndexes}
          imagesList={imagesList}
          extraData={extraData}
        />
      ) : (
        <UserList
          navigation={navigation}
          username={route.params.username}
          id={route.params.id}
          addedIndexes={addedIndexes}
          imagesList={imagesList}
          extraData={extraData}
        />
      )}
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
  button: {
    padding: 24,
    width: '90%',
    backgroundColor: '#eee',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 12,
  },
  text: {
    color: 'black',
  },
  imageFullScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
  },
  image: {
    width: '90%',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.7,
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
  hidden: {
    display: 'none',
  },
  bilgi: {
    width: '80%',
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Haritalar;
