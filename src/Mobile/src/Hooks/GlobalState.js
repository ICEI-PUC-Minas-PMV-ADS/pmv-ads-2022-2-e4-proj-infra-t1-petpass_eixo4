import React from "react";
import { PlanProvider } from "./login";

const GlobalPlanContext = ({ children }) => {
  return <PlanProvider>{children}</PlanProvider>;
};

export default GlobalPlanContext;
