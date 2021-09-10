import React from "react";
import { Route } from "react-router-dom"; 

//components
import Landing from "./views/Landing";

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Landing}/>
    </React.Fragment>
  );
}

export default App;
