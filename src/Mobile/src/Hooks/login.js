import React, { createContext, useState } from "react";

const GlobalContext = createContext(undefined, undefined);

const PlanProvider = ({ children }) => {
  const [planState, setPlanState] = useState(false);

  return (
    <GlobalContext.Provider value={{ planState, setPlanState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { PlanProvider };
export default GlobalContext;
