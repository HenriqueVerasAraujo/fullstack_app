import myContext from "./myContext";
import React, { useState } from 'react';

export default function Provider({ children }) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [userName, setUserName] = useState('');
 const [myNumber, setMyNumber] = useState(0);

const contextValue = {
  userName,
  setUserName,
  myNumber,
  setMyNumber,
};

  return (
    <myContext.Provider value = { contextValue }>
      { children }
    </myContext.Provider> 
  )
}