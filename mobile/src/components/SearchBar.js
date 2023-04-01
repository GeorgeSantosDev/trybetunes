import React, { useState, useContext } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
  Text,
} from 'react-native';

import headerImage from '../../images/headerImage.png';
import searchAlbumsAPI from '../api/searchAlbumsAPI';
import context from '../context/context';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

function SearchBar() {
  const [search, setSearch] = useState('');
  const { setErr, setAlbum, album } = useContext(context);

  const onPress = async () => {
    try {
      const response = await searchAlbumsAPI(search);
      setSearch('');
      setAlbum(response);
    } catch (error) {
      setErr(true);
      setSearch( { memory: '', value: '' });
    }
  };

  const isDisabled = search === '';

  return (
    <View>
      <ImageBackground style={ styles.image } source={headerImage}>
        <TextInput
          value={ search }
          onChangeText={ (text) => setSearch(text) }
          style={ styles.input }
          placeholder="Digite sua pesquisa"
        />

      <View style={ styles.buttonContainer }>
        <Button
          onPress={ onPress }
          title="Search"
          backgroundColor="#003BE5"
          accessibilityLabel="Search button"
          disabled={ isDisabled }
        />
      </View>
      </ImageBackground>
      {
        album.length > 0 && (
          <Text style={ styles.text } >Resultado da busca</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: width / 2,
    textAlign: 'center',
    color: '#fff',
    alignSelf: 'center',
  },
  image: {
    width: width,
    height: height * 0.13,
  },
  buttonContainer: {
    width: width * 0.3,
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    margin: 5,
  },
});

export default SearchBar;
