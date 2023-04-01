import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import favoriteIcon from '../../images/favoriteIcon.png';
import profileIcon from '../../images/profileIcon.png';
import searchIcon from '../../images/searchIcon.png';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

function NavigationBar() {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={ styles.container }>
      <TouchableOpacity onPress={ () => handlePress('Home') }>
        <Image
          source={searchIcon}
          style={ styles.icon }
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => handlePress('Favorites') }>
        <Image
          source={favoriteIcon}
          style={ styles.icon }
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => handlePress('Profile') }>
        <Image
          source={profileIcon}
          style={ styles.icon }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#EFE9E1',
    padding: 10,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: height - 135,
  },
  icon: {
    width: 20,
    height: 20,
  },
});


export default NavigationBar;
