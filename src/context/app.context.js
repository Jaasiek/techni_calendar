import React, { createContext, useState, useEffect } from "react";
import emptyPlan from "../emptyPlan";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [plan, setPlan] = useState(() => {
    const storedPlan = localStorage.getItem("plan");
    return storedPlan ? JSON.parse(storedPlan) : emptyPlan;
  });

  useEffect(() => {
    const storedPlan = localStorage.getItem("plan");
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
  }, []);

  return (
    <AppContext.Provider value={{ plan, setPlan }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
