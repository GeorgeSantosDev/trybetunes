import React from 'react';
import { View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('screen').width;

function AlbumCard({ album }) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Album', { albumId: album.collectionId });
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.shadowContainer }>
        <Image
          source={{ uri: album.artworkUrl100 }}
          style={ styles.image }
        />
      </View>
      <Text style={ styles.text }>{ album.collectionName }</Text>
      <View style={ styles.buttonContainer }>
        <Button
          onPress={ onPress }
          title="Acessar"
          backgroundColor="#003BE5"
          accessibilityLabel="Access button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 190,
    height: 190,
  },
  text: {
    color: '#fff',
  },
  buttonContainer: {
    width: width * 0.3,
    alignSelf: 'center',
    marginTop: 20,
  },
  shadowContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlbumCard;
