import React from 'react';
import { View,
  Image,
  Text,
  StyleSheet,
  Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

function AlbumCard({ album }) {
  return (
    <View style={ styles.container }>
      <Image
        source={{ uri: album.artworkUrl100 }}
        style={ styles.image }
      />
      <Text style={ styles.text }>{ album.collectionName }</Text>
      <Text style={ styles.text }>Acessar - Será um botão</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.8,
    height: width * 0.6,
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
});

export default AlbumCard;
