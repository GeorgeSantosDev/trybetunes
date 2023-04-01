import React, { useContext } from 'react';
import context from '../context/context';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import AlbumCard from '../components/AlbumCard';

const height = Dimensions.get('screen').height;

function Home() {
  const { album } = useContext(context);

  return (
    <View style={ styles.container }>
      <FlatList
        data={ album }
        renderItem={ ({ item }) => <AlbumCard album={ item } /> }
        ListHeaderComponent={ () => <SearchBar /> }
      />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height - 100,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
});


export default Home;
