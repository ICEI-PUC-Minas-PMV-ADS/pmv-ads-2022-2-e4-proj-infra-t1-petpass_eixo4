import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [id, setId] = useState('');

  return (
    <UserContext.Provider
      value={{
        signed,
        setSigned,
        id,
        setId,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  const { signed, setSigned, id, setId } = context;
  return { signed, setSigned, id, setId };
}
