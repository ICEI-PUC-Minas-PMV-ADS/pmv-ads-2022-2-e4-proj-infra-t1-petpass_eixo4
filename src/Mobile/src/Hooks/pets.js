import React, { createContext, useState } from "react";

const PetContext = createContext(undefined, undefined);

const PetProvider = ({ children }) => {
  const [informacaoPet, setInformacaoPet] = useState(1);

  return (
    <PetContext.Provider value={{ informacaoPet, setInformacaoPet }}>
      {children}
    </PetContext.Provider>
  );
};

export { PetProvider };
export default PetContext;
