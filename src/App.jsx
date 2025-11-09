
import React from "react";
import { useRoutes } from "react-router-dom";
import allRoutes from "./routes/routes";

function App() {
  const routing = useRoutes(allRoutes); 

  return <>{routing}</>;
}

export default App;

