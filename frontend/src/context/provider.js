import myContext from "./myContext";
import React, { useState } from 'react';

export default function provider({ children }) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [userName, setUserName] = useState('');

const contextValue = {
  userName,
  setUserName,
};

  return (
    <myContext.Provider value = { contextValue }>
      { children }
    </myContext.Provider> 
  )
}