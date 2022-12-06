import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(false);
<<<<<<< HEAD
  const [id, setId] = useState('');
=======
  const [name, setName] = useState('');
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069

  return (
    <UserContext.Provider
      value={{
        signed,
        setSigned,
<<<<<<< HEAD
        id,
        setId,
=======
        name,
        setName,
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
<<<<<<< HEAD
  const { signed, setSigned, id, setId } = context;
  return { signed, setSigned, id, setId };
=======
  const { signed, setSigned, name, setName } = context;
  return { signed, setSigned, name, setName };
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
}
