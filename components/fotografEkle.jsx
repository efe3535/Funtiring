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
    await fetch(`file://${file.path}`)
      .then(result => result.blob())
      .then(data => {
        fetch('http://100.25.205.61:9491/image', {
          method: 'POST',
          headers: {
            'Bilsem-Username': route.params.username,
            'Bilsem-Index': route.params.index,
          },
          body: data,
        });
      })
      .then(() => {
        navigation.navigate('Konumlar', {username: route.params.username});
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Oryantiring - Fotoğraf - ${route.params.username} kullanıcısı`,
    });
    if (!hasPermission) {
      requestPermission();
    }
  }, [navigation, route.params.username, hasPermission, requestPermission]);
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
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSendPhoto}>
        <Text style={styles.buttonTextStyle}>Fotoğraf çek</Text>
      </TouchableOpacity>
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
  buttonTextStyle: {
    color: 'black',
    fontWeight: '600',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  camera: {
    width: '90%',
    alignSelf: 'center',
    height: '80%',
  },
});

export default FotografEkle;
