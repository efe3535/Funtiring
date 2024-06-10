import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const FotografEkle = ({navigation, route}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [onKamera, setOnKamera] = useState(false);

  const device = useCameraDevice(onKamera ? 'front' : 'back');
  const cameraRef = useRef(null);

  const handleSendPhoto = async () => {
    const file = await cameraRef.current.takePhoto();
    if (route.params.place === 0) {
      await fetch(`file://${file.path}`)
        .then(result => result.blob())
        .then(data => {
          fetch('http://3.84.53.159:9491/image', {
            method: 'POST',
            headers: {
              'Bilsem-Username': route.params.user,
              'Bilsem-Index': route.params.index,
            },
            body: data,
          }).then(() => {
            navigation.navigate('Konumlar', {
              user: route.params.user,
            });
          });
        });
    } else if (route.params.place === 1) {
      await fetch(`file://${file.path}`)
        .then(result => result.blob())
        .then(data => {
          fetch('http://3.84.53.159:9491/image2', {
            method: 'POST',
            headers: {
              'Bilsem-Username': route.params.user,
              'Bilsem-Index': route.params.index,
            },
            body: data,
          }).then(() => {
            navigation.navigate('Konumlar', {
              user: route.params.user,
            });
          });
        });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Funtiring - Fotoğraf - ${route.params.user} kullanıcısı`,
    });
    if (!hasPermission) {
      requestPermission();
    }
  }, [navigation, route.params.user, hasPermission, requestPermission]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fotoğraf ekle</Text>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo
      />
      <View style={styles.sideBySide}>
        <TouchableOpacity style={styles.buttonStyle2} onPress={handleSendPhoto}>
          <Text style={styles.buttonTextStyle}>Fotoğraf çek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => setOnKamera(!onKamera)}>
          <Text style={styles.buttonTextStyle}>Kamerayı değiştir</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  buttonStyle: {
    backgroundColor: '#ddd',
    padding: 16,
    width: '80%',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonStyle2: {
    backgroundColor: '#ddd',
    padding: 16,
    width: '40%',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: '600',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  sideBySide: {
    flexDirection: 'row',
    gap: 12,
  },
  camera: {
    width: '90%',
    alignSelf: 'center',
    height: '80%',
  },
});

export default FotografEkle;
