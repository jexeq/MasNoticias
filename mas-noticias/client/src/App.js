import React from "react";
import { Route } from "react-router-dom"; 

//components
import Landing from "./views/Landing";
import WeatherReport from "./components/weather/Weather";

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Landing}/>
    </React.Fragment>
  );
}

export default App;
