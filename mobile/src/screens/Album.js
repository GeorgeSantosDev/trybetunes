import React, { useState , useEffect } from 'react';
import { Text } from 'react-native';
import getMusics from '../api/musicsAPI';

function Album({ route }) {
  // const [musics, setMusics] = useState([]);

  const { albumId } = route.params;

  // const getCollection = async () => {
  //   const response = await getMusics(albumId);
  //   setMusics(response);
  // };

  // useEffect(() => {
  //   getCollection();
  // }, []);

  return (
    <>
      <Text>{ ` Estou na página Album com id ${albumId} ` }</Text>
    </>
  );
}

export default Album;
