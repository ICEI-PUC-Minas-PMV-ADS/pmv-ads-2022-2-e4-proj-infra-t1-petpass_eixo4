import React from "react";

import { PetProvider } from "./pets";

const GlobalPetContext = ({ children }) => {
  return <PetProvider>{children}</PetProvider>;
};

export default GlobalPetContext;
