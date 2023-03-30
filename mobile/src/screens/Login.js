import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../utils/storage';

import logo from '../../images/logo.png';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

function Login() {
  const [name, setName] = useState('');

  const navigation = useNavigation();

  const onPress = async () => {
    await storeData('user', { name });
    navigation.navigate('Home');
  };

  const isDisabled = name.length < 3;

  return (
    <View style={ styles.container }>
      <Image source={ logo } style={ styles.logo } />

      <>
        <TextInput
          style={ styles.input }
          value={ name }
          onChangeText={(text) => setName(text)}
        />
        <Text style={ styles.placeholder } >Digite seu nome</Text>
      </>
      <View style={styles.buttonContainer}>
        <Button
          onPress={ onPress }
          title="Login"
          backgroundColor="#003BE5"
          accessibilityLabel="Login button"
          disabled={ isDisabled }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderBottomColor: '#fff',
    width: width / 2,
    textAlign: 'center',
    color: '#fff',
    alignSelf: 'center',
  },
  placeholder: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 160,
  },
  logo: {
    alignSelf: 'center',
  },
  buttonContainer: {
    width: width / 2,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Login;
