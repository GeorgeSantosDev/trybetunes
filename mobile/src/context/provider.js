import React, { useState, useMemo } from 'react';
import context from './context';

function Provider({ children }) {
  const [album, setAlbum] = useState([]);
  const [err, setErr] = useState(false);

  const contextValues = {
    album,
    setAlbum,
    err,
    setErr,
  };

  const memorizedContextValue = useMemo(() => contextValues, [album, err]);

  return (
    <context.Provider value={ memorizedContextValue }>
      { children }
    </context.Provider>
  );
}

export default Provider;
