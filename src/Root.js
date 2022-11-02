import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterMain from "./RouterMain";

function Root() {
  return (
    <BrowserRouter>
      <RouterMain />
    </BrowserRouter>
  );
}

export default Root;
