import React from "react";
import Routes from "./src/pages/routes";
import { NavigationContainer } from "@react-navigation/native";
import GlobalPlanContext from "./src/Hooks/GlobalState";
import GlobalPetContext from "./src/Hooks/petGlobalState";

export default function App() {
  return (
    <GlobalPlanContext>
      <GlobalPetContext>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </GlobalPetContext>
    </GlobalPlanContext>
  );
}
